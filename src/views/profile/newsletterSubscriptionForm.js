import m from 'mithril';
import { i18n } from '../../models/language';
import Button from '../../components/Button';

/**
 * NewsletterSubscriptionForm class
 *
 * Provides a button to (un-)subscribe for the announce newsletter.
 */
export default class NewsletterSubscriptionForm {
  oninit(vnode) {
    this.userController = vnode.attrs.userController;
  }

  submit() {
    const { user } = this.userController;
    this.busy = true;
    // Toggle newsletter subscription
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
    const { user } = this.userController;

    if (this.busy) {
      buttonArgs.disabled = true;
    }

    return m(
      'div.announce',
      m(Button, {
        ...buttonArgs,
        label: user.send_newsletter
          ? i18n('profile.announce.unsubscribe')
          : i18n('profile.announce.subscribe'),
      })
    );
  }
}
