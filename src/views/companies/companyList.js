import m from 'mithril';
import load from '../../models/companies';

export default class companyList {
  oninit() {
    this.content = '';
    load('list').then(response => {
      this.content = response;
    });
  }

  view() {
    return m.trust(this.content);
  }
}
