const m = require('mithril');
const Auth = require('../models/auth');

module.exports = {
  username: '',
  password: '',
  view() {
    return m('div', [
      m(
        'form', {
          onsubmit: (e) => {
            e.preventDefault();
            Auth.login(this.username, this.password);
          },
        },
        m('h3', 'Login'), [
          m('p', Auth.error),
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
