import m from 'mithril';
import StudydocsController from '../../models/studydocs';
import { Button, Dropdown, TextField, FileInput } from '../../components';
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
    return m('div#fileUpload-container', [
      m(
        'div#uploader-info',
        m('form.new-style', { onsubmit: () => false }, [
          m(TextField, {
            name: 'title',
            label: i18n('studydocs.title'),
            floatingLabel: true,
            value: this.doc.title,
            events: {
              oninput: e => {
                this.rfid = e.target.value;
              },
            },
          }),
          m(TextField, {
            name: 'author',
            label: i18n('studydocs.author'),
            floatingLabel: true,
            events: {
              oninput: e => {
                this.rfid = e.target.value;
              },
            },
          }),
          m(TextField, {
            name: 'course_year',
            label: i18n('studydocs.course_year'),
            floatingLabel: true,
            args: {
              placeholder: new Date().getFullYear(),
            },
            oninput: e => {
              this.doc.course_year = e.target.value;
            },
          }),
          m(Dropdown, {
            name: i18n('studydocs.type'),
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
          m(FileInput, {
            multiple: 1,
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
        ])
      ),

      m('div#document-info', [
        m(TextField, {
          name: 'lecture',
          label: i18n('studydocs.lecture'),
          floatingLabel: true,
          events: {
            oninput: e => {
              this.rfid = e.target.value;
            },
          },
        }),
        m(Dropdown, {
          name: i18n('studydocs.department'),
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
        m(Dropdown, {
          name: i18n('studydocs.semester'),
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
            { value: '1', label: i18n('studydocs.semester1') },
            { value: '2', label: i18n('studydocs.semester2') },
            { value: '3', label: i18n('studydocs.semester3') },
            { value: '4', label: i18n('studydocs.semester4') },
            { value: '5+', label: i18n('studydocs.semester5+') },
          ],
        }),

        m(TextField, {
          name: 'professor',
          label: i18n('studydocs.professor'),
          floatingLabel: true,
          value: this.doc.professor,
          events: {
            oninput: e => {
              this.rfid = e.target.value;
            },
          },
        }),
      ]),
    ]);
  }
}
