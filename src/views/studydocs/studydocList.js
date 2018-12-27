import m from 'mithril';
import marked from 'marked';
import { apiUrl } from 'config';
import ExpansionPanel from 'amiv-web-ui-components/src/expansionPanel';
import { Dialog } from 'polythene-mithril-dialog';
import { Button } from 'polythene-mithril-button';
import StudydocsController from '../../models/studydocs';
import { i18n, currentLanguage } from '../../models/language';
import { FilteredListDataStore, FilteredListPage } from '../filteredListPage';

const controller = new StudydocsController();
const dataStore = new FilteredListDataStore();

export default class StudydocList extends FilteredListPage {
  constructor() {
    super('studydocuments', dataStore);

    this.dropdownDisabled = {};
  }

  oninit(vnode) {
    super.oninit(vnode, vnode.attrs.documentId);
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
    return controller.loadPageData(1);
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
      (values[field] || values[field].length === 0 || values[field].includes('all')) &&
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
                    onclick: () => Dialog.hide(),
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
      onchange: values => {
        const query = {};
        this.dataStore.filterValues = values;

        Object.keys(values).forEach(key => {
          let value = values[key];

          if (Array.isArray(value) && value.indexOf('all') === -1) {
            query[key] = { $in: value };
          } else if (key === 'title' && value.length > 0) {
            value = value.substring(0, value.length);
            query.$or = [
              { title: { $regex: `^(?i).*${value}.*` } },
              { lecture: { $regex: `^(?i).*${value}.*` } },
              { author: { $regex: `^(?i).*${value}.*` } },
              { professor: { $regex: `^(?i).*${value}.*` } },
            ];
          }

          if (query.department && query.department.$in.length === 2) {
            delete query.department;
          }
          if (query.type && query.type.$in.length === 4) {
            delete query.type;
          }
        });
        return controller.setQuery({ where: query });
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  get _lists() {
    return [
      {
        name: 'studydocs',
        pages: controller,
        loadMore: this._hasMorePagesToLoad() ? this._loadNextPage : undefined,
      },
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  _renderItem(studydocument, list, selectedId) {
    const animationDuration = 300; // in ms

    return m(ExpansionPanel, {
      id: this.getItemElementId(studydocument._id),
      expanded: studydocument._id === selectedId,
      separated: true,
      duration: animationDuration,
      onChange: expanded => {
        this.onChange(studydocument._id, expanded, animationDuration);
      },
      header: () =>
        m('div.studydoc', [
          m(
            'div',
            {
              class: 'list-title',
            },
            [
              m('h2', studydocument.title),
              m('div', [m('span', document.author), m('span', i18n(document.course_year))]),
            ]
          ),
        ]),
      content: () =>
        m(
          'div',
          studydocument.files.map(item =>
            m('div', [
              m(
                'span',
                m(Button, {
                  label: `Download ${item.name.split('.').pop()}`,
                  events: {
                    onclick: () => window.open(`${apiUrl}${item.file}`, '_blank'),
                  },
                })
              ),
              m('span', item.name),
            ])
          )
        ),
    });
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
