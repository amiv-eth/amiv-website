import m from 'mithril';
import User from '../../models/user';
import { i18n } from '../../models/language';
import { Button } from '../../components';

/**
 * AnnounceSubscriptionForm class
 *
 * Provides a button to (un-)subscribe for the announce newsletter.
 */
export default class AnnounceSubscriptionForm {
  submit() {
    this.busy = true;
    User.update({ send_newsletter: !User.get().send_newsletter })
      .then(() => {
        this.busy = false;
      })
      .catch(() => {
        this.busy = false;
      });
  }

  view() {
    const buttonArgs = { events: { onclick: () => this.submit() } };

    if (this.busy) {
      buttonArgs.disabled = true;
    }

    return m(Button, {
      ...buttonArgs,
      label: User.get().send_newsletter
        ? i18n('profile.newsletter_unsubscribe')
        : i18n('profile.newsletter_subscribe'),
    });
  }
}
