import m from 'mithril';
import { i18n } from '../../models/language';
import Button from '../../components/Button';

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
        m.redraw();
      })
      .catch(() => {
        this.busy = false;
      });
  }

  view() {
    const { sessionCount } = this.userController;
    const buttonArgs = { events: { onclick: () => this.submit() } };

    if (sessionCount === 0) {
      return m('div.sessions', i18n('profile.sessions.loading'));
    }

    if (this.busy) {
      buttonArgs.disabled = true;
    }

    if (sessionCount === 1) {
      return m('div.sessions', i18n('profile.sessions.none'));
    }

    return m(
      'div.sessions',
      m(Button, {
        ...buttonArgs,
        label: i18n('profile.sessions.terminateOthers', { count: sessionCount - 1 }),
      })
    );
  }
}
