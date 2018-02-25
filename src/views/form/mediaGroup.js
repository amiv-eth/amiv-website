import m from 'mithril';

export default class MediaGroup {
  constructor(vnode) {
    this.suggestions = [];
    // Link the error-getting function from the binding
    this.getErrors = () => [];
    if (vnode.attrs.getErrors) {
      this.getErrors = vnode.attrs.getErrors;
    }
  }

  view(vnode) {
    // set display-settings accoridng to error-state
    let errorField = null;
    let groupClasses = vnode.attrs.classes ? vnode.attrs.classes : '';
    const errors = this.getErrors();
    if (errors.length > 0) {
      errorField = m('span', `Error: ${errors.join(', ')}`);
      groupClasses += ' has-error';
    }

    let { args } = vnode.attrs;
    if (args === undefined) {
      args = {};
    }
    args.value = vnode.attrs.value;
    args.onchange = vnode.attrs.onchange;
    args.oninput = vnode.attrs.oninput;
    args.type = 'file';

    return m('div', { class: groupClasses }, [
      m(`label[for=${vnode.attrs.name}]`, vnode.attrs.title),
      m(`input[name=${vnode.attrs.name}][id=${vnode.attrs.name}]`, args),
      errorField,
    ]);
  }
}
