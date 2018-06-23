import m from 'mithril';
import StudydocsController from '../../models/studydocs';
import inputGroup from '../form/inputGroup';
import selectGroup from '../form/selectGroup';
import { Button } from '../../components';
import { currentLanguage, i18n } from '../../models/language';

export default class studydocNew {
  oninit() {
    // We need to set the default values because they get only added to the request
    // 'onchange' and thus do not appear in a request if the user does not change them
    this.doc = { semester: 1, type: 'exams', department: 'itet' };
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
      m(inputGroup, {
        name: 'title',
        title: i18n('studydocs.title'),
        oninput: e => {
          this.doc.title = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('title', input, callback),
      }),
      m(inputGroup, {
        name: 'professor',
        title: i18n('studydocs.professor'),
        oninput: e => {
          this.doc.professor = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('professor', input, callback),
      }),
      m(inputGroup, {
        name: 'author',
        title: i18n('studydocs.author'),
        oninput: e => {
          this.doc.author = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('author', input, callback),
      }),
      m(selectGroup, {
        name: 'semester',
        title: i18n('studydocs.semester'),
        type: 'select',
        onchange: e => {
          this.doc.semester = e.target.value;
        },
        options: [
          { value: '1', text: '1' },
          { value: '2', text: '2' },
          { value: '3', text: '3' },
          { value: '4', text: '4' },
          { value: '5+', text: '5+' },
        ],
      }),
      m(selectGroup, {
        name: 'department',
        title: i18n('studydocs.department'),
        type: 'select',
        onchange: e => {
          this.doc.department = e.target.value;
        },
        options: [{ value: 'itet', text: 'itet' }, { value: 'mavt', text: 'mavt' }],
      }),
      m(inputGroup, {
        name: 'lecture',
        title: i18n('studydocs.lecture'),
        oninput: e => {
          this.doc.lecture = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('lecture', input, callback),
      }),
      m(inputGroup, {
        name: 'course_year',
        title: i18n('studydocs.course_year'),
        type: 'number',
        args: {
          placeholder: new Date().getFullYear(),
        },
        oninput: e => {
          this.doc.course_year = e.target.value;
        },
      }),
      m(selectGroup, {
        name: 'type',
        title: i18n('studydocs.type'),
        type: 'select',
        onchange: e => {
          this.doc.type = e.target.value;
        },
        options: [
          { value: 'exams', text: i18n('exams') },
          { value: 'cheat sheets', text: i18n('cheat sheets') },
          { value: 'lecture documents', text: i18n('lecture documents') },
          { value: 'exercises', text: i18n('exercises') },
        ],
      }),
      m(inputGroup, {
        name: 'files',
        title: i18n('studydocs.files'),
        args: {
          type: 'file',
          multiple: 1,
        },
        onchange: e => {
          this.doc.files = e.target.files;
          if (this.doc.files && this.doc.files.length > 0) {
            this.isValid = true;
          } else {
            this.isValid = false;
          }
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
