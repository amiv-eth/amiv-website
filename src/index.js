// src/index.js
import m from 'mithril';
import Raven from 'raven-js';
import { sentryUrl, sentryEnvironment } from 'config';
import { loadLanguage, currentLanguage, changeLanguage, isLanguageValid } from './models/language';
import { Error404, Error401 } from './views/errors';
import { isLoggedIn, checkLogin } from './models/auth';
import studydocList from './views/studydocs/studydocList';
import studydocNew from './views/studydocs/studydocNew';
import eventList from './views/events/eventList';
import profile from './views/profile';
import layout from './views/layout';
import frontpage from './views/frontpage';
import logout from './views/logout';
import contact from './views/contact';
import about from './views/amiv/about';
import board from './views/amiv/board';
import teams from './views/amiv/teams';
import jobOfferList from './views/jobs/jobofferList';
import legalNotice from './views/legalNotice';
import './styles/base.less';

Raven.config(sentryUrl, {
  environment: sentryEnvironment,
}).install();

Raven.context(() => {
  checkLogin();
  loadLanguage();

  // set to pathname strategy (Please note that the server needs to support this)
  m.route.prefix('');

  // routes which require authentication
  // NOTE: You can specify a reason why this restriction is in place. This can also be a
  //       translation key! It will be printed on the error page. A default text will be shown otherwise.
  const routesAuth = [
    {
      url: '/:language/studydocuments',
      reason: 'studydocs.access_denied',
      view: () => m(studydocList),
    },
    {
      url: '/:language/studydocuments/new',
      reason: 'studydocs.access_denied',
      view: () => m(studydocNew),
    },
    {
      url: '/:language/studydocuments/:documentId',
      reason: 'studydocs.access_denied',
      view: vnode => m(studydocList, vnode.attrs),
    },
    {
      url: '/:language/profile',
      view: vnode => m(profile, vnode.attrs),
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
      view: () => m(board),
    },
    {
      url: '/:language/teams',
      view: () => m(teams),
    },
    {
      url: '/:language/about',
      view: () => m(about),
    },
    {
      url: '/:language/contact',
      view: () => m(contact),
    },
    {
      url: '/:language/logout',
      view: () => m(logout),
    },
    {
      url: '/:language/events',
      view: () => m(eventList),
    },
    {
      url: '/:language/events/:eventId',
      view: vnode => m(eventList, vnode.attrs),
    },
    {
      url: '/:language/jobs',
      view: () => m(jobOfferList),
    },
    {
      url: '/:language/jobs/:offerId',
      view: vnode => m(jobOfferList, vnode.attrs),
    },
    {
      url: '/:language/legal-notice',
      view: vnode => m(legalNotice, vnode.attrs),
    },
  ];

  function onmatch(args, route) {
    if (isLanguageValid(args.language)) {
      changeLanguage(args.language);
      return { view: vnode => m(layout, route.view(vnode)) };
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
    m.route.set = (path, data, options) => {
      m.route.setOrig(path, data, options);
      window.scrollTo(0, 0);
    };

    m.route.linkOrig = m.route.link;
    m.route.link = vnode => {
      m.route.linkOrig(vnode);
      window.scrollTo(0, 0);
    };

    m.route(document.body, '/', result);
  }

  generateRoutes();
});
