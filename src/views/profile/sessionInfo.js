import m from 'mithril';
import { i18n } from '../../models/language';
import { Button } from '../../components';

// provides a button to terminate all other sessions.
export default class SessionInfo {
  oninit(vnode) {
    this.userController = vnode.attrs.userController;
  }
  submit() {
    this.busy = true;
    this.userController
      .clearOtherSessions()
      .then(() => {
        this.busy = false;
      })
      .catch(() => {
        this.busy = false;
      });
  }

  view() {
    const sessionCount = this.userController.getSessionCount();
    const buttonArgs = { events: { onclick: () => this.submit() } };

    if (sessionCount === 0) {
      return m('div#sessions', i18n('profile.loading_sessions'));
    }

    if (this.busy) {
      buttonArgs.disabled = true;
    }

    if (sessionCount === 1) {
      return m('div#sessions', i18n('profile.no_active_sessions'));
    }

    return m(
      'div#sessions',
      m(Button, {
        ...buttonArgs,
        label: i18n('profile.active_sessions', { count: sessionCount }),
      })
    );
  }
}
