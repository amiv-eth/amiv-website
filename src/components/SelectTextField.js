import m from 'mithril';
// eslint-disable-next-line import/no-extraneous-dependencies
import { List } from 'polythene-mithril-list';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ListTile } from 'polythene-mithril-list-tile';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Card } from 'polythene-mithril-card';
import debounce from 'amiv-web-ui-components/src/debounce';
import Button from './Button';
import TextField from './TextField';
import { i18n } from '../models/language';
import './SelectTextField.less';

export default class SelectTextField {
  constructor({ attrs: { options, value = null, onChange = () => {} } }) {
    this.addNew = false;
    this.value = '';
    this.selected = value;
    this.options = options;
    this.filteredOptions = options;
    this.onChange = onChange;
    this.valid = true;
    this.showList = false;
    this.debouncedSearch = debounce(search => {
      this.value = search;
      if (search) {
        const regex = RegExp(`.*(${search}).*`, 'gi');
        this.filteredOptions = this.options.filter(item => regex.test(item));
      } else {
        this.filteredOptions = this.options;
      }
      this.notify();
    }, 100);
  }

  validate() {
    this.valid = this.value === '' || this.addNew || this.selected;
  }

  notify() {
    this.validate();

    let value = '';
    if (this.selected) {
      value = this.selected;
    } else if (this.addNew) {
      // eslint-disable-next-line prefer-destructuring
      value = this.value;
    }
    this.onChange({ value, isValid: this.valid });
    m.redraw();
  }

  onupdate({ dom, attrs: { options } }) {
    if (this.options.length !== options.length) {
      this.options = options;
      this.debouncedSearch(this.value);
    }
    // Turn off browser's autofill functionality
    dom.querySelector('input').setAttribute('autocomplete', 'off');
  }

  view({ attrs: { name, label, help, ...attrs } }) {
    return m('div.pe-select-textfield', [
      m('div.textfield', [
        m(TextField, {
          ...attrs,
          name,
          label,
          help,
          error: help,
          floatingLabel: true,
          value: this.selected || this.value,
          valid: this.valid,
          readonly: this.selected !== null,
          onChange: ({ focus, value }) => {
            if (focus) {
              this.showList = true;
            } else if (!focus) {
              // don't close the list immidiately, as 'out of focus' could
              // also mean that the user is clicking on a list item
              setTimeout(() => {
                this.showList = false;
                m.redraw();
              }, 500);
            }

            if (value !== this.value) {
              // if we always update the search value, this would also happen
              // immidiately in the moment where we click on the listitem.
              // Then, the list get's updated before the click is registered.
              // So, we make sure this state change is due to value change and
              // not due to focus change.
              this.value = value;
              if (this.addNew) {
                this.notify();
              } else {
                this.debouncedSearch(value);
              }
            }
          },
        }),
        this.selected
          ? m(Button, {
              className: 'flat-button',
              label: i18n('button.clear'),
              events: {
                onclick: () => {
                  this.value = '';
                  this.selected = null;
                  this.debouncedSearch('');
                },
              },
            })
          : this.addNew &&
            m(Button, {
              className: 'flat-button',
              label: i18n('studydocs.createNewEntryLabel'),
              disabled: true,
            }),
      ]),
      this.showList && !this.addNew && !this.selected
        ? m(Card, {
            className: 'suggestions',
            content: m(
              'div',
              m(List, {
                style: { maxHeight: '400px', 'background-color': 'white' },
                tiles: [
                  ...this.filteredOptions.map(option =>
                    m(ListTile, {
                      title: option,
                      hoverable: true,
                      compactFront: true,
                      events: {
                        onclick: () => {
                          this.selected = option;
                          this.showList = false;
                          this.notify();
                        },
                      },
                    })
                  ),
                  m(ListTile, {
                    title: i18n('studydocs.createNewEntry'),
                    hoverable: true,
                    compactFront: true,
                    events: {
                      onclick: () => {
                        this.addNew = true;
                        this.showList = false;
                        this.notify();
                      },
                    },
                  }),
                ],
              })
            ),
          })
        : '',
    ]);
  }
}
