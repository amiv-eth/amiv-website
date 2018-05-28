import m from 'mithril';
import load from '../../models/companies';

export default class companyDetail {
  oninit(vnode) {
    this.content = '';
    load(vnode.attrs.companyId).then(response => {
      this.content = response;
    });
  }

  view() {
    return m.trust(this.content);
  }
}
