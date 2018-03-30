// Polyfill DOM env for mithril
global.window = require('mithril/test-utils/browserMock.js')();

global.document = window.document;

require('reify');

const o = require('mithril/ospec/ospec');
const Storage = require('dom-storage');
const auth = require('../../src/models/auth');

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
  POST_authentication_failed: () => ({
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

o.spec('auth', () => {
  o.beforeEach(() => {
    global.localStorage = new Storage(null, { strict: false });
  });

  o.spec('login', () => {
    o('login-success', done => {
      global.window.$defineRoutes({
        'POST /sessions': mockResponses.POST_sessions,
      });

      auth.login('validuser', 'validpassword').then(() => {
        o(auth.isLoggedIn()).equals(true);
        auth
          .logout()
          .then(() => {
            o(auth.isLoggedIn()).equals(false);
            done();
          })
          .then(() => {
            o(true).equals(false);
          });
      });
    });
    o('login-failure', done => {
      global.window.$defineRoutes({
        'POST /sessions': mockResponses.POST_authentication_failed,
      });

      auth.login('invaliduser', 'invalidpassword').catch(() => {
        o(auth.isLoggedIn()).equals(false);
        done();
      });
    });
  });
});
