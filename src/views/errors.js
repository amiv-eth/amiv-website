const m = require('mithril');

export class Error401 {
  static view() {
    return m('div', 'This page is only accessible for authenticated users. Please log in.');
  }
}

export class Error404 {
  static view() {
    return m('div', 'This page does not exist.');
  }
}
