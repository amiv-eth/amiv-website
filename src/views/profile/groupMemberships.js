import m from 'mithril';
import * as groups from '../../models/groups';
import { i18n } from '../../models/language';
import { Button, InputGroupForm } from '../../components';

// shows group memberships and allows to withdraw and enroll for selected groups.
export default class GroupMemberships {
  oninit() {
    groups.load({ allow_self_enrollment: true });
    groups.loadMemberships();
    this.busy = [];
    this.confirm = [];
    this.query = '';
  }

  view() {
    // Searchbar for groups
    const filterForm = m('div', [
      m(InputGroupForm, {
        name: 'group_search',
        title: i18n('profile.search_groups'),
        oninput: e => {
          this.query = e.target.value;
          if (this.query.length > 0) {
            this.isValid = true;
          }
        },
      }),
    ]);

    return m('div', [
      filterForm,
      m(
        'div',
        groups.getMemberships().map(membership => {
          const buttonArgs = {};
          let buttons;

          if (this.query.length > 0 && !new RegExp(this.query, 'gi').test(membership.group.name)) {
            return m('');
          }

          if (this.busy[membership.group._id]) {
            buttonArgs.disabled = true;
          }

          if (this.confirm[membership.group._id]) {
            buttons = [
              m(Button, {
                ...buttonArgs,
                label: i18n('cancel'),
                className: 'flat-button',
                events: {
                  onclick: () => {
                    this.confirm[membership.group._id] = false;
                    this.busy[membership.group._id] = false;
                  },
                },
              }),
              m('span', ' '),
              m(Button, {
                ...buttonArgs,
                label: i18n('confirm'),
                events: {
                  onclick: () => {
                    this.busy[membership.group._id] = true;
                    groups
                      .withdraw(membership._id, membership._etag)
                      .then(() => {
                        this.busy[membership.group._id] = false;
                        this.confirm[membership.group._id] = false;
                      })
                      .catch(() => {
                        this.busy[membership.group._id] = false;
                        this.confirm[membership.group._id] = false;
                      });
                  },
                },
              }),
            ];
          } else {
            buttons = m(Button, {
              ...buttonArgs,
              label: i18n('withdraw'),
              events: {
                onclick: () => {
                  this.confirm[membership.group._id] = true;
                },
              },
            });
          }

          return m('div', [
            m('span', membership.group.name),
            membership.expiry === undefined
              ? undefined
              : m('span', `(${i18n('profile.expire_on', { date: membership.expiry })})`),
            buttons,
          ]);
        })
      ),
      m(
        'div',
        groups.getList().map(group => {
          if (groups.getMemberships().some(element => element.group._id === group._id)) {
            return m('');
          }

          if (this.query.length > 0 && !new RegExp(this.query, 'gi').test(group.name)) {
            return m('');
          }

          const buttonArgs = {
            events: {
              onclick: () => {
                this.busy[group._id] = true;
                groups
                  .enroll(group._id)
                  .then(() => {
                    this.busy[group._id] = false;
                  })
                  .catch(() => {
                    this.busy[group._id] = false;
                  });
              },
            },
          };

          if (this.busy[group._id]) {
            buttonArgs.disabled = true;
          }
          return m('div', [
            m('span', group.name),
            m(Button, { ...buttonArgs, label: i18n('enroll') }),
          ]);
        })
      ),
    ]);
  }
}
