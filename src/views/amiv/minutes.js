import m from 'mithril';

export default class AMIV {
  oninit() {
    this.content = '';
    this._load();
  }

  static view() {
    return m('p', 'The documents will be available in a minute ;D');
  }
}
