import m from 'mithril';
import * as studydocs from '../../models/studydocs';
import { isLoggedIn } from '../../models/auth';
import { Error401 } from '../errors';
import inputGroup from '../form/inputGroup';
import selectGroup from '../form/selectGroup';
import { Button } from '../../components';

export default class studydocNew {
  oninit() {
    this.doc = { type: 'exams' };
    this.isValid = false;
  }

  static _getInputSuggestions(field, input, callback) {
    if (input.length > 2) {
      studydocs.getInputSuggestions(field, input).then(result => {
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

  submit() {
    if (this.isValid) {
      studydocs.addNew(this.doc);
      m.route.set('/studydocuments');
    }
  }

  view() {
    if (!isLoggedIn()) return m(Error401);

    return m('form', [
      m(inputGroup, {
        name: 'title',
        title: 'Title',
        oninput: e => {
          this.doc.title = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('title', input, callback),
      }),
      m(inputGroup, {
        name: 'professor',
        title: 'Professor',
        oninput: e => {
          this.doc.professor = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('professor', input, callback),
      }),
      m(inputGroup, {
        name: 'author',
        title: 'Author',
        oninput: e => {
          this.doc.author = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('author', input, callback),
      }),
      m(selectGroup, {
        name: 'semester',
        title: 'Semester',
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
        title: 'Department',
        type: 'select',
        onchange: e => {
          this.doc.department = e.target.value;
        },
        options: [{ value: 'itet', text: 'itet' }, { value: 'mavt', text: 'mavt' }],
      }),
      m(inputGroup, {
        name: 'lecture',
        title: 'Lecture',
        oninput: e => {
          this.doc.lecture = e.target.value;
        },
        getSuggestions: (input, callback) =>
          studydocNew._getInputSuggestions('lecture', input, callback),
      }),
      m(inputGroup, {
        name: 'course_year',
        title: 'Course Year',
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
        title: 'Type',
        type: 'select',
        onchange: e => {
          this.doc.type = e.target.value;
        },
        options: [
          { value: 'exams', text: 'Exam' },
          { value: 'cheat sheets', text: 'Cheat sheet' },
          { value: 'lecture documents', text: 'Lecture Document' },
          { value: 'exercises', text: 'Exercise' },
        ],
      }),
      m(inputGroup, {
        name: 'files',
        title: 'Files',
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
        label: 'Submit',
        active: this.isValid,
        events: {
          onclick: () => this.submit(),
        },
      }),
    ]);
  }
}
