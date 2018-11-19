import m from 'mithril';
import { i18n } from '../models/language';

export default class LegalNotice {
  static view() {
    return m('div.legal-notice', [
      m('h1', i18n('legal-notice')),
      m('div.contact', [
        m('span.name', 'AMIV an der ETH'),
        m('span', 'CAB E37'),
        m('span', 'Universitätstrasse 6'),
        m('span', '8092 Zürich'),
        m('span', i18n('Switzerland')),
        m('a.email', { href: 'mailto:info@amiv.ethz.ch' }, 'info@amiv.ethz.ch'),
        m('a.phone', { href: 'tel:+41446324245' }, '+41 (0)44 / 632 42 45'),
      ]),
      m('h2.disclaimer', i18n('legal-notice.disclaimer')),
      m('p.disclaimer', i18n('legal-notice.disclaimer-text')),
      m('h2.copyrights', i18n('legal-notice.copyrights')),
      m('p.copyrights', i18n('legal-notice.copyrights-text')),
    ]);
  }
}
