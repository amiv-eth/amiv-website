import m from 'mithril';
import marked from 'marked';
import animateScrollTo from 'animated-scroll-to';
import { Icon } from 'polythene-mithril-icon';
import Spinner from 'amiv-web-ui-components/src/spinner';
import StudydocsController from '../../models/studydocs';
import Select from '../../components/Select';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import SelectTextField from '../../components/SelectTextField';
import FileInput from '../../components/FileInput';
import { i18n, currentLanguage } from '../../models/language';
import { Infobox } from '../errors';
import icons from '../../images/icons';

const STATE_LOADING = 0;
const STATE_LOADED = 1;
const STATE_LOADING_ERROR = 2;

const controller = new StudydocsController();

const departments = [
  'itet',
  'mavt',
  'arch',
  'baug',
  'bsse',
  'infk',
  'matl',
  'biol',
  'chab',
  'math',
  'phys',
  'erdw',
  'usys',
  'hest',
  'mtec',
  'gess',
];

export default class StudydocNew {
  oninit() {
    this.invalid = new Set([]);
    this.doc = { course_year: new Date().getFullYear() };
    this.isValid = false;
    this.isBusy = false;
    this.state = STATE_LOADING;
    this.uploadError = false;

    this._loadAvailableValues();
  }

  _loadAvailableValues() {
    if (Object.keys(controller.availableFilterValues).length > 0) {
      // Reload values in the background while showing the old values in the form.
      this.state = STATE_LOADED;
    } else {
      this.state = STATE_LOADING;
    }

    controller
      .loadPageData(1)
      .then(() => {
        this.state = STATE_LOADED;
        m.redraw();
      })
      .catch(() => {
        this.state = STATE_LOADING_ERROR;
        m.redraw();
      });
  }

  validate() {
    this.isValid =
      this.invalid.size === 0 &&
      this.doc.files !== undefined &&
      this.doc.files.length > 0 &&
      this.doc.title !== undefined &&
      this.doc.title !== '';
  }

  async submit() {
    if (this.isValid && !this.isBusy) {
      this.isBusy = true;
      this.uploadError = false;
      try {
        const response = await StudydocsController.addNew(this.doc);
        this.isBusy = false;
        m.route.set(`/${currentLanguage()}/studydocuments/${response._id}`);
      } catch (Exception) {
        this.isBusy = false;
        this.uploadError = true;
        animateScrollTo(document.body);
      }
    }
  }

  view() {
    return m('div.studydocs-upload', [
      m('div.title', m('h2', i18n('studydocs.uploadTitle'))),
      m('div.studydocs-upload-form', [
        this._renderForm(),
        m('div.separator'),
        this.constructor._renderRules(),
      ]),
    ]);
  }

