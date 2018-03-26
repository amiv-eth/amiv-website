import m from 'mithril';
import { logout } from '../models/auth';

module.exports = {
  oninit() {
    logout();
    m.route.set('/');
  },
  view() {
    return m('');
  },
};
