import * as auth from '../models/auth';

const m = require('mithril');

module.exports = {
  username: '',
  password: '',
  view() {
    return m('div', [
      m(
        'form', {
          onsubmit: (e) => {
            e.preventDefault();
            auth.login(this.username, this.password);
          },
        },
        m('h3', 'Login'), [
          m('p', auth.error),
          m('input.input[type=text][placeholder=Username]', {
            oninput: m.withAttr('value', (value) => { this.username = value; }),
            value: this.username,
          }),
          m('input.input[placeholder=Password][type=password]', {
            oninput: m.withAttr('value', (value) => { this.password = value; }),
            value: this.password,
          }),
          m('button.button[type=submit]', 'Login'),
        ],
      ),
    ]);
  },
};