  _renderForm() {
    if (this.state === STATE_LOADING) {
      return m('div.form-container-loading', m(Spinner, { className: 'spinner', show: true }));
    }

    if (this.state === STATE_LOADING_ERROR) {
      return m('div.form-container-error', [
        m('h1', i18n('error.title')),
        m('p', i18n('studydocs.uploadLoadingError')),
        m(Button, {
          label: i18n('retry'),
          events: { onclick: () => this._loadAvailableValues() },
        }),
      ]);
    }

    return m('div.form-container', [
      this.uploadError &&
        m(Infobox, {
          icon: m(Icon, { svg: { content: m.trust(icons.error) } }),
          label: i18n('studydocs.uploadError'),
        }),
      m(TextField, {
        name: 'title',
        className: 'title',
        label: i18n('studydocs.title'),
        floatingLabel: true,
        value: this.doc.title,
        required: true,
        events: {
          oninput: m.withAttr('value', value => {
            this.doc.title = value;
            this.validate();
          }),
        },
      }),
      m(SelectTextField, {
        name: 'author',
        label: i18n('studydocs.author'),
        floatingLabel: true,
        options: controller.availableFilterValues.author
          ? Object.keys(controller.availableFilterValues.author).sort()
          : [],
        onChange: ({ value, isValid }) => {
          this.doc.author = value;
          if (isValid) {
            this.invalid.delete('author');
          } else {
            this.invalid.add('author');
          }
          this.validate();
        },
      }),
      m(SelectTextField, {
        name: 'lecture',
        label: i18n('studydocs.lecture'),
        floatingLabel: true,
        options: controller.availableFilterValues.lecture
          ? Object.keys(controller.availableFilterValues.lecture).sort()
          : [],
        onChange: ({ value, isValid }) => {
          this.doc.lecture = value;
          if (isValid) {
            this.invalid.delete('lecture');
          } else {
            this.invalid.add('lecture');
          }
          this.validate();
        },
      }),
      m(SelectTextField, {
        name: 'professor',
        label: i18n('studydocs.professor'),
        floatingLabel: true,
        options: controller.availableFilterValues.professor
          ? Object.keys(controller.availableFilterValues.professor).sort()
          : [],
        onChange: ({ value, isValid }) => {
          this.doc.professor = value;
          if (isValid) {
            this.invalid.delete('professor');
          } else {
            this.invalid.add('professor');
          }
          this.validate();
        },
      }),
      m('div.select-row', [
        m(Select, {
          name: 'type',
          label: i18n('studydocs.type'),
          onChange: ({ value }) => {
            if (value === '') {
              this.doc.type = null;
            } else {
              this.doc.type = value;
            }
            this.validate();
          },
          options: [
            { value: '', label: '' },
            { value: 'exams', label: i18n('studydocs.types.exams') },
            { value: 'cheat sheets', label: i18n('studydocs.types.cheatsheets') },
            { value: 'lecture documents', label: i18n('studydocs.types.lectureDocuments') },
            { value: 'exercises', label: i18n('studydocs.types.exercises') },
          ],
        }),
        m(Select, {
          name: 'department',
          label: i18n('studydocs.department'),
          onChange: ({ value }) => {
            if (value === '') {
              this.doc.department = null;
            } else {
              this.doc.department = value;
            }
          },
          options: [
            { value: '', label: '' },
            ...departments.map(department => ({
              value: department,
              label: `D-${department.toUpperCase()}`,
            })),
          ],
        }),
        m(TextField, {
          name: 'course_year',
          type: 'number',
          label: i18n('studydocs.courseYear'),
          floatingLabel: true,
          value: this.doc.course_year,
          events: {
            oninput: e => {
              this.doc.course_year = Number(e.target.value);
            },
          },
        }),
        m(Select, {
          name: 'semester',
          label: i18n('studydocs.semester'),
          onChange: ({ value }) => {
            if (value === '') {
              this.doc.semester = null;
            } else {
              this.doc.semester = value;
            }
          },
          options: [
            { value: '', label: '' },
            { value: '1', label: i18n('studydocs.semester1') },
            { value: '2', label: i18n('studydocs.semester2') },
            { value: '3', label: i18n('studydocs.semester3') },
            { value: '4', label: i18n('studydocs.semester4') },
            { value: '5+', label: i18n('studydocs.semester5+') },
          ],
        }),
      ]),
      m('div.file-input', [
        m(FileInput, {
          multiple: 1,
          onchange: e => {
            this.doc.files = e.target.files;
            this.validate();
          },
        }),
        m('span', i18n('studydocs.uploadFileHint')),
      ]),
      m(Button, {
        name: 'submit',
        label: this.isBusy ? i18n('studydocs.uploading') : i18n('studydocs.upload'),
        active: this.isValid && !this.isBusy,
        events: {
          onclick: () => this.submit(),
        },
      }),
    ]);
  }

  static _renderRules() {
    return m('div.rules', [
      m('h2', i18n('studydocs.rules.title')),
      m('ol', [
        m('div', m('li', m.trust(marked(i18n('studydocs.rules.one'))))),
        m('div', m('li', m.trust(marked(i18n('studydocs.rules.two'))))),
        m('div', m('li', m.trust(marked(i18n('studydocs.rules.three'))))),
        m('div', m('li', m.trust(marked(i18n('studydocs.rules.four'))))),
      ]),
      m('div', i18n('studydocs.thanks')),
    ]);
  }
}
