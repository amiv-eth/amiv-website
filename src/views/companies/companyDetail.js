import m from 'mithril';
import loadMarkdown from '../../models/companies';

export default class companyDetail {
  static oninit(vnode) {
    this.content = '';
    loadMarkdown(vnode.attrs.companyId).then((response) => {
      this.content = response;
    });
  }

  static onbeforeupdate(vnode) {
    // load markdown whenever component is reloaded
    loadMarkdown(vnode.attrs.companyId).then((response) => {
      this.content = response;
    });
  }

  static view() {
    return m.trust(this.content);
  }
}
