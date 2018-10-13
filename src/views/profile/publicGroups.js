import m from 'mithril';
import { i18n } from '../../models/language';
import { Button, TextField } from '../../components';

// shows public groups and allows to enroll for them.
export default class PublicGroups {
  oninit(vnode) {
    this.groupMembershipsController = vnode.attrs.groupMembershipsController;
    this.publicGroupsController = vnode.attrs.publicGroupsController;
    this.busy = [];
    this.confirm = [];
    this.query = '';
  }

  renderGroup(group) {
    if (this.groupMembershipsController.some(element => element.group._id === group._id)) {
      return m('');
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
    return m('div.group-entry', [
      m('div', group.name),
      m('div.group-button', m(Button, { ...buttonArgs, label: i18n('enroll') })),
    ]);
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
            if (
              this.publicGroupsController.setQuery({
                where: { name: { $regex: `^(?i).*${this.query}.*` } },
              })
            ) {
              this.publicGroupsController.loadPageData(1);
            }
          },
        },
      }),
    ]);

    return m('div#groups', [
      filterForm,
      m(
        'div#group-list',
        this.publicGroupsController.map(page => page.map(group => this.renderGroup(group)))
      ),
    ]);
  }
}
