import m from 'mithril';
import { login } from '../models/auth';
import { Button } from '../components';
import { i18n } from '../models/language';
import InputGroup from './form/inputGroup';

module.exports = {
  username: '',
  password: '',
  error: '',
  view() {
    return m('div', [
      m(
        'form',
        {
          onsubmit: e => {
            e.preventDefault();
            login(this.username, this.password)
              .then(() => {
                m.route.set('/');
              })
              .catch(err => {
                this.error = err.message;
              });
          },
        },
        m('h3', i18n('Login')),
        m('p', this.error),
        m(InputGroup, {
          name: 'username',
          title: i18n('username'),
          value: this.username,
          oninput: e => {
            this.username = e.target.value;
          },
        }),
        m(InputGroup, {
          name: 'password',
          title: i18n('password'),
          value: this.password,
          type: 'password',
          oninput: e => {
            this.password = e.target.value;
          },
        }),
        m(Button, { label: i18n('Login') })
      ),
    ]);
  },
};
