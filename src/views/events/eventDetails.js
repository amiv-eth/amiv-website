import m from 'mithril';
import marked from 'marked';
import escape from 'html-escape';
import { TextField } from 'polythene-mithril';
import { Form } from 'amiv-web-ui-components';
import { log } from '../../models/log';
import { isLoggedIn, login } from '../../models/auth';
import { Button } from '../../components';
import { i18n } from '../../models/language';

class EventSignupForm {
  oninit(vnode) {
    this.event = vnode.attrs.event;
    this.schema =
      this.event.additional_fields === undefined
        ? undefined
        : JSON.parse(this.event.additional_fields);
    this.form = new Form();
    if (this.schema && this.schema.$schema) {
      // ajv fails to verify the v4 schema of some resources
      this.schema.$schema = 'http://json-schema.org/draft-06/schema#';
      this.form.setSchema(this.schema);
    }
    this.email = '';
    this.emailSignup = null;
    if (isLoggedIn()) {
      this.event.loadSignup().then(() => {
        if (this.event.signupData) {
          this.form.data = JSON.parse(this.event.signupData.additional_fields || '{}');
        }
      });
    }
  }

  async signup() {
    try {
      await this.event.signup(super.getValue(), this.email);
      this.emailSignup = 'success';
    } catch (err) {
      log(err);
      this.emailSignup = 'fail';
    }
  }

  signoff() {
    try {
      this.event.signoff();
    } catch (err) {
      log(err);
    }
    this.form.validate();
  }

  view() {
    if (isLoggedIn()) {
      // do not render form if there is no signup data of the current user
      if (!this.event.hasSignupDataLoaded) return m('span', i18n('loading'));

      const elements = this.schema ? this.form.renderSchema() : [];
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
      if (!this.emailSignup) {
        const elements = this.schema ? this.form.renderSchema() : [];
        elements.push(this._renderEmailField());
        elements.push(this._renderSignupButton());
        return m('form', { onsubmit: () => false }, elements);
      } else if (this.emailSignup) {
        if (this.emailSignup === 'success') return m('span', i18n('events.emailsignup_success'));
        if (this.emailSignup === 'fail') return m('span', i18n('events.emailsignup_fail'));
      }
    }
    return m('div', [
      m('span', `${i18n('events.amiv_members_only')} `),
      m(Button, { label: i18n('Login'), events: { onclick: () => login(m.route.get()) } }),
    ]);
  }

  _renderSignupButton() {
    return m(Button, {
      name: 'signup',
      label: i18n('events.signup'),
      active: this.form.valid,
      events: {
        onclick: () => this.signup(),
      },
    });
  }

  _renderEmailField() {
    return m(TextField, {
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
      m('p', m.trust(marked(escape(event.getDescription())))),
      eventSignupForm,
    ]);
  }
}
