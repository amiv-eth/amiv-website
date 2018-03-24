// src/index.js
import m from 'mithril';
import { loadLanguage, currentLanguage, changeLanguage, isLanguageValid } from './models/language';
import { verbose } from './models/config';
import { Error404, Error401 } from './views/errors';
import { isLoggedIn } from './models/auth';
import studydocList from './views/studydocs/studydocList';
import studydocNew from './views/studydocs/studydocNew';
import eventList from './views/events/eventList';
import eventDetails from './views/events/eventDetails';
import profile from './views/profile';
import layout from './views/layout';
import amivLayout from './views/amiv/amivLayout';
import frontpage from './views/frontpage';
import login from './views/login';
import logout from './views/logout';
import statuten from './views/amiv/statuten';
import contact from './views/contact';
import aufenthaltsraum from './views/amiv/aufenthaltsraum';
import board from './views/amiv/board';
import jobOfferList from './views/jobs/jobofferList';
import jobOfferDetails from './views/jobs/jobofferDetails';
import companyList from './views/companies/companyList';
import companyDetail from './views/companies/companyDetail';
import './views/styles/base.less';

loadLanguage();

if (verbose !== true) {
  // set to pathname strategy (Please note that the production server needs to support this)
  m.route.prefix('');
}

function onmatch(args, requestedPath, component) {
  if (isLanguageValid(args.language)) {
    changeLanguage(args.language);
    return component;
  }
  return {
    view() {
      return m(layout, m(Error404));
    },
  };
}
function onmatchAuthenticated(args, requestedPath, component) {
  if (!isLoggedIn()) {
    // m.route.set(`/${currentLanguage()}/login`);
    return {
      view() {
        return m(layout, m(Error401));
      },
    };
  }
  return onmatch(args, requestedPath, component);
}

m.route(document.body, '/', {
  '/': {
    onmatch() {
      m.route.set(`/${currentLanguage()}/`);
    },
  },
  '/:language': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view() {
          return m(layout, m(amivLayout, m(frontpage)));
        },
      });
    },
  },
  '/:language/amiv/statuten': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view() {
          return m(layout, m(amivLayout, m(statuten)));
        },
      });
    },
  },
  '/:language/contact': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view() {
          return m(layout, m(contact));
        },
      });
    },
  },
  '/:language/amiv/aufenthaltsraum': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view() {
          return m(layout, m(amivLayout, m(aufenthaltsraum)));
        },
      });
    },
  },
  '/:language/login': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view() {
          return m(layout, m(login));
        },
      });
    },
  },
  '/:language/logout': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view() {
          return m(layout, m(logout));
        },
      });
    },
  },
  '/:language/amiv/board': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view() {
          return m(layout, m(amivLayout, m(board)));
        },
      });
    },
  },
  '/:language/studydocuments': {
    onmatch(args, requestedPath) {
      return onmatchAuthenticated(args, requestedPath, {
        view() {
          return m(layout, m(studydocList));
        },
      });
    },
  },
  '/:language/studydocuments/new': {
    onmatch(args, requestedPath) {
      return onmatchAuthenticated(args, requestedPath, {
        view() {
          return m(layout, m(studydocNew));
        },
      });
    },
  },
  '/:language/events': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view() {
          return m(layout, m(eventList));
        },
      });
    },
  },
  '/:language/events/:eventId': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view(vnode) {
          return m(layout, m(eventDetails, vnode.attrs));
        },
      });
    },
  },
  '/:language/jobs': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view() {
          return m(layout, m(jobOfferList));
        },
      });
    },
  },
  '/:language/jobs/:jobId': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view(vnode) {
          return m(layout, m(jobOfferDetails, vnode.attrs));
        },
      });
    },
  },
  '/:language/profile': {
    onmatch(args, requestedPath) {
      return onmatchAuthenticated(args, requestedPath, {
        view(vnode) {
          return m(layout, m(profile, vnode.attrs));
        },
      });
    },
  },
  '/:language/companies': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view() {
          return m(layout, m(companyList));
        },
      });
    },
  },
  '/:language/companies/:companyId': {
    onmatch(args, requestedPath) {
      return onmatch(args, requestedPath, {
        view(vnode) {
          return m(layout, m(companyDetail, vnode.attrs));
        },
      });
    },
  },
  '/:404...': {
    view() {
      return m(layout, m(Error404));
    },
  },
});
