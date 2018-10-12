import m from 'mithril';
import StudydocsController from '../../models/studydocs';
import { Button, InputGroupForm, Dropdown } from '../../components';
import { currentLanguage, i18n } from '../../models/language';

export default class studydocNew {
  oninit() {
    // We need to set the default values because they get only added to the request
    // 'onchange' and thus do not appear in a request if the user does not change them
    this.doc = { semester: null, type: null, department: null };
    this.isValid = false;
    this.isBusy = false;
  }

  static _getInputSuggestions(field, input, callback) {
    if (input.length > 2) {
      StudydocsController.getInputSuggestions(field, input).then(result => {
        const suggestions = new Set();
        result._items.forEach(item => {
          suggestions.add(item[field]);
        });
        callback(Array.from(suggestions));
      });
    } else {
      callback([]);
    }
  }

  validate() {
    console.log(this.doc.type);
    this.isValid = this.doc.files && this.doc.files.length > 0 && this.doc.type !== null;
  }

  async submit() {
    if (this.isValid && !this.isBusy) {
      this.isBusy = true;
      await StudydocsController.addNew(this.doc);
      this.isBusy = false;
      m.route.set(`/${currentLanguage()}/studydocuments`);
    }
  }

  view() {
    return m('form', { onsubmit: () => false }, [
      m(InputGroupForm, {
        name: 'title',
        title: i18n('studydocs.title'),
        oninput: e => {
          this.doc.title = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('title', input, callback),
      }),
      m(InputGroupForm, {
        name: 'professor',
        title: i18n('studydocs.professor'),
        oninput: e => {
          this.doc.professor = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('professor', input, callback),
      }),
      m(InputGroupForm, {
        name: 'author',
        title: i18n('studydocs.author'),
        oninput: e => {
          this.doc.author = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('author', input, callback),
      }),
      m(Dropdown, {
        name: 'semester',
        onchange: e => {
          const { value } = e.target;
          if (value === '') {
            this.doc.semester = null;
          } else {
            this.doc.semester = value;
          }
        },
        selected: null,
        data: [
          { value: '', label: i18n('studydocs.no_semester') },
          { value: '1', label: '1' },
          { value: '2', label: '2' },
          { value: '3', label: '3' },
          { value: '4', label: '4' },
          { value: '5+', label: '5+' },
        ],
      }),
      m(Dropdown, {
        name: 'department',
        onchange: e => {
          const { value } = e.target;
          if (value === '') {
            this.doc.department = null;
          } else {
            this.doc.department = value;
          }
        },
        selected: null,
        data: [
          { value: '', label: i18n('studydocs.no_department') },
          { value: 'itet', label: 'ITET' },
          { value: 'mavt', label: 'MAVT' },
        ],
      }),
      m(InputGroupForm, {
        name: 'lecture',
        title: i18n('studydocs.lecture'),
        oninput: e => {
          this.doc.lecture = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('lecture', input, callback),
      }),
      m(InputGroupForm, {
        name: 'course_year',
        title: i18n('studydocs.course_year'),
        type: 'date',
        required: 1,
        args: {
          placeholder: new Date().getFullYear(),
        },
        oninput: e => {
          this.doc.course_year = e.target.value;
        },
      }),
      m(Dropdown, {
        name: 'type',
        onchange: e => {
          const { value } = e.target;
          if (value === '') {
            this.doc.type = null;
          } else {
            this.doc.type = value;
          }
          this.validate();
        },
        selected: '',
        data: [
          { value: '', label: `${i18n('studydocs.type')}*`, disabled: true },
          { value: 'exams', label: i18n('exams') },
          { value: 'cheat sheets', label: i18n('cheat sheets') },
          { value: 'lecture documents', label: i18n('lecture documents') },
          { value: 'exercises', label: i18n('exercises') },
        ],
      }),
      m(InputGroupForm, {
        name: 'files',
        title: i18n('studydocs.files'),
        args: {
          type: 'file',
          multiple: 1,
        },
        onchange: e => {
          this.doc.files = e.target.files;
          this.validate();
        },
      }),
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
}
