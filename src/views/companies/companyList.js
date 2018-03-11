import m from 'mithril';
import load from '../../models/companies';

export default class companyList {
  static oninit() {
    this.content = '';
    load('list').then(response => {
      this.content = response;
    });
  }

  static view() {
    return m.trust(this.content);
  }
}
