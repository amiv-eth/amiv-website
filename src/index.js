// src/index.js
import m from 'mithril';
import Raven from 'raven-js';
import { sentryUrl, sentryEnvironment } from 'config';
import { loadLanguage, currentLanguage, changeLanguage, isLanguageValid } from './models/language';
import { Error404 } from './views/errors';
import { login, isLoggedIn, checkLogin } from './models/auth';
import studydocList from './views/studydocs/studydocList';
import studydocNew from './views/studydocs/studydocNew';
import eventList from './views/events/eventList';
import profile from './views/profile';
import layout from './views/layout';
import frontpage from './views/frontpage';
import logout from './views/logout';
import statutes from './views/amiv/statutes';
import contact from './views/contact';
import about from './views/amiv/about';
import board from './views/amiv/board';
import minutes from './views/amiv/minutes';
import commissions from './views/amiv/commissions';
import jobOfferList from './views/jobs/jobofferList';
import jobOfferDetails from './views/jobs/jobofferDetails';
import companyList from './views/companies/companyList';
import companyDetail from './views/companies/companyDetail';
import legalNotice from './views/legalNotice';
import './views/styles/base.less';

Raven.config(sentryUrl, {
  environment: sentryEnvironment,
}).install();

Raven.context(() => {
  checkLogin();
  loadLanguage();

  // set to pathname strategy (Please note that the production server needs to support this)
  m.route.prefix('');

  // routes which require authentication
  const routesAuth = [
    {
      url: '/:language/studydocuments',
      view: () => m(studydocList),
    },
    {
      url: '/:language/studydocuments/new',
      view: () => m(studydocNew),
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
      url: '/:language/statutes',
      view: () => m(statutes),
    },
    {
      url: '/:language/board',
      view: () => m(board),
    },
    {
      url: '/:language/commissions',
      view: () => m(commissions),
    },
    {
      url: '/:language/about',
      view: () => m(about),
    },
    {
      url: '/:language/minutes',
      view: () => m(minutes),
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
      url: '/:language/jobs/:jobId',
      view: vnode => m(jobOfferDetails, vnode.attrs),
    },
    {
      url: '/:language/companies',
      view: () => m(companyList),
    },
    {
      url: '/:language/companies/:companyId',
      view: vnode => m(companyDetail, vnode.attrs),
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
        async onmatch(args, requestedPath) {
          await checkLogin();

          if (!isLoggedIn()) {
            login(requestedPath);
            return {
              view() {
                return m(layout, m(''));
              },
            };
          }

          return onmatch(args, r);
        },
      };
    });

    m.route(document.body, '/', result);
  }

  generateRoutes();
});
