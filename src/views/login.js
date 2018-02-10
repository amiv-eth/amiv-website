import m from 'mithril';
import { login } from '../models/auth';

module.exports = {
  username: '',
  password: '',
  error: '',
  view() {
    return m('div', [
      m(
        'form', {
          onsubmit: (e) => {
            e.preventDefault();
            login(this.username, this.password)
              .then(() => { m.route.set('/'); })
              .catch((err) => { this.error = err.message; });
          },
        },
        m('h3', 'Login'),
        m('p', this.error),
        m('input.input[type=text][placeholder=Username]', {
          oninput: m.withAttr('value', (value) => { this.username = value; }),
          value: this.username,
        }),
        m('input.input[placeholder=Password][type=password]', {
          oninput: m.withAttr('value', (value) => { this.password = value; }),
          value: this.password,
        }),
        m('button.button[type=submit]', 'Login'),
      ),
    ]);
  },
};
