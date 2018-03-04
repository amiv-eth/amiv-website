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
    this.email = '';
    this.emailErrors = [];
    this.emailValid = false;
    if (isLoggedIn()) {
      events.loadSignupForSelectedEvent()
        .then(() => {
          if (typeof events.getSignupForSelectedEvent() !== 'undefined') {
            this.data = JSON.parse(events.getSignupForSelectedEvent().additional_fields) || {};
          }
        });
    }
  }

  signup() {
    events.signupForSelectedEvent(super.getValue(), this.email)
      .then(() => log('Successfully signed up for the event!'))
      .catch(() => log('Could not sign up of the event!'));
  }

  signoff() {
    events.signoffForSelectedEvent();
    this.validate();
  }

  view() {
    // do not render anything if there is no data yet
    if (typeof events.getSelectedEvent() === 'undefined') return m('');

    if (isLoggedIn()) {
      // do not render form if there is no signup data of the current user
      if (!events.signupForSelectedEventHasLoaded()) return m('span', 'Loading...');

      const elements = this.renderFormElements();
      elements.push(this._renderSignupButton());
      if (typeof events.getSignupForSelectedEvent() !== 'undefined') {
        elements.unshift(m('div', 'You have already signed up. Update your data below.'));
        elements.push(this._renderSignoffButton());
      }
      return m('form', elements);
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
    return m(button, {
      name: 'signup',
      title: 'Signup',
      active: super.isValid(),
      args: {
        onclick: () => this.signup(),
      },
    });
  }

  _renderSignoffButton() {
    return m(button, {
      name: 'signoff',
      title: 'Delete signup',
      active: true,
      args: {
        onclick: () => this.signoff(),
      },
    });
  }
}

export default class EventDetails {
  static oninit(vnode) {
    events.selectEvent(vnode.attrs.eventId);
  }

  static view() {
    if (typeof events.getSelectedEvent() === 'undefined') {
      return m('');
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
        let participantNotice = '';
        if (events.getSignupForSelectedEvent() !== 'undefined') {
          participantNotice = m('You signed up for this event.');
        }
        eventSignupForm = m('div', ['The registration period is over.', participantNotice]);
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
