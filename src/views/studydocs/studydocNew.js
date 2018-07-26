import m from 'mithril';
import StudydocsController from '../../models/studydocs';
import { Button, TextField, InputGroupForm, SelectGroupForm } from '../../components';
import { currentLanguage, i18n } from '../../models/language';

export default class studydocNew {
  oninit() {
    // We need to set the default values because they get only added to the request
    // 'onchange' and thus do not appear in a request if the user does not change them
    this.doc = { semester: 1, type: 'exams', department: 'itet' };
    this.isValid = false;
    this.isBusy = false;
  }

  static async _getInputSuggestions(field, input) {
    if (input.length > 2) {
      const result = await StudydocsController.getInputSuggestions(field, input);
      const suggestions = new Set();
      result._items.forEach(item => {
        suggestions.add(item[field]);
      });
      return Array.from(suggestions);
    }
    return [];
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
      m(TextField, {
        name: 'title',
        label: i18n('studydocs.title'),
        floatingLabel: true,
        events: {
          oninput: e => {
            this.doc.title = e.target.value;
          },
        },
        onAutocomplete: value => studydocNew._getInputSuggestions('title', value),
      }),
      m(TextField, {
        name: 'professor',
        label: i18n('studydocs.professor'),
        floatingLabel: true,
        events: {
          oninput: e => {
            this.doc.professor = e.target.value;
          },
        },
        onAutocomplete: value => studydocNew._getInputSuggestions('professor', value),
      }),
      m(TextField, {
        name: 'author',
        label: i18n('studydocs.author'),
        floatingLabel: true,
        events: {
          oninput: e => {
            this.doc.author = e.target.value;
          },
        },
        onAutocomplete: value => studydocNew._getInputSuggestions('author', value),
      }),
      m(SelectGroupForm, {
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
      m(SelectGroupForm, {
        name: 'department',
        title: i18n('studydocs.department'),
        type: 'select',
        onchange: e => {
          this.doc.department = e.target.value;
        },
        options: [{ value: 'itet', text: 'itet' }, { value: 'mavt', text: 'mavt' }],
      }),
      m(TextField, {
        name: 'lecture',
        label: i18n('studydocs.lecture'),
        floatingLabel: true,
        events: {
          oninput: e => {
            this.doc.lecture = e.target.value;
          },
        },
        onAutocomplete: value => studydocNew._getInputSuggestions('lecture', value),
      }),
      m(TextField, {
        name: 'course_year',
        label: i18n('studydocs.course_year'),
        floatingLabel: true,
        type: 'number',
        placeholder: new Date().getFullYear(),
        events: {
          oninput: e => {
            this.doc.course_year = e.target.value;
          },
        },
      }),
      m(SelectGroupForm, {
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
      m(InputGroupForm, {
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
