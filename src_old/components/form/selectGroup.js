import m from 'mithril';

import inputGroup from './inputGroup';
import Dropdown from '../Dropdown';
import { i18n } from '../../models/language';

export default class SelectGroup {
  oninit() {
    this.value = [];
  }

  view(vnode) {
    let { args } = vnode.attrs;
    if (args === undefined) {
      args = {};
    }
    args.value = vnode.attrs.value;
    args.onchange = vnode.attrs.onchange;
    args.oninput = vnode.attrs.oninput;

    const options = vnode.attrs.options.map(option => {
      if (typeof option === 'object') {
        return option;
      }
      return { value: option, label: option };
    });

    switch (vnode.attrs.type) {
      case 'buttons': {
        if (args.multipleSelect) {
          return m('div', { class: vnode.attrs.classes }, [
            m(`label[for=${vnode.attrs.name}]`, i18n(vnode.attrs.name)),
            m(
              'div',
              options.map(option =>
                m(inputGroup, {
                  name: vnode.attrs.name,
                  title: i18n(option.label),
                  value: option.value,
                  onchange: e => {
                    if (e.target.checked) {
                      this.value.push(e.target.value);
                    } else {
                      this.value = this.value.filter(item => item !== e.target.value);
                    }
                    vnode.attrs.onchange({ target: { name: e.target.name, value: this.value } });
                  },
                  oninput: e => {
                    if (e.target.checked) {
                      this.value.push(e.target.value);
                    } else {
                      this.value = this.value.filter(item => item !== e.target.value);
                    }
                    vnode.attrs.oninput({ target: { name: e.target.name, value: this.value } });
                  },
                  args: { type: 'checkbox' },
                })
              )
            ),
          ]);
        }
        return m('div', { class: vnode.attrs.classes }, [
          m(
            'div',
            options.map(option =>
              m(inputGroup, {
                name: vnode.attrs.name,
                title: i18n(option.label),
                value: option.value,
                onchange: vnode.attrs.onchange,
                args: { type: 'radio' },
              })
            )
          ),
          m(`label[for=${vnode.attrs.name}]`, vnode.attrs.name),
        ]);
      }
      case 'select':
      default: {
        if (args.multipleSelect) {
          return m('div', { class: vnode.attrs.classes }, [
            m(`label[for=${vnode.attrs.name}]`, i18n(vnode.attrs.name)),
            m(Dropdown, {
              ...args,
              onchange: e => {
                const value = [];
                let opt;
                for (let i = 0; i < e.target.options.length; i += 1) {
                  opt = e.target.options[i];
                  if (opt.selected) {
                    value.push(opt);
                  }
                }
                vnode.attrs.onchange({ target: { name: e.target.name, value } });
              },
              oninput: e => {
                const value = [];
                let opt;
                for (let i = 0; i < e.target.options.length; i += 1) {
                  opt = e.target.options[i];
                  if (opt.selected) {
                    value.push(opt);
                  }
                }
                vnode.attrs.oninput({ target: { name: e.target.name, value } });
              },
              data: options,
            }),
          ]);
        }
        return m('div', { class: vnode.attrs.classes }, [
          m(`label[for=${vnode.attrs.name}]`, i18n(vnode.attrs.name)),
          m(Dropdown, {
            ...args,
            data: options,
          }),
        ]);
      }
    }
  }
}
