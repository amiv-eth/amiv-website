import m from 'mithril';
import { logout } from '../models/auth';
import { currentLanguage } from '../models/language';

module.exports = {
  oninit() {
    logout();
    m.route.set(`/${currentLanguage()}/`);
  },
  view() {
    return m('');
  },
};
