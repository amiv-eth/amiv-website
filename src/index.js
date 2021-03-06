// src/index.js
import m from 'mithril';
import Raven from 'raven-js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Button } from 'polythene-mithril-button';
import { sentryUrl, sentryEnvironment } from 'config';
import Spinner from 'amiv-web-ui-components/src/spinner';
import { loadLanguage, currentLanguage, isLanguageValid, i18n } from './models/language';
import { Error404, Error401 } from './views/errors';
import { isLoggedIn, checkLogin } from './models/auth';
import layout from './views/layout';
import frontpage from './views/frontpage';
import about from './views/amiv/about';
import logout from './views/logout';
import legalNotice from './views/legalNotice';
import './styles/base.less';

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

Raven.config(sentryUrl, {
  environment: sentryEnvironment,
}).install();

Raven.context(() => {
  checkLogin();
  loadLanguage();

  // set to pathname strategy (Please note that the server needs to support this)
  m.route.prefix = '';

  // routes which require authentication
  // NOTE: You can specify a reason why this restriction is in place. This can also be a
  //       translation key! It will be printed on the error page. A default text will be shown otherwise.
  const routesAuth = [
    {
      url: '/:language/studydocuments',
      reason: 'studydocs.accessDenied',
      viewAsync: './views/studydocs/studydocList',
    },
    {
      url: '/:language/studydocuments/new',
      reason: 'studydocs.accessDenied',
      viewAsync: './views/studydocs/studydocForm',
    },
    {
      url: '/:language/studydocuments/:documentId/edit',
      reason: 'studydocs.accessDenied',
      viewAsync: './views/studydocs/studydocForm',
    },
    {
      url: '/:language/studydocuments/:documentId',
      reason: 'studydocs.accessDenied',
      viewAsync: './views/studydocs/studydocList',
    },
    {
      url: '/:language/profile',
      viewAsync: './views/profile',
    },
  ];

  // routes without restrictions
  const routes = [
    {
      url: '/:language',
      view: () => m(frontpage),
    },
    {
      url: '/:language/board',
      viewAsync: './views/amiv/board',
    },
    {
      url: '/:language/board/history',
      viewAsync: './views/amiv/oldBoards',
    },
    {
      url: '/:language/teams',
      viewAsync: './views/amiv/teams',
    },
    {
      url: '/:language/about',
      view: () => m(about),
    },
    {
      url: '/:language/logout',
      view: () => m(logout),
    },
    {
      url: '/:language/events',
      viewAsync: './views/events/eventList',
    },
    {
      url: '/:language/events/:eventId',
      viewAsync: './views/events/eventList',
    },
    {
      url: '/:language/jobs',
      viewAsync: './views/jobs/jobofferList',
    },
    {
      url: '/:language/jobs/:offerId',
      viewAsync: './views/jobs/jobofferList',
    },
    {
      url: '/:language/legal-notice',
      view: vnode => m(legalNotice, vnode.attrs),
    },
  ];

  function onmatch(args, route) {
    if (isLanguageValid(args.language)) {
      if (route.view) {
        return { view: vnode => m(layout, route.view(vnode)) };
      }

      return {
        oninit() {
          this.error = false;
          import(/* webpackInclude: /\.js$/ */ `${route.viewAsync}`)
            .then(loadedModule => {
              this.loadedModule = loadedModule;
              m.redraw.sync();
            })
            .catch(() => {
              this.error = true;
              m.redraw.sync();
            });
        },
        view(vnode) {
          if (this.loadedModule) {
            return m(layout, m(this.loadedModule.default, vnode.attrs));
          }
          if (this.error) {
            return m(
              layout,
              m('.error', [
                m('p', i18n('error.loadingPage')),
                m(Button, {
                  className: 'blue-button',
                  name: 'retry',
                  label: i18n('retry'),
                  events: {
                    onclick: () => window.location.reload(),
                  },
                }),
              ])
            );
          }
          return m(layout, m('.loading', m(Spinner, { show: true, size: '96px' })));
        },
      };
    }
    return {
      view() {
        return m(layout, m(Error404));
      },
    };
  }

  function generateRoutes() {
    const result = {
      '/': {
        onmatch() {
          m.route.set(`/${currentLanguage()}/`);
        },
      },
      '/anmeldung': {
        onmatch() {
          m.route.set(`/${currentLanguage()}/events`);
        },
      },
      '/events': {
        onmatch() {
          m.route.set(`/${currentLanguage()}/events`);
        },
      },
    };

    routes.forEach(r => {
      result[r.url] = {
        onmatch: args => onmatch(args, r),
      };
    });

    routesAuth.forEach(r => {
      result[r.url] = {
        async onmatch(args) {
          await checkLogin();

          if (!isLoggedIn()) {
            return onmatch(args, { view: () => m(Error401, { reason: r.reason }) });
          }

          return onmatch(args, r);
        },
      };
    });

    result['/:language/:404...'] = {
      view: () => m(layout, m(Error404)),
    };

    m.route.setOrig = m.route.set;

    // Allow change of route without scrolling to the top of the page.
    m.route.setNoScroll = (path, data, options) => {
      m.route.previousPath = m.route.get();
      m.route.setOrig(path, data, options);
    };

    // Scroll to the top of the page when changing route (default behavior).
    m.route.set = (path, data, options) => {
      m.route.setNoScroll(path, data, options);
      // Delay scroll to top due to rendering latency.
      setTimeout(() => window.scrollTo(0, 0), 10);
    };

    m.route(document.body, '/', result);
  }

  generateRoutes();
});
