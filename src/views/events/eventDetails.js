import m from 'mithril';
import { Icon } from 'polythene-mithril';
import marked from 'marked';
import escape from 'html-escape';
import Form from 'amiv-web-ui-components/src/form';
import { TextInput } from 'amiv-web-ui-components/src/inputFields';
import Spinner from 'amiv-web-ui-components/src/spinner';
import { Infobox } from '../errors';
import { log } from '../../models/log';
import { isLoggedIn, login } from '../../models/auth';
import Button from '../../components/Button';
import ActionBar from '../../components/ActionBar';
import { i18n, currentLanguage, formatDate } from '../../models/language';
import icons from '../../images/icons';
import { copyToClipboard } from '../../utils';

export default class EventDetails {
  oninit(vnode) {
    this.signupFetchError = false;
    this.event = vnode.attrs.event;
    this.notification = null;
    this.emailValid = true;
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
      })
      .finally(() => {
        m.redraw();
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
        this.notification = { type: 'success', label: i18n('events.signup.success') };
      } else {
        this.notification = { type: 'success', label: i18n('events.signup.waitingList') };
      }
    } catch (err) {
      log(err);
      if (err.message.includes('blacklist')) {
        this.notification = { type: 'fail', label: i18n('events.signup.blacklisted') };
      } else {
        this.notification = { type: 'fail', label: i18n('events.signup.failed') };
      }
    }
    this.signupBusy = false;
    m.redraw();
  }

  async signoff() {
    try {
      this.signoffBusy = true;
      await this.event.signoff();
      this._createForm();
      this.notification = { type: 'success', label: i18n('events.signoff.success') };
    } catch (err) {
      log(err);
      this.notification = { type: 'fail', label: i18n('events.signoff.failed') };
    }
    this.signoffBusy = false;
    m.redraw();
  }

  view() {
    let noSignupForm = false;
    let eventSignupForm;
    let eventSignupButtons;
    const now = new Date();
    const registerStart = new Date(this.event.time_register_start);
    const registerEnd = new Date(this.event.time_register_end);

    if (this.event.time_register_start === null) {
      eventSignupButtons = m(Button, {
        className: 'flat-button',
        disabled: true,
        label: i18n('events.registration.none'),
      });
      noSignupForm = true;
    } else if (registerStart <= now) {
      if (registerEnd >= now) {
        if (isLoggedIn()) {
          if (!this.event.hasSignupDataLoaded) {
            if (this.signupFetchError) {
              this.notification = {
                type: 'fail',
                label: m('span', [
                  i18n('error.title'),
                  m(
                    'a.colored',
                    {
                      href: '#',
                      onclick: this._loadSignupData,
                    },
                    ` ${i18n('retry')}`
                  ),
                ]),
              };
            } else {
              eventSignupButtons = m('div.spinner', m(Spinner, { size: '32px', show: true }));
              noSignupForm = true;
            }
          } else {
            const signupFormOptions = {
              signoffButton: this.event.signupData != null,
              hasSignupData: this.event.signupData != null,
              canChangeSignup: this.schema != null,
            };
            if (this.schema) {
              eventSignupForm = this._renderSignupForm(signupFormOptions);
            } else {
              noSignupForm = true;
            }
            eventSignupButtons = this._renderSignupButtons(signupFormOptions);
          }
        } else if (this.event.allow_email_signup) {
          const signupFormOptions = {
            emailField: true,
          };
          eventSignupForm = this._renderSignupForm(signupFormOptions);
          eventSignupButtons = this._renderSignupButtons(signupFormOptions);
        } else {
          noSignupForm = true;
          eventSignupButtons = [
            m(Button, {
              label: i18n('login'),
              className: 'blue-flat-button',
              events: { onclick: () => login(m.route.get()) },
            }),
            m(Button, {
              label: i18n('events.restrictions.membersOnly'),
              disabled: true,
              className: 'blue-flat-button',
            }),
          ];
        }
      } else {
        eventSignupButtons = m(Button, {
          className: 'flat-button',
          disabled: true,
          label: i18n('events.registration.over'),
        });
        noSignupForm = true;
      }
    } else {
      eventSignupForm = m('div', [
        m('p', i18n('events.registration.startsAt')),
        m('p.colored', formatDate(registerStart)),
      ]);
    }

    this._renderParticipationNotice();

    let notification;

    if (this.notification) {
      let iconSource;
      if (this.notification.type === 'success') {
        iconSource = icons.checkboxMarked;
      } else if (this.notification.type === 'fail') {
        iconSource = icons.error;
      } else {
        iconSource = icons.info;
      }
      notification = m(Infobox, {
        icon: m(Icon, { svg: { content: m.trust(iconSource) } }),
        label: this.notification.label,
      });
    }

    const urlId = `event-${this.event._id}-url`;

    return m('div.event-details', { className: noSignupForm ? 'no-signup' : null }, [
      notification && m('div.notification', notification),
      m('p', m.trust(marked(escape(this.event.getDescription())))),
      !noSignupForm && m('div.separator'),
      !noSignupForm &&
        m(
          'div.form',
          eventSignupForm ||
            m('div.message', [m('span', `${i18n('events.signup.noAdditionalInfoRequired')} `)])
        ),
      m(ActionBar, {
        className: 'event-actions',
        left: eventSignupButtons,
        right: [
          m('textarea', {
            id: urlId,
            style: { opacity: 0, width: 0, height: 0, padding: 0 },
          }),
          m(Button, {
            className: 'flat-button',
            label: i18n('copyDirectLink'),
            events: {
              onclick: () => {
                const url = `${window.location.origin}/${currentLanguage()}/events/${
                  this.event._id
                }`;
                const inputElement = document.getElementById(urlId);

                copyToClipboard(url, inputElement);
              },
            },
          }),
        ],
      }),
    ]);
  }

  _renderSignupForm({ emailField = false }) {
    const elements = this.schema ? this.form.renderSchema() : [];

    if (emailField) {
      elements.push(this._renderEmailField());
    }

    return elements.length > 0 ? m('form', { onsubmit: () => false }, elements) : null;
  }

  _renderSignupButtons({ canChangeSignup = false, hasSignupData = false, signoffButton = false }) {
    return [
      (!hasSignupData || canChangeSignup) &&
        this._renderSignupButton(
          i18n(`events.signup.${hasSignupData ? 'updateAction' : 'action'}`)
        ),
      signoffButton && this._renderSignoffButton(),
    ];
  }

  _renderSignupButton(label) {
    return m(Button, {
      name: 'signup',
      className: 'blue-flat-button',
      border: true,
      label,
      active: this.emailValid && this.form.valid && !this.signupBusy,
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
      onChange: ({ value, invalid }) => {
        this.email = value;
        this.emailValid = !invalid;
      },
      value: this.email,
    });
  }

  _renderSignoffButton() {
    return m(Button, {
      name: 'signoff',
      className: 'blue-flat-button',
      label: i18n('events.signoff.action'),
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
          ? i18n('events.signup.accepted')
          : i18n('events.signup.waitingList'),
      };
    }
  }
}
