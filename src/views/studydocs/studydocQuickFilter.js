import m from 'mithril';
import { Icon, Shadow } from 'polythene-mithril';
import DropdownCard from 'amiv-web-ui-components/src/dropdownCard';
import Spinner from 'amiv-web-ui-components/src/spinner';
import Button from '../../components/Button';
import ListSelect from '../../components/ListSelect';
import { i18n } from '../../models/language';
import StudydocsController from '../../models/studydocs';
import icons from '../../images/icons';

const STATE_SEMESTER = 0;
const STATE_DEPARTMENT = 1;
const STATE_LECTURE = 2;
const STATE_SELECTED = 3;

const STATE_LOADING = 6;
const STATE_LOADED = 7;
const STATE_LOADING_ERROR = 8;

const controller = new StudydocsController();
let state = STATE_SEMESTER;
let filterValues = {};
let expanded = true;

export default class StudydocQuickFilter {
  constructor({ attrs: { controller: listController, dataStore } }) {
    this.listController = listController;
    this.dataStore = dataStore;
    this.loadingState = STATE_LOADED;
  }

  static clear() {
    state = STATE_SEMESTER;
    filterValues = {};
  }

  set state(value) {
    state = value;
    if (value === STATE_SEMESTER) {
      filterValues = {};
    } else if (value === STATE_DEPARTMENT || value === STATE_LECTURE) {
      this._loadData();
    } else if (value === STATE_SELECTED) {
      expanded = false;
      setTimeout(() => {
        this.dataStore.filterValues = JSON.parse(JSON.stringify(filterValues));
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get state() {
    return state;
  }

  _loadData() {
    controller
      .setFilterValues(filterValues)
      .then(() => {
        this.loadingState = STATE_LOADED;
        m.redraw();
      })
      .catch(() => {
        this.loadingState = STATE_LOADING_ERROR;
        m.redraw();
      });
    this.loadingState = STATE_LOADING;
  }

  view() {
    const animationDuration = 300; // in ms
    let content;

    if (this.loadingState === STATE_LOADING) {
      content = m('div.spinner', m(Spinner, { show: true }));
    } else if (this.loadingState === STATE_LOADING_ERROR) {
      content = m('div', [
        m('h3', i18n('studydocs.quickfilter.loadingError')),
        m(Button, {
          label: i18n('retry'),
          events: {
            onclick: () => {
              this._loadData();
            },
          },
        }),
      ]);
    } else if (this.state === STATE_DEPARTMENT) {
      let departments = [];
      if (controller._availableFilterValues.department) {
        departments = Object.keys(controller._availableFilterValues.department).sort();
      }
      content = [
        m('h3', i18n('studydocs.quickfilter.selectDepartment')),
        m('div', [
          this._renderDepartmentButton('all', departments),
          ...departments.map(department => this._renderDepartmentButton(department)),
        ]),
      ];
    } else if (this.state === STATE_LECTURE || this.state === STATE_SELECTED) {
      content = [
        m(
          'div',
          m(ListSelect, {
            placeholderText: i18n('studydocs.quickfilter.lecturePlaceholder'),
            toolbarAttrs: {
              background: '#fff',
              style: { borderRadius: '4px' },
              before: m(Shadow),
            },
            listAttrs: {
              permanent: true,
              height: null,
              style: { borderRadius: '4px', border: '1px solid #eee' },
            },
            onSelect: item => {
              filterValues.lecture = [item];
              this.state = STATE_SELECTED;
            },
            options: controller.availableFilterValues.lecture
              ? Object.keys(controller.availableFilterValues.lecture).sort()
              : [],
          })
        ),
      ];
    } else {
      // this.state === STATE_SEMESTER is the default case
      const departments = ['itet', 'mavt', 'other'];
      content = [
        m('h3', i18n('studydocs.quickfilter.selectSemester')),
        m('div.semester', departments.map(department => this._renderSemesterList(department))),
      ];
    }

    return m(DropdownCard, {
      className: ['studydocs-quickfilter', expanded ? 'expanded' : null].join(' '),
      expanded,
      separated: false,
      duration: animationDuration,
      onChange: expandedArg => {
        expanded = expandedArg;
      },
      title: i18n('studydocs.quickfilter.title'),
      content: m('div.studydocs-quickfilter-container', [
        m('div.selection', [
          m(Button, {
            className: 'button flat-button',
            label: i18n('reset'),
            events: {
              onclick: () => {
                this.constructor.clear();
                this.dataStore.filterValues = {};
              },
            },
          }),
          ...this._renderSelection(),
        ]),
        m('div.filtercontent', content),
      ]),
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _renderSelection() {
    let items = [];

    const getDepartmentItem = () => {
      if (filterValues.department) {
        if (filterValues.department.length === 1) {
          return {
            label: filterValues.department.map(department => `D-${department.toUpperCase()}`),
          };
        }
        if (filterValues.department.length > 1) {
          return { label: i18n(`studydocs.department.otherLong`) };
        }
      }
      return null;
    };

    const getSemesterItem = () => {
      if (filterValues.semester && filterValues.semester.length > 0) {
        return {
          label: filterValues.semester
            .map(semester => i18n(`studydocs.semester${semester}`))
            .join(', '),
        };
      }
      return null;
    };

    if (this.state === STATE_DEPARTMENT) {
      items = [
        { className: 'unset', label: i18n('studydocs.quickfilter.selectDepartment') },
        getSemesterItem(),
      ];
    } else if (this.state === STATE_LECTURE) {
      items = [
        getDepartmentItem(),
        getSemesterItem(),
        { className: 'unset', label: i18n('studydocs.quickfilter.selectLecture') },
      ];
    } else {
      items = [{ className: 'unset', label: i18n('studydocs.quickfilter.selectSemester') }];
    }

    if (items.length === 0) {
      items.push({ className: 'unset', label: i18n('studydocs.quickfilter.selectSemester') });
    }

    return [
      ...items.map(
        (item, index) =>
          item && [
            index > 0 ? m(Icon, { svg: { content: m.trust(icons.rightarrow) } }) : null,
            m('span', { className: item.className || '' }, item.label),
          ]
      ),
    ];
  }

  _renderDepartmentButton(department, values = department) {
    return m(Button, {
      className: 'flat-button',
      border: department === 'all',
      label:
        department === 'all' ? i18n('studydocs.departments.all') : `D-${department.toUpperCase()}`,
      events: {
        onclick: () => {
          filterValues.department = Array.isArray(values) ? values : [values];
          this.state = STATE_LECTURE;
        },
      },
    });
  }

  _renderSemesterList(department) {
    const semesters = ['1', '2', '3', '4', '5+'];
    return m('div.department', [
      m('div', department !== 'other' ? `D-${department.toUpperCase()}` : department),
      ...semesters.map(semester =>
        m(Button, {
          className: 'flat-button',
          label: semester,
          events: {
            onclick: () => {
              filterValues.semester = [semester];
              if (department === 'other') {
                this.state = STATE_DEPARTMENT;
              } else {
                filterValues.department = [department];
                this.state = STATE_LECTURE;
              }
            },
          },
        })
      ),
    ]);
  }
}
