// Polyfill DOM env for mithril
global.window = require('mithril/test-utils/browserMock.js')();

global.document = window.document;

require('reify');

const o = require('mithril/ospec/ospec');
const Storage = require('dom-storage');
const auth = require('../../src/models/auth');
const events = require('../../src/models/events');

const mockResponses = {
  POST_sessions: () => ({
    status: 201,
    responseText: JSON.stringify({
      _updated: '2018-03-17T11:08:25Z',
      _created: '2018-03-17T11:08:25Z',
      user: '59e5f715edcr41000ae5ecd4',
      token: 'iRg3Y6F4CJBOR_uZydsswMjlflq0m34IK4GCSUjaU_rI',
      _etag: '9556ba93c498f3et3467bc5e1d0a3f3bdf529e38',
      _id: '5aacf7291a89ew00014c5cba',
      _links: {
        self: {
          title: 'Session',
          href: 'sessions/5aacf7291a8j6900014c5cba',
          methods: ['GET', 'OPTIONS', 'HEAD'],
        },
      },
      _status: 'OK',
    }),
  }),
  GET_events: () => ({
    status: 200,
    responseText: JSON.stringify({
      _items: [
        {
          _id: '5aac5a561a89b900014c5c6c',
          priority: 5,
          time_advertising_end: '2018-04-16T23:46:12Z',
          time_advertising_start: '2018-02-17T23:46:12Z',
          title_de: 'Deutscher Titel',
          title_en: 'English title',
          catchphrase_de: 'Deutsche Catchphrase',
          catchphrase_en: 'English catchphrase',
          description_de: 'Deutsche Beschreibung',
          description_en: 'English description',
          _updated: '2018-03-16T23:59:18Z',
          _created: '2018-03-16T23:59:18Z',
          show_announce: false,
          show_infoscreen: false,
          show_website: true,
          allow_email_signup: false,
          _etag: '5916b38eac2848131049bd2f4201d35efd3bc9bd',
          _links: {
            self: {
              title: 'Event',
              href: 'events/5aac5a561a89b900014c5c6c',
              methods: ['GET', 'HEAD', 'OPTIONS'],
            },
          },
          signup_count: 0,
        },
      ],
      _links: {
        parent: {
          title: 'home',
          href: '/',
          methods: ['GET', 'HEAD', 'OPTIONS'],
        },
        self: {
          title: 'events',
          href: 'events',
          methods: ['GET', 'HEAD', 'OPTIONS'],
        },
      },
      _meta: {
        page: 1,
        max_results: 25,
        total: 1,
      },
    }),
  }),
  GET_events_empty: () => ({
    status: 200,
    responseText: JSON.stringify({
      _items: [],
      _links: {
        parent: {
          title: 'home',
          href: '/',
          methods: ['GET', 'HEAD', 'OPTIONS'],
        },
        self: {
          title: 'events',
          href: 'events',
          methods: ['GET', 'HEAD', 'OPTIONS'],
        },
      },
      _meta: {
        page: 1,
        max_results: 25,
        total: 0,
      },
    }),
  }),
  GET_authentication_failed: () => ({
    status: 401,
    responseText: JSON.stringify({
      _status: 'ERR',
      _error: {
        code: 401,
        message:
          "The server could not verify that you are authorized to access the URL requested.  You either supplied the wrong credentials (e.g. a bad password), or your browser doesn't understand how to supply the credentials required.",
      },
    }),
  }),
};

o.spec('events', () => {
  o.beforeEach(() => {
    global.localStorage = new Storage(null, { strict: false });
  });

  o.spec('getList', () => {
    o('no-load', () => o(events.getList().length).equals(0));
    o('load-empty', done => {
      global.window.$defineRoutes({
        'GET /events': mockResponses.GET_events_empty,
      });

      events.load().then(() => {
        o(events.getList().length).equals(0);
        done();
      });
    });
    o('load', done => {
      global.window.$defineRoutes({
        'GET /events': mockResponses.GET_events,
      });

      events.load().then(() => {
        o(events.getList().length).equals(1);
        done();
      });
    });
  });

  o.spec('selectEvent', () => {
    o('select-valid', done => {
      global.window.$defineRoutes({
        'GET /events': mockResponses.GET_events,
      });

      events.load().then(() => {
        events.selectEvent('5aac5a561a89b900014c5c6c');
        o(events.getSelectedEvent()).notEquals(undefined);
        o(events.getSelectedEvent()._id).equals('5aac5a561a89b900014c5c6c');
        done();
      });
    });
    o('select-invalid', done => {
      global.window.$defineRoutes({
        'GET /events': mockResponses.GET_events,
      });

      events.load().then(() => {
        events.selectEvent('1bac5a561a89b900014c5c6c');
        o(events.getSelectedEvent()).equals(undefined);
        done();
      });
    });
  });

  o.spec('loadSignupForSelectedEvent', () => {
    o('load-not-authenticated', done => {
      global.window.$defineRoutes({
        'POST /sessions': mockResponses.POST_sessions,
        'GET /events': mockResponses.GET_events,
        'GET /eventsignups': () => mockResponses.GET_authentication_failed,
      });

      auth.login('validuser', 'validpassword').then(() => {
        events.load().then(() => {
          events.selectEvent('5aac5a561a89b900014c5c6c');
          events.loadSignupForSelectedEvent().catch(() => {
            o(events.signupForSelectedEventHasLoaded()).equals(false);
            done();
          });
        });
      });
    });
    o('load-authenticated-empty', done => {
      global.window.$defineRoutes({
        'POST /sessions': mockResponses.POST_sessions,
        'GET /events': mockResponses.GET_events,
        'GET /eventsignups': () => mockResponses.GET_event_signups_empty,
      });

      auth.login('validuser', 'validpassword').then(() => {
        events.load().then(() => {
          events.selectEvent('5aac5a561a89b900014c5c6c');
          events.loadSignupForSelectedEvent().catch(() => {
            o(events.signupForSelectedEventHasLoaded()).equals(true);
            done();
          });
        });
      });
    });
    o('load-authenticated', done => {
      global.window.$defineRoutes({
        'POST /sessions': mockResponses.POST_sessions,
        'GET /events': mockResponses.GET_events,
        'GET /eventsignups': () => mockResponses.GET_event_signups,
      });

      auth.login('validuser', 'validpassword').then(() => {
        events.load().then(() => {
          events.selectEvent('5aac5a561a89b900014c5c6c');
          events.loadSignupForSelectedEvent().catch(() => {
            o(events.signupForSelectedEventHasLoaded()).equals(true);
            done();
          });
        });
      });
    });
  });
});
