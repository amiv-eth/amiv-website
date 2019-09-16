import m from 'mithril';
import marked from 'marked';
import { apiUrl } from 'config';
import filesize from 'filesize';
import ExpansionPanel from 'amiv-web-ui-components/src/expansionPanel';
import { Dialog } from 'polythene-mithril-dialog';
import { Icon } from 'polythene-mithril-icon';
import Button from '../../components/Button';
import ActionBar from '../../components/ActionBar';
import StudydocsController from '../../models/studydocs';
import { i18n, currentLanguage } from '../../models/language';
import { FilteredListDataStore, FilteredListPage } from '../filteredListPage';
import mimeTypeToIcon from '../../images/mimeTypeToIcon';
import StudydocQuickFilter from './studydocQuickFilter';
import { Infobox } from '../errors';
import icons from '../../images/icons';
import { copyToClipboard } from '../../utils';
import * as log from '../../models/log';

const controller = new StudydocsController();
const dataStore = new FilteredListDataStore();

export default class StudydocList extends FilteredListPage {
  constructor() {
    super('studydocuments', dataStore);

    this.dropdownDisabled = {};
    this.deleteDocument = { id: null, busy: false };
    this.directLinkCopied = null;
    this.directLinkCopiedTimeout = null;
  }

  oninit(vnode) {
    super.oninit(vnode, vnode.attrs.documentId);

    if (
      vnode.attrs.documentId &&
      m.route.previousPath &&
      m.route.previousPath.includes('studydocuments') &&
      m.route.previousPath.includes('edit')
    ) {
      this.dataStore.shouldScroll = true;
      this.reload();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _hasItems() {
    return controller.length > 0;
  }

  // eslint-disable-next-line class-methods-use-this
  _isItemLoaded(itemId) {
    return controller.isDocumentLoaded(itemId);
  }

  // eslint-disable-next-line class-methods-use-this
  _loadItem(documentId) {
    return controller.loadDocument(documentId);
  }

  // eslint-disable-next-line class-methods-use-this
  _reloadData() {
    return controller.reload();
  }

  _isDropdownDisabled(field) {
    if (field in this.dropdownDisabled) {
      return this.dropdownDisabled[field];
    }
    return true;
  }

  _loadFilterOptions(field, values, defaultLabel, itemTransformer = item => item) {
    const data = [];

    data.push({
      value: 'all',
      label: defaultLabel,
    });

    if (
      values[field] &&
      (values[field].length === 0 || !values[field].includes('all')) &&
      field in dataStore.availableFilterValues
    ) {
      data.push(...dataStore.availableFilterValues[field]);
    } else {
      const fieldSummary = controller.availableFilterValues[field];

      if (fieldSummary) {
        const filterValues = Object.keys(fieldSummary)
          .sort()
          .map(itemTransformer);
        dataStore.availableFilterValues[field] = filterValues;
        data.push(...filterValues);
      }
    }

    this.dropdownDisabled[field] = data.length <= 1;
    return data;
  }

  static _adjustSelectValuesContainingAll(newValues, currentValues) {
    const currentIndexAll = currentValues.indexOf('all');
    const currentContainsAll = currentIndexAll !== -1;
    const newIndexAll = newValues.indexOf('all');
    const newContainsAll = newIndexAll !== -1;

    if ((newContainsAll && !currentContainsAll) || newValues.length === 0) {
      return ['all'];
    }
    if (newContainsAll && currentContainsAll && newValues.length > 1) {
      newValues.splice(newIndexAll, 1);
      return newValues;
    }
    return newValues;
  }

  get _filterViewAttributes() {
    return {
      fields: [
        {
          type: 'search',
          key: 'title',
          label: i18n('search'),
        },
        {
          type: 'select',
          key: 'department',
          label: i18n('studydocs.department'),
          multiple: true,
          adjustSelection: this.constructor._adjustSelectValuesContainingAll,
          default: ['all'],
          disabled: () => this._isDropdownDisabled('department'),
          values: values =>
            this._loadFilterOptions(
              'department',
              values,
              i18n('studydocs.allDepartments'),
              item => ({ value: item, label: `D-${item.toUpperCase()}` })
            ),
        },
        {
          type: 'select',
          key: 'semester',
          label: i18n('studydocs.semester'),
          multiple: true,
          adjustSelection: this.constructor._adjustSelectValuesContainingAll,
          default: ['all'],
          disabled: () => this._isDropdownDisabled('semester'),
          values: values =>
            this._loadFilterOptions('semester', values, i18n('studydocs.allSemesters'), item => ({
              value: item,
              label: i18n(`studydocs.semester${item}`),
            })),
        },
        {
          type: 'select',
          key: 'lecture',
          label: i18n('studydocs.lecture'),
          multiple: true,
          default: ['all'],
          adjustSelection: this.constructor._adjustSelectValuesContainingAll,
          disabled: () => this._isDropdownDisabled('lecture'),
          values: values =>
            this._loadFilterOptions('lecture', values, i18n('studydocs.allLectures')),
        },
        {
          type: 'select',
          key: 'professor',
          label: i18n('studydocs.professor'),
          multiple: true,
          default: ['all'],
          adjustSelection: this.constructor._adjustSelectValuesContainingAll,
          disabled: () => this._isDropdownDisabled('professor'),
          values: values =>
            this._loadFilterOptions('professor', values, i18n('studydocs.allProfessors')),
        },
        {
          type: 'checkbox',
          key: 'type',
          label: i18n('studydocs.type'),
          default: ['cheat sheets', 'exams', 'lecture documents', 'exercises'],
          values: [
            { value: 'cheat sheets', label: i18n('studydocs.types.cheatsheets') },
            { value: 'exams', label: i18n('studydocs.types.exams') },
            { value: 'lecture documents', label: i18n('studydocs.types.lectureDocuments') },
            { value: 'exercises', label: i18n('studydocs.types.exercises') },
          ],
        },
        {
          type: 'button',
          label: i18n('studydocs.oralExams'),
          className: 'flat-button',
          events: {
            onclick: () =>
              Dialog.show({
                title: i18n('studydocs.oralExams'),
                body: m.trust(marked(i18n('studydocs.oralExamsExplanation'))),
                modal: true,
                backdrop: true,
                footerButtons: m(Button, {
                  label: i18n('close'),
                  className: 'flat-button',
                  events: {
                    onclick: () => {
                      Dialog.hide();
                      return false;
                    },
                  },
                }),
              }),
          },
        },
        { type: 'hr' },
        {
          type: 'button',
          label: i18n('reset'),
          className: 'flat-button',
          events: {
            onclick: 'reset',
          },
        },
        {
          type: 'button',
          label: i18n('studydocs.upload'),
          events: {
            onclick: () => m.route.set(`/${currentLanguage()}/studydocuments/new`),
          },
        },
      ],
      onchange: async values => {
        this.dataStore.filterValues = values;
        const changed = await controller.setFilterValues(values);
        if (changed) {
          StudydocQuickFilter.clear();
          return true;
        }
        return false;
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get _lists() {
    return [
      {
        name: 'quickfilter',
        permanent: true,
        items: [m(StudydocQuickFilter, { controller, dataStore })],
      },
      {
        name: 'notice',
        permanent: true,
        items: [
          m(Infobox, {
            icon: m(Icon, { svg: { content: m.trust(icons.info) } }),
            label: m.trust(i18n('studydocs.legacyText')),
          }),
        ],
      },
      {
        name: FilteredListPage.pinnedListIdentifier,
      },
      {
        name: 'studydocs',
        pages: controller,
        loadMore: this._hasMorePagesToLoad() ? this._loadNextPage : undefined,
      },
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  _renderItem(item, list, selectedId) {
    if (list === 'quickfilter' || list === 'notice') {
      return item;
    }

    const studydocument = item;
    const actionButtons = [];
    const animationDuration = 300; // in ms
    const properties = [];

    if (studydocument.course_year) {
      properties.push({ value: studydocument.course_year });
    }
    if (studydocument.professor) {
      properties.push({ value: studydocument.professor });
    }

    if (studydocument.author) {
      properties.push({ name: i18n('studydocs.author'), value: studydocument.author });
    }

    if (studydocument.semester) {
      properties.push({ value: i18n(`studydocs.semester${studydocument.semester}`) });
    }

    const title =
      studydocument.type || studydocument.lecture
        ? `${studydocument.lecture ? studydocument.lecture : ''} ${
            studydocument.type ? i18n(`studydocs.name.${studydocument.type}`) : ''
          }`
        : null;

    const studydocTitle = studydocument.title
      ? studydocument.title
      : i18n('studydocs.name.default');

    if (
      studydocument._links &&
      studydocument._links.self &&
      studydocument._links.self.methods &&
      studydocument._links.self.methods.includes('PATCH')
    ) {
      actionButtons.push(
        m(Button, {
          name: `edit-${studydocument._id}`,
          className: 'blue-flat-button',
          label: i18n('studydocs.actions.edit'),
          events: {
            onclick: () => {
              m.route.set(`/${currentLanguage()}/studydocuments/${studydocument._id}/edit`);
            },
          },
        })
      );
    }

    if (
      studydocument._links &&
      studydocument._links.self &&
      studydocument._links.self.methods &&
      studydocument._links.self.methods.includes('DELETE')
    ) {
      // User is allowed to delete this document
      if (this.deleteDocument.id === studydocument._id && !this.deleteDocument.busy) {
        actionButtons.push(
          ...[
            m(Button, {
              name: `delete-cancel-${studydocument._id}`,
              className: 'flat-button',
              label: i18n('studydocs.actions.cancel'),
              events: {
                onclick: () => {
                  this.deleteDocument = { id: null, busy: false };
                },
              },
            }),
            m(Button, {
              name: `delete-confirm-${studydocument._id}`,
              className: 'red-flat-button',
              border: true,
              label: i18n('studydocs.actions.confirm'),
              events: {
                onclick: async () => {
                  this.deleteDocument.busy = true;
                  try {
                    await StudydocsController.delete(studydocument._id, studydocument._etag);
                    controller.reload();
                    m.route.setNoScroll(`/${currentLanguage()}/studydocuments`);
                  } catch (err) {
                    log.error(err);
                    this.deleteDocument = { id: null, busy: false };
                  }
                },
              },
            }),
          ]
        );
      } else {
        actionButtons.push(
          m(Button, {
            name: `delete-${studydocument._id}`,
            className: 'blue-flat-button',
            disabled: this.deleteDocument.id === studydocument._id && this.deleteDocument.busy,
            label: i18n('studydocs.actions.delete'),
            events: {
              onclick: () => {
                this.deleteDocument = { id: studydocument._id, busy: false };
              },
            },
          })
        );
      }
    }

    const urlId = `studydoc-${studydocument._id}-url`;

    return m(ExpansionPanel, {
      id: this.getItemElementId(studydocument._id),
      expanded: studydocument._id === selectedId,
      separated: true,
      duration: animationDuration,
      onChange: expanded => {
        if (this.expandDisabled === studydocument._id) {
          this.expandDisabled = null;
          return;
        }
        this.onChange(studydocument._id, expanded, animationDuration);
      },
      header: () =>
        m('div.studydoc-header', [
          m('div', [
            m('div.title', [
              m('h3', [
                ...(title
                  ? [title, studydocument.title && m('span', studydocument.title)]
                  : [studydocTitle]),
              ]),
            ]),
            m('div.properties', properties.map(prop => this.constructor._renderProperty(prop))),
            m(
              'div.studydoc-documents',
              studydocument.files.map(file => this.constructor._renderFile(file))
            ),
          ]),
        ]),
      content: () =>
        m('div.studydoc-content', [
          m(
            'div.studydoc-documents',
            studydocument.files.map(file => this.constructor._renderFile(file))
          ),
          m(ActionBar, {
            className: 'studydoc-actions',
            left: actionButtons,
            right: [
              m(
                'span',
                {
                  id: urlId,
                  style: { opacity: 0, width: 0, height: 0, padding: 0 },
                },
                `${window.location.origin}/${currentLanguage()}/studydocuments/${studydocument._id}`
              ),
              m(Button, {
                className: 'flat-button',
                label: i18n('copyDirectLink'),
                events: {
                  onclick: () => {
                    const copyElement = document.getElementById(urlId);
                    copyToClipboard(copyElement);
                  },
                },
              }),
            ],
          }),
        ]),
    });
  }

  static _renderProperty({ name = null, value, visible = true }) {
    if (!visible) return null;

    return m('div.property', [name ? m('span.name', name) : undefined, m('span', value)]);
  }

  static _renderFile({ file, name, content_type, length }) {
    let label;
    if (name.length <= 18) {
      label = name;
    } else {
      label = `${name.substr(0, 10)}\u2026${name.substr(name.length - 8)}`;
    }

    return m(
      'a',
      {
        href: `${apiUrl}${file}`,
        target: '_blank',
        onclick: e => {
          e.stopPropagation();
        },
      },
      [
        m(Icon, { svg: { content: m.trust(mimeTypeToIcon(content_type)) } }),
        m('span.name', label),
        m('span.size', filesize(length)),
      ]
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async _loadNextPage() {
    const newPage = controller.lastLoadedPage + 1;
    if (newPage <= controller.totalPages) {
      await controller.loadPageData(newPage);
      return newPage === controller.totalPages;
    }
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  _hasMorePagesToLoad() {
    return controller.lastLoadedPage < controller.totalPages;
  }
}
