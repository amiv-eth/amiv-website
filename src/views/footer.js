import m from 'mithril';

export default class Footer {
  static view() {
    return m('footer', m('section.blue', m('div', m('p', '© 1893 - 2018 AMIV an der ETH'))));
  }
}
