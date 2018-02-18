import m from 'mithril';
import * as EmailValidator from 'email-validator';
import * as events from '../models/events';
import { log } from '../models/log';
import { isLoggedIn } from '../models/auth';
import { inputGroup, submitButton } from './formFields';
import JSONSchemaForm from './jsonSchemaForm';

class EventSignupForm extends JSONSchemaForm {
  oninit(vnode) {
    super.oninit(vnode);
    this.email = '';
    this.emailErrors = [];
    this.emailValid = false;
    if (isLoggedIn()) {
      events.loadSignupForSelectedEvent();
    }
  }

  signup() {
    events.signupForSelectedEvent(super.getValue(), this.email)
      .then(() => log('Successfully signed up for the event!'))
      .catch(() => log('Could not sign up of the event!'));
  }

  view() {
    // do not render anything if there is no data yet
    if (typeof events.getSelectedEvent() === 'undefined') return m();

    if (isLoggedIn()) {
      // do not render form if there is no signup data of the current user
      if (!events.signupForSelectedEventHasLoaded()) return m('span', 'Loading...');
      if (typeof events.getSignupForSelectedEvent() === 'undefined') {
        const elements = this.renderFormElements();
        elements.push(this._renderSignupButton());
        return m('form', elements);
      }
      return m('div', 'You have already signed up for this event.');
    } else if (events.getSelectedEvent().allow_email_signup) {
      const elements = this.renderFormElements();
      elements.push(this._renderEmailField());
      elements.push(this._renderSignupButton());
      return m('form', elements);
    }
    return m('div', 'This event is for AMIV members only.');
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
      title: 'Email',
      args: {
        type: 'text',
      },
      oninput: (e) => {
        // bind changed data
        this.email = e.target.value;

        // validate if email address has the right structure
        if (EmailValidator.validate(this.email)) {
          this.emailValid = true;
          this.emailErrors = [];
        } else {
          this.emailValid = false;
          this.emailErrors = ['Not a valid email address'];
        }
      },
      getErrors: () => this.emailErrors,
      value: this.email,
    });
  }

  _renderSignupButton() {
    return m(submitButton, {
      active: super.isValid(),
      args: {
        onclick: () => this.signup(),
      },
      text: 'Signup',
    });
  }
}

export default class EventDetails {
  static oninit(vnode) {
    events.selectEvent(vnode.attrs.eventId);
  }

  static view() {
    if (typeof events.getSelectedEvent() === 'undefined') {
      return m();
    }
    let eventSignupForm;
    const now = new Date();
    const registerStart = new Date(events.getSelectedEvent().time_register_start);
    const registerEnd = new Date(events.getSelectedEvent().time_register_end);
    if (registerStart <= now) {
      if (registerEnd >= now) {
        eventSignupForm = m(EventSignupForm, {
          schema: events.getSelectedEvent().additional_fields === undefined ?
            undefined : JSON.parse(events.getSelectedEvent().additional_fields),
        });
      } else {
        eventSignupForm = m('div', 'The registration period is over.');
      }
    } else {
      eventSignupForm = m('div', `The registration starts at ${registerStart}`);
    }
    return m('div', [
      m('h1', events.getSelectedEvent().title_de),
      m('span', events.getSelectedEvent().time_start),
      m('span', events.getSelectedEvent().signup_count),
      m('span', events.getSelectedEvent().spots),
      m('p', events.getSelectedEvent().description_de),
      eventSignupForm,
    ]);
  }
}
