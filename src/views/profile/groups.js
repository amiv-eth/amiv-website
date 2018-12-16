import m from 'mithril';
import { Search, Shadow, IconButton } from 'polythene-mithril';
import icons from 'amiv-web-ui-components/src/icons';
import { i18n } from '../../models/language';
import { Button } from '../../components';

class SearchableList {
  constructor() {
    this.busy = [];
    this.confirm = [];
    this.query = '';
    this.searchLabel = 'search';
  }

  // eslint-disable-next-line class-methods-use-this
  notify() {
    // Should be implemented in child class if the filtering is done on the server.
  }

  view() {
    const clearButton = m(IconButton, {
      icon: { svg: { content: m.trust(icons.clear) } },
      ink: false,
      events: {
        onclick: () => {
          this.query = '';
          this.notify();
        },
      },
    });

    return [
      m(Search, {
        textfield: {
          label: this.searchLabel,
          value: this.query,
          onChange: state => {
            this.query = state.value;
            this.notify();
          },
        },
        after: m(Shadow),
        fullWidth: true,
        buttons: {
          dirty: {
            after: clearButton,
          },
          focus_dirty: {
            after: clearButton,
          },
        },
      }),
      m('div.list', this._renderItems()),
    ];
  }
}

// shows public groups and allows to enroll for them.
export class PublicGroups extends SearchableList {
  constructor(vnode) {
    super(vnode);
    this.groupMembershipsController = vnode.attrs.groupMembershipsController;
    this.publicGroupsController = vnode.attrs.publicGroupsController;
    this.searchLabel = i18n('profile.groups.searchPublic');
  }

  notify() {
    if (
      this.publicGroupsController.setQuery({
        where: { name: { $regex: `^(?i).*${this.query}.*` } },
      })
    ) {
      this.publicGroupsController.loadPageData(1);
    }
  }

  _renderItems() {
    let itemsCount = 0;
    const items = this.publicGroupsController.map(page =>
      page.map(group => {
        const item = this._renderGroup(group);
        if (item) itemsCount += 1;
        return item;
      })
    );
    if (itemsCount === 0) {
      return m('div.no-items', i18n('profile.groups.noneFound'));
    }
    return items;
  }

  _renderGroup(group) {
    if (this.groupMembershipsController.some(element => element.group._id === group._id)) {
      return undefined;
    }

    const buttonArgs = {
      events: {
        onclick: () => {
          this.busy[group._id] = true;
          this.groupMembershipsController
            .enroll(group._id)
            .then(() => {
              this.busy[group._id] = false;
              this.groupMembershipsController.loadAll();
            })
            .catch(() => {
              this.busy[group._id] = false;
            });
        },
      },
    };

    if (this.busy[group._id]) buttonArgs.disabled = true;

    this.itemsCount += 1;

    return m('div.group-item', [
      m('div.name', group.name),
      m('div.enroll', m(Button, { ...buttonArgs, label: i18n('button.enroll') })),
    ]);
  }
}

export class GroupMemberships extends SearchableList {
  constructor(vnode) {
    super(vnode);
    this.groupMembershipsController = vnode.attrs.groupMembershipsController;
    this.searchLabel = i18n('profile.groups.searchEnrolled');
  }

  _renderItems() {
    let itemsCount = 0;
    const items = this.groupMembershipsController.map(page =>
      page.map(membership => {
        const item = this._renderMembership(membership);
        if (item) itemsCount += 1;
        return item;
      })
    );
    if (itemsCount === 0) {
      return m('div.no-items', i18n('profile.groups.noneFound'));
    }
    return items;
  }

  _renderMembership(membership) {
    const buttonArgs = {};
    let buttons;

    if (this.query.length > 0 && !new RegExp(this.query, 'gi').test(membership.group.name))
      return undefined;
    if (this.busy[membership.group._id]) buttonArgs.disabled = true;

    if (this.confirm[membership.group._id]) {
      buttons = [
        m('div.confirm', [
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
        m('div.cancel', [
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
        'div.withdraw',
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

    return m('div.group-item', [
      m('div.name', membership.group.name),
      membership.expiry && !this.confirm[membership.group._id]
        ? m('div.expiry', `(${i18n('profile.groups.expires', { date: membership.expiry })})`)
        : undefined,
      buttons,
    ]);
  }
}
