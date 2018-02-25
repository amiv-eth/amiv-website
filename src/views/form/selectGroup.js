import m from 'mithril';

import inputGroup from './inputGroup';

export default class SelectGroup {
  oninit() {
    this.value = [];
  }

  view(vnode) {
    switch (vnode.attrs.args.type) {
      case 'buttons': {
        if (vnode.attrs.args.multipleSelect) {
          return m('div', { class: vnode.attrs.classes }, [
            m(`label[for=${vnode.attrs.name}]`, vnode.attrs.title),
            m('div', vnode.attrs.args.options.map(option =>
              m(inputGroup, {
                name: vnode.attrs.name,
                title: option,
                value: option,
                onchange: (e) => {
                  if (e.target.checked) {
                    this.value.push(e.target.value);
                  } else {
                    this.value = this.value.filter(item => item !== e.target.value);
                  }
                  vnode.attrs.onchange({ target: { name: e.target.name, value: this.value } });
                },
                oninput: (e) => {
                  if (e.target.checked) {
                    this.value.push(e.target.value);
                  } else {
                    this.value = this.value.filter(item => item !== e.target.value);
                  }
                  vnode.attrs.oninput({ target: { name: e.target.name, value: this.value } });
                },
                args: { type: 'checkbox' },
              }))),
          ]);
        }
        return m('div', { class: vnode.attrs.classes }, [
          m('div', vnode.attrs.options.map(option =>
            m(inputGroup, {
              name: vnode.attrs.name,
              title: option,
              onchange: vnode.attrs.onchange,
              args: { type: 'radio' },
            }))),
          m(`label[for=${vnode.attrs.name}]`, vnode.attrs.title),
        ]);
      }
      case 'select':
      default: {
        if (vnode.attrs.args.multipleSelect) {
          return m('div', { class: vnode.attrs.classes }, [
            m(`label[for=${vnode.attrs.name}]`, vnode.attrs.title),
            m(
              `select[name=${vnode.attrs.name}][id=${vnode.attrs.name}]`,
              {
                onchange: (e) => {
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
                oninput: (e) => {
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
                multiple: true,
              },
              vnode.attrs.options.map(option => m('option', option)),
            ),
          ]);
        }
        return m('div', { class: vnode.attrs.classes }, [
          m(`label[for=${vnode.attrs.name}]`, vnode.attrs.title),
          m(
            `select[name=${vnode.attrs.name}][id=${vnode.attrs.name}]`,
            {
              value: vnode.attrs.value,
              onchange: vnode.attrs.onchange,
              oninput: vnode.attrs.oninput,
              multiple: false,
            },
            vnode.attrs.args.options.map(option => m('option', option)),
          ),
        ]);
      }
    }
  }
}
