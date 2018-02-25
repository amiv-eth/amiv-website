import m from 'mithril';
import * as EmailValidator from 'email-validator';
import * as events from '../models/events';
import { log } from '../models/log';
import { isLoggedIn } from '../models/auth';
import inputGroup from './form/inputGroup';
import button from './form/button';
import JSONSchemaForm from './form/jsonSchemaForm';

class EventSignupForm extends JSONSchemaForm {
  oninit(vnode) {
    super.oninit(vnode);
    this.emailErrors = [];
    this.emailValid = false;
    if (isLoggedIn()) {
      events.checkCurrentSignup();
    }
  }

  submit() {
    if (isLoggedIn()) {
      events.signupCurrent(super.getValue());
    } else {
      events.signupCurrent(super.getValue(), this.email);
    }
  }

  view() {
    // do not render anything if there is no data yet
    if (typeof events.getCurrent() === 'undefined') return m();

    if (isLoggedIn()) {
      // do not render form if there is no signup data of the current user
      if (!events.currentSignupHasLoaded()) return m('span', 'Loading...');
      if (typeof events.getCurrentSignup() === 'undefined') {
        const elements = this.renderFormElements();
        elements.push(m(button, {
          active: super.isValid(),
          args: {
            onclick: () => this.submit(),
          },
          text: 'Signup',
        }));
        return m('form', elements);
      }
      return m('div', 'You have already signed up for this event.');
    } else if (events.getCurrent().allow_email_signup) {
      const elements = this.renderFormElements();
      elements.push(m(inputGroup, {
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
      }));
      elements.push(m(button, {
        active: this.emailValid && super.isValid(),
        args: {
          onclick: () => this.submit(),
        },
        text: 'Signup',
      }));
      return m('form', elements);
    }
    return m('div', 'This event is for AMIV members only.');
  }
}

export default class EventDetails {
  static oninit(vnode) {
    events.loadCurrent(vnode.attrs.eventId);
  }

  static view() {
    if (typeof events.getCurrent() === 'undefined') {
      return m();
    }
    log(events.getCurrent());
    let eventSignupForm;
    const now = new Date();
    const registerStart = new Date(events.getCurrent().time_register_start);
    const registerEnd = new Date(events.getCurrent().time_register_end);
    log(`Now: ${now}`);
    log(`Start: ${registerStart}`);
    log(`End: ${registerEnd}`);
    if (registerStart <= now) {
      if (registerEnd >= now) {
        eventSignupForm = m(EventSignupForm, {
          schema: events.getCurrent().additional_fields === undefined ?
            undefined : JSON.parse(events.getCurrent().additional_fields),
        });
      } else {
        eventSignupForm = m('div', 'The registration period is over.');
      }
    } else {
      eventSignupForm = m('div', `The registration starts at ${registerStart}`);
    }
    return m('div', [
      m('h1', events.getCurrent().title_de),
      m('span', events.getCurrent().time_start),
      m('span', events.getCurrent().signup_count),
      m('span', events.getCurrent().spots),
      m('p', events.getCurrent().description_de),
      eventSignupForm,
    ]);
  }
}
