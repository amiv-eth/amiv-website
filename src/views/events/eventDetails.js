import m from 'mithril';
import marked from 'marked';
import escape from 'html-escape';
import { Form, TextInput, Spinner } from 'amiv-web-ui-components';
import { Infobox } from '../errors';
import { log } from '../../models/log';
import { isLoggedIn, login } from '../../models/auth';
import { Button } from '../../components';
import { i18n, currentLocale } from '../../models/language';
import infoIcon from '../../images/info.svg';
import errorIcon from '../../images/error.svg';
import successIcon from '../../images/checkbox-marked.svg';

export default class EventDetails {
  oninit(vnode) {
    this.signupFetchError = false;
    this.event = vnode.attrs.event;
    this.notification = null;
    this.signupBusy = false;
    this.signoffBusy = false;
    this.schema = !this.event.additional_fields
      ? undefined
      : JSON.parse(this.event.additional_fields);

    this.email = '';
    this.emailSignup = null;

    this._createForm();

    if (isLoggedIn() && !this.event.hasSignupDataLoaded) {
      this._loadSignupData();
    }
  }

  _loadSignupData() {
    this.event
      .loadSignupData()
      .then(() => {
        this.signupFetchError = false;
        if (this.event.signupData) {
          this._createForm();
        }
      })
      .catch(() => {
        this.signupFetchError = true;
      });
  }

  _createForm() {
    if (this.event.signupData && this.event.signupData.additional_fields) {
      this.form = new Form(
        null,
        false,
        4,
        JSON.parse(this.event.signupData.additional_fields || '{}')
      );
    } else {
      this.form = new Form();
    }

    if (this.schema && this.schema.$schema) {
      // ajv fails to verify the v4 schema of some resources
      this.schema.$schema = 'http://json-schema.org/draft-06/schema#';
      this.form.setSchema(this.schema);
    }
  }

  async signup() {
    try {
      this.signupBusy = true;
      await this.event.signup(this.form.getData(), this.email);
      if (this.event.signupData.accepted) {
        this.notification = { type: 'success', label: i18n('events.signup_success') };
      } else {
        this.notification = { type: 'success', label: i18n('events.signup_waiting_list') };
      }
    } catch (err) {
      log(err);
      this.notification = { type: 'fail', label: i18n('events.signup_fail') };
    }
    this.signupBusy = false;
  }

  async signoff() {
    try {
      this.signoffBusy = true;
      await this.event.signoff();
      this._createForm();
      this.notification = { type: 'success', label: i18n('events.signoff_success') };
    } catch (err) {
      log(err);
      this.notification = { type: 'fail', label: i18n('events.signoff_fail') };
    }
    this.signoffBusy = false;
  }

  view() {
    let eventSignupForm;
    const now = new Date();
    const registerStart = new Date(this.event.time_register_start);
    const registerEnd = new Date(this.event.time_register_end);

    if (registerStart <= now) {
      if (registerEnd >= now) {
        if (isLoggedIn()) {
          if (!this.event.hasSignupDataLoaded) {
            if (this.signupFetchError) {
              eventSignupForm = m('div', [
                m('p', i18n('errors.title')),
                m(
                  'a.colored',
                  {
                    href: '#',
                    onclick: this._loadSignupData,
                  },
                  `${i18n('errors.retry')}?`
                ),
              ]);
            } else {
              eventSignupForm = m(Spinner, { show: true });
            }
          } else {
            const signupFormOptions = {
              signoffButton: this.event.signupData != null,
              hasSignupData: this.event.signupData != null,
            };
            eventSignupForm = this._renderSignupForm(signupFormOptions);
          }
        } else if (this.event.allow_email_signup) {
          const signupFormOptions = {
            emailField: true,
          };
          eventSignupForm = this._renderSignupForm(signupFormOptions);
        } else {
          eventSignupForm = m('div', [
            m('span', `${i18n('events.amiv_members_only')} `),
            m(Button, { label: i18n('Login'), events: { onclick: () => login(m.route.get()) } }),
          ]);
        }
        this._renderParticipationNotice();
      } else {
        eventSignupForm = m('div', m('p', i18n('events.registration_over')));
        this._renderParticipationNotice();
      }
    } else {
      eventSignupForm = m('div', [
        m('p', i18n('events.registration_starts_at')),
        m(
          'p.colored',
          registerStart.toLocaleString(currentLocale(), {
            timeZone: 'UTC',
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })
        ),
      ]);
    }

    let notification;

    if (this.notification) {
      let icon;
      if (this.notification.type === 'success') {
        icon = successIcon;
      } else if (this.notification.type === 'fail') {
        icon = errorIcon;
      } else {
        icon = infoIcon;
      }
      notification = m(Infobox, { icon, label: this.notification.label });
    }

    return m('div.event-details', [
      m('p', m.trust(marked(escape(this.event.getDescription())))),
      m('div.separator'),
      m('div.form', [notification, eventSignupForm]),
    ]);
  }

  _renderSignupForm({ hasSignupData = false, emailField = false, signoffButton = false }) {
    const elements = this.schema ? this.form.renderSchema() : [];

    if (emailField) {
      elements.push(this._renderEmailField());
    }

    if (!hasSignupData) {
      elements.push(this._renderSignupButton(i18n('events.signup')));
    } else if (this.schema) {
      elements.push(this._renderSignupButton(i18n('events.update_signup')));
    }

    if (signoffButton) {
      elements.push(this._renderSignoffButton());
    }

    return m('form', { onsubmit: () => false }, elements);
  }

  _renderSignupButton(label) {
    // TODO: evaluate email field validity!
    // Waiting for MR to be accepted in web-ui-components repository.
    return m(Button, {
      name: 'signup',
      label,
      active: this.form.valid && !this.signupBusy,
      events: {
        onclick: () => this.signup(),
      },
    });
  }

  _renderEmailField() {
    return m(TextInput, {
      name: 'email',
      label: i18n('email'),
      validateOnInput: true,
      floatingLabel: true,
      type: 'email',
      onChange: (name, value) => {
        this.email = value;
      },
      value: this.email,
    });
  }

  _renderSignoffButton() {
    return m(Button, {
      name: 'signoff',
      label: i18n('events.delete_signup'),
      active: !this.signoffBusy,
      events: {
        onclick: () => this.signoff(),
      },
    });
  }

  _renderParticipationNotice() {
    if (
      isLoggedIn() &&
      this.event.hasSignupDataLoaded &&
      this.event.signupData &&
      !this.notification
    ) {
      this.notification = {
        type: 'info',
        label: this.event.signupData.accepted
          ? i18n('events.signed_up_accepted')
          : i18n('events.signed_up_waiting_list'),
      };
    }
  }
}
