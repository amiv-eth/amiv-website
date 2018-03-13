import m from 'mithril';
import load from '../../models/companies';

export default class companyDetail {
  static oninit(vnode) {
    this.content = '';
    load(vnode.attrs.companyId).then((response) => {
      this.content = response;
    });
  }

  static onbeforeupdate(vnode) {
    // load markdown whenever component is reloaded
    load(vnode.attrs.companyId).then((response) => {
      this.content = response;
    });
  }

  static view() {
    return m.trust(this.content);
  }
}
