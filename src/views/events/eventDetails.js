import m from 'mithril';
import marked from 'marked';
import * as EmailValidator from 'email-validator';
import { log } from '../../models/log';
import { isLoggedIn } from '../../models/auth';
import inputGroup from '../form/inputGroup';
import { Button } from '../../components';
import JSONSchemaForm from '../form/jsonSchemaForm';
import { i18n } from '../../models/language';

class EventSignupForm extends JSONSchemaForm {
  oninit(vnode) {
    this.event = vnode.attrs.event;
    super.oninit(
      Object.assign({}, vnode, {
        attrs: {
          schema:
            this.event.additional_fields === undefined
              ? undefined
              : JSON.parse(this.event.additional_fields),
        },
      })
    );
    this.email = '';
    this.emailErrors = [];
    this.emailValid = false;
    if (isLoggedIn()) {
      this.event.loadSignup().then(() => {
        if (this.event.signupData) {
          this.data = JSON.parse(this.event.signupData.additional_fields || '{}');
        }
      });
    }
  }

  async signup() {
    try {
      await this.event.signup(super.getValue(), this.email);
    } catch (err) {
      log(err);
    }
  }

  signoff() {
    try {
      this.event.signoff();
    } catch (err) {
      log(err);
    }
    this.validate();
  }

  view() {
    if (isLoggedIn()) {
      // do not render form if there is no signup data of the current user
      if (!this.event.hasSignupDataLoaded) return m('span', i18n('loading'));

      const elements = this.renderFormElements();
      if (!this.event.signupData || (this.event.signupData && this.event.additional_fields)) {
        elements.push(this._renderSignupButton());
      }
      if (this.event.signupData) {
        elements.unshift(
          m(
            'div',
            `${i18n('events.signed_up')} ${
              this.event.additional_fields ? i18n('events.update_data') : ''
            }`
          )
        );
        elements.push(this._renderSignoffButton());
      }
      return m('form', { onsubmit: () => false }, elements);
    } else if (this.event.allow_email_signup) {
      const elements = this.renderFormElements();
      elements.push(this._renderEmailField());
      elements.push(this._renderSignupButton());
      return m('form', elements);
    }
    return m('div', i18n('events.amiv_members_only'));
  }

  isValid() {
    if (!isLoggedIn()) {
      return super.isValid() && this.emailValid;
    }
    return super.isValid();
  }

  _renderEmailField() {
    return m(inputGroup, {
      name: 'email',
      title: i18n('email'),
      args: {
        type: 'text',
      },
      oninput: e => {
        // bind changed data
        this.email = e.target.value;

        // validate if email address has the right structure
        if (EmailValidator.validate(this.email)) {
          this.emailValid = true;
          this.emailErrors = [];
        } else {
          this.emailValid = false;
          this.emailErrors = [i18n('email_invalid')];
        }
      },
      getErrors: () => this.emailErrors,
      value: this.email,
    });
  }

  _renderSignupButton() {
    return m(Button, {
      name: 'signup',
      label: i18n('events.signup'),
      active: super.isValid(),
      events: {
        onclick: () => this.signup(),
      },
    });
  }

  _renderSignoffButton() {
    return m(Button, {
      name: 'signoff',
      label: i18n('events.delete_signup'),
      active: true,
      events: {
        onclick: () => this.signoff(),
      },
    });
  }
}

export default class EventDetails {
  oninit(vnode) {
    this.controller = vnode.attrs.controller;
  }

  view() {
    const event = this.controller.selectedEvent;
    if (!event) {
      return m('h1', i18n('events.not_found'));
    }

    let eventSignupForm;
    const now = new Date();
    const registerStart = new Date(event.time_register_start);
    const registerEnd = new Date(event.time_register_end);
    if (registerStart <= now) {
      if (registerEnd >= now) {
        eventSignupForm = m(EventSignupForm, { event });
      } else {
        let participantNotice = '';
        if (event.hasSignupDataLoaded && event.signupData) {
          participantNotice = m('span', i18n('events.signed_up'));
        }
        eventSignupForm = m('div', [i18n('events.registration_over'), participantNotice]);
      }
    } else {
      eventSignupForm = m('div', i18n('events.registration_starts_at', { time: registerStart }));
    }
    return m('div.event-details', [
      m('h1', event.getTitle()),
      m('div', event.time_start),
      m(
        'div',
        event.spots === undefined
          ? i18n('events.no_registration')
          : i18n('events.%n_spots_available', event.spots - event.signup_count)
      ),
      m('p', m.trust(marked(event.getDescription()))),
      eventSignupForm,
    ]);
  }
}
