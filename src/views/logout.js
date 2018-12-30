import m from 'mithril';
import { logout } from '../models/auth';
import { currentLanguage } from '../models/language';

export default class Logout {
  static oninit() {
    logout();
    m.route.set(`/${currentLanguage()}/`);
  }

  static view() {
    return m('');
  }
}
