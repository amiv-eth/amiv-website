import m from 'mithril';
import { i18n } from '../../models/language';
import { Button, TextField } from '../../components';

// shows group memberships and allows to withdraw their memberships.
export default class GroupMemberships {
  oninit(vnode) {
    this.groupMembershipsController = vnode.attrs.groupMembershipsController;
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
        m('div.group-button', [
          m(Button, {
            ...buttonArgs,
            label: i18n('button.confirm'),
            events: {
              onclick: () => {
                this.busy[membership.group._id] = true;
                this.groupMembershipsController
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
        ]),
        m('div.group-button', [
          m(Button, {
            ...buttonArgs,
            label: i18n('button.cancel'),
            className: 'flat-button',
            events: {
              onclick: () => {
                this.confirm[membership.group._id] = false;
                this.busy[membership.group._id] = false;
              },
            },
          }),
        ]),
      ];
    } else {
      buttons = m(
        'div.group-button',
        m(Button, {
          ...buttonArgs,
          label: i18n('button.withdraw'),
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
        : m('div.group-expiry', `(${i18n('profile.groups.expires', { date: membership.expiry })})`),
      buttons,
    ]);
  }

  view() {
    // Searchbar for groups
    const filterForm = m('div#group-search', [
      m(TextField, {
        name: 'group_search',
        label: i18n('profile.groups.search'),
        valid: this.valid,
        events: {
          oninput: e => {
            this.query = e.target.value;
          },
        },
      }),
    ]);

    return m('div#groupmemberships', [
      filterForm,
      m(
        'div#group-list',
        this.groupMembershipsController.map(page =>
          page.map(membership => this.renderMembership(membership))
        )
      ),
    ]);
  }
}
