import m from 'mithril';
import * as groups from '../../models/groups';
import { i18n } from '../../models/language';
import { Button, TextField } from '../../components';

// shows group memberships and allows to withdraw and enroll for selected groups.

export default class GroupMemberships {
  oninit() {
    groups.load({ allow_self_enrollment: true });
    groups.loadMemberships();
    this.busy = [];
    this.confirm = [];
    this.query = '';
  }

  renderMembership(membership) {
    const buttonArgs = {};
    let buttons;

    if (this.query.length > 0 && !new RegExp(this.query, 'gi').test(membership.group.name))
      return m('');
    if (this.busy[membership.group._id]) buttonArgs.disabled = true;

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
        m('div', ' '),
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
      buttons = m(
        'div.group-button',
        m(Button, {
          ...buttonArgs,
          label: i18n('withdraw'),
          events: {
            onclick: () => {
              this.confirm[membership.group._id] = true;
            },
          },
        })
      );
    }

    return m('div.group-entry', [
      m('div.group-name', membership.group.name),
      membership.expiry === undefined
        ? undefined
        : m('div.group-expiry', `(${i18n('profile.expire_on', { date: membership.expiry })})`),
      buttons,
    ]);
  }

  renderGroupList(group) {
    if (groups.getMemberships().some(element => element.group._id === group._id)) return m('');
    if (this.query.length > 0 && !new RegExp(this.query, 'gi').test(group.name)) return m('');

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

    if (this.busy[group._id]) buttonArgs.disabled = true;
    return m('div', [m('div', group.name), m(Button, { ...buttonArgs, label: i18n('enroll') })]);
  }

  view() {
    // Searchbar for groups
    const filterForm = m('div#group-search', [
      m(TextField, {
        name: 'group_search',
        label: i18n('profile.search_groups'),
        floatingLabel: true,
        valid: this.valid,
        events: {
          oninput: e => {
            this.query = e.target.value;
            if (this.query.length > 0) {
              this.isValid = true;
            }
          },
        },
      }),
    ]);

    return m('div#groups', [
      filterForm,
      m(
        'div#group-memberships',
        groups.getMemberships().map(membership => this.renderMembership(membership))
      ),
      m('div#group-list', groups.getList().map(group => this.renderGroupList(group))),
    ]);
  }
}
