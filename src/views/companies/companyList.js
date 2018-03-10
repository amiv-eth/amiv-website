import m from 'mithril';
import loadMarkdown from '../../models/companies';

export default class companyList {
  static oninit() {
    this.content = '';
    loadMarkdown('list').then((response) => {
      this.content = response;
    });
  }

  static view() {
    return m.trust(this.content);
  }
}
