import m from 'mithril';
import { log } from '../../models/log';

export default class InputGroup {
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
    args.getSuggestions = vnode.attrs.getSuggestions;

    if (['radio', 'checkbox'].includes(args.type)) {
      return m('div', { class: groupClasses }, [
        m(`input[name=${vnode.attrs.name}][id=${vnode.attrs.name}]`, args),
        m(`label[for=${vnode.attrs.name}]`, vnode.attrs.title),
        errorField,
      ]);
    }
    args.list = `${args.id}-datalist`;
    log(args);
    if (args.getSuggestions) {
      log('test');
      args.oninput_original = args.oninput;
      args.oninput = (e) => {
        log(`get suggestions for '${e.target.value}'`);
        args.getSuggestions(e.target.value, (result) => {
          log('callback called!');
          this.suggestions = result;
        });
        if (args.oninput_original) {
          args.oninput_original(e);
        }
      };
    }

    return m('div', { class: groupClasses }, [
      m(`label[for=${vnode.attrs.name}]`, vnode.attrs.title),
      m(`input[name=${vnode.attrs.name}][id=${vnode.attrs.name}]`, args),
      m('datalist', { id: args.list }, this.suggestions.map(item => m('option', item))),
      errorField,
    ]);
  }
}
