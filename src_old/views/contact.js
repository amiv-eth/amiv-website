import m from 'mithril';
import { i18n } from '../models/language';

module.exports = {
  view() {
    return m('div', [
      m('h3', i18n('contact')),
      m('pre', 'AMIV an der ETH\nCAB E37\nUniversitätsstrasse 6\n8092 Zürich'),
      m('pre', '+41 44 632 42 45\ninfo@amiv.ethz.ch'),
      m('pre', i18n('contact.location')),
      m('pre', i18n('contact.description')),
    ]);
  },
};
