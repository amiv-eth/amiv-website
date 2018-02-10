// import Ajv from 'ajv';
import * as studydocs from '../models/studydocs';
// import { apiUrl } from '../models/config';
import { isLoggedIn } from '../models/auth';
import { log } from '../models/log';
import { Error401 } from './errors';

const m = require('mithril');

// TODO: add validate

export default class studydocNew {
  oninit() {
    // this.ajv = new Ajv({
    //   missingRefs: 'ignore',
    //   errorDataPath: 'property',
    //   allErrors: true,
    // });
    // // load schema
    // m.request(`${apiUrl}/docs/api-docs`).then((schema) => {
    //   const objectSchema = schema.definitions.Studydocument;
    //   this.ajv.addSchema(objectSchema, 'schema');
    //   this.validate = this.ajv.getSchema('schema');
    // });

    this.doc = { semester: '1', department: 'itet', type: 'exams' };
  }

  view() {
    if (!isLoggedIn()) return m(Error401);

    return m('div', [
      m('form', {
        onsubmit: (e) => {
          e.preventDefault();
          log(this.doc);
          studydocs.addNew(this.doc);
          m.route.set('/studydocuments');
        },
      }, [
        m('input[name=title]', {
          placeholder: 'title',
          onchange: (e) => {
            this.doc.title = e.target.value;
            // this.validate(this.doc);
          },
        }),
        m('input[name=professor]', {
          placeholder: 'professor',
          onchange: (e) => {
            this.doc.professor = e.target.value;
            // this.validate(this.doc);
          },
        }),
        m('input[name=author]', {
          placeholder: 'author',
          onchange: (e) => {
            this.doc.author = e.target.value;
            // this.validate(this.doc);
          },
        }),
        m('select[name=semester]', {
          onchange: (e) => {
            this.doc.semester = e.target.value;
            // this.validate(this.doc);
          },
        }, [
          m('option', { value: '1' }, '1'),
          m('option', { value: '2' }, '2'),
          m('option', { value: '3' }, '3'),
          m('option', { value: '4' }, '4'),
          m('option', { value: '5+' }, '5+'),
        ]),
        m('select[name=department]', {
          onchange: (e) => {
            this.doc.department = e.target.value;
            // this.validate(this.doc);
          },
        }, [
          m('option', { value: 'itet' }, 'itet'),
          m('option', { value: 'mavt' }, 'mavt'),
        ]),
        m('input[name=lecture]', {
          placeholder: 'lecture',
          onchange: (e) => {
            this.doc.lecture = e.target.value;
            // this.validate(this.doc);
          },
        }),
        m('input[name=course_year]', {
          type: 'number',
          placeholder: 2018,
          onchange: (e) => {
            this.doc.course_year = e.target.value;
            // this.validate(this.doc);
          },
        }),
        m('select[name=type]', {
          onchange: (e) => {
            this.doc.type = e.target.value;
            // this.validate(this.doc);
          },
        }, [
          m('option', { value: 'exams' }, 'exams'),
          m('option', { value: 'cheat sheets' }, 'cheat sheets'),
          m('option', { value: 'lecture documents' }, 'lecture documents'),
          m('option', { value: 'exercises' }, 'exercises'),
        ]),
        m('button.button[type=submit]', 'Submit'),
      ]),
      m('input[type=file][multiple]', {
        onchange: (e) => {
          this.doc.files = e.target.files;
        },
      }),
    ]);
  }
}
