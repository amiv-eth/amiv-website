import m from 'mithril';
import StudydocsController from '../../models/studydocs';
import { lectures } from '../studydocs/lectures';
import { i18n, currentLanguage } from '../../models/language';
import { FilteredListDataStore, FilteredListPage } from '../filteredListPage';
import StudydocDetails from './studydocDetails';

const controller = new StudydocsController();
const dataStore = new FilteredListDataStore();

export default class StudydocList extends FilteredListPage {
  constructor() {
    super('studydoc', dataStore, true);

    this.lectureDropdownDisabled = true;
  }

  oninit(vnode) {
    super.oninit(vnode, vnode.attrs.documentId);
  }

  // eslint-disable-next-line class-methods-use-this
  _loadItem(documentId) {
    return controller.loadDocument(documentId);
  }

  // eslint-disable-next-line class-methods-use-this
  _reloadData() {
    return controller.loadPageData(1);
  }

  _isLectureDropdownDisabled() {
    return this.lectureDropdownDisabled;
  }

  // dynamic lectures data based on selected semester and department
  _loadLectures(values) {
    if (!values.department) {
      return [];
    }

    const data = [];
    data.push({
      value: 'all',
      label: i18n('studydocs.lectures_all'),
    });

    if (values.semester !== 'all') {
      if (values.department.includes('itet')) {
        for (let i = 0; i < lectures.itet[values.semester].length; i += 1) {
          data.push({
            value: lectures.itet[values.semester][i],
            label: lectures.itet[values.semester][i],
          });
        }
      }
      if (values.department.includes('mavt')) {
        for (let i = 0; i < lectures.mavt[values.semester].length; i += 1) {
          data.push({
            value: lectures.mavt[values.semester][i],
            label: lectures.mavt[values.semester][i],
          });
        }
      }
    }
    this.lectureDropdownDisabled = data.length <= 1;

    return data;
  }

  get _filterViewAttributes() {
    return {
      fields: [
        {
          type: 'text',
          key: 'title',
          label: i18n('studydocs.searchfield'),
          min_length: 3,
        },
        {
          type: 'button',
          label: i18n('search'),
          events: {
            onclick: 'search',
          },
        },
        {
          type: 'button',
          label: i18n('reset'),
          className: 'flat-button',
          events: {
            onclick: 'reset',
          },
        },
        {
          type: 'checkbox',
          key: 'department',
          label: i18n('studydocs.department'),
          default: ['itet', 'mavt'],
          values: [{ value: 'itet', label: 'D-ITET' }, { value: 'mavt', label: 'D-MAVT' }],
        },
        {
          type: 'dropdown',
          key: 'semester',
          default: 'all',
          values: [
            { value: 'all', label: i18n('studydocs.semester_all') },
            { value: '1', label: i18n('studydocs.semester1') },
            { value: '2', label: i18n('studydocs.semester2') },
            { value: '3', label: i18n('studydocs.semester3') },
            { value: '4', label: i18n('studydocs.semester4') },
            { value: '5+', label: i18n('studydocs.semester5+') },
          ],
        },
        {
          type: 'dropdown',
          key: 'lecture',
          default: 'all',
          disabled: this._isLectureDropdownDisabled,
          values: this._loadLectures,
        },
        {
          type: 'checkbox',
          key: 'type',
          label: i18n('studydocs.type'),
          default: ['cheat sheets', 'exams', 'lecture documents', 'exercises'],
          values: [
            { value: 'cheat sheets', label: i18n('cheat sheets') },
            { value: 'exams', label: i18n('exams') },
            { value: 'lecture documents', label: i18n('lecture documents') },
            { value: 'exercises', label: i18n('exercises') },
          ],
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

        Object.keys(values).forEach(key => {
          let value = values[key];

          if (Array.isArray(value)) {
            query[key] = { $in: value };
          } else if (key === 'semester' && value !== 'all') {
            query[key] = value;
          } else if (key === 'lecture' && value !== 'all') {
            query[key] = value;
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
        controller.setQuery({ where: query });
      },
    };
  }

  get _listView() {
    const tableHeadings = ['studydocs.title', 'studydocs.author', 'studydocs.type'];
    return [
      m('div.list-item', tableHeadings.map(header => m('span', i18n(header)))),
      ...controller.map(page =>
        page.map(document => this.constructor._renderStudydocListItem(document))
      ),
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  get _detailsView() {
    return m(StudydocDetails, { controller });
  }

  // eslint-disable-next-line class-methods-use-this
  get _detailsPlaceholderView() {
    return m('h1', i18n('studydocs.no_selection'));
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

  static _renderStudydocListItem(document) {
    return m(
      'div',
      {
        class: 'list-item',
        onclick: () => {
          m.route.set(`/${currentLanguage()}/studydocuments/${document._id}`);
        },
      },
      [m('span', document.title), m('span', document.author), m('span', i18n(document.type))]
    );
  }
}
