import m from 'mithril';
import { i18n } from '../../models/language';
import { Button } from '../../components';

/**
 * AnnounceSubscriptionForm class
 *
 * Provides a button to (un-)subscribe for the announce newsletter.
 */
export default class AnnounceSubscriptionForm {
  oninit(vnode) {
    this.userController = vnode.attrs.userController;
  }

  submit() {
    const user = this.userController.get();
    this.busy = true;
    this.userController
      .update({ send_newsletter: !user.send_newsletter })
      .then(() => {
        this.busy = false;
      })
      .catch(() => {
        this.busy = false;
      });
  }

  view() {
    const buttonArgs = { events: { onclick: () => this.submit() } };
    const user = this.userController.get();

    if (this.busy) {
      buttonArgs.disabled = true;
    }

    return m(
      'div#announce-subscription',
      m(Button, {
        ...buttonArgs,
        label: user.send_newsletter
          ? i18n('profile.newsletter_unsubscribe')
          : i18n('profile.newsletter_subscribe'),
      })
    );
  }
}
