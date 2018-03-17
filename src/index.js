// src/index.js
import m from 'mithril';
import { getLang } from './models/language'
import studydocList from './views/studydocs/studydocList';
import studydocNew from './views/studydocs/studydocNew';
import eventList from './views/events/eventList';
import eventDetails from './views/events/eventDetails';
import profile from './views/profile';
import layout from './views/layout';
import amivLayout from './views/amiv/amivLayout';
import frontpage from './views/frontpage';
import login from './views/login';
import statuten from './views/amiv/statuten';
import contact from './views/contact';
import aufenthaltsraum from './views/amiv/aufenthaltsraum';
import board from './views/amiv/board';
import jobOfferList from './views/jobs/jobofferList';
import jobOfferDetails from './views/jobs/jobofferDetails';
import companyList from './views/companies/companyList';
import companyDetail from './views/companies/companyDetail';

getLang();

m.route(document.body, '/', {
  '/': {
    render() {
      return m(layout, m(amivLayout, m(frontpage)));
    },
  },
  '/amiv/statuten': {
    render() {
      return m(layout, m(amivLayout, m(statuten)));
    },
  },
  '/contact': {
    render() {
      return m(layout, m(contact));
    },
  },
  '/amiv/aufenthaltsraum': {
    render() {
      return m(layout, m(amivLayout, m(aufenthaltsraum)));
    },
  },
  '/login': {
    render() {
      return m(layout, m(login));
    },
  },
  '/amiv/board': {
    render() {
      return m(layout, m(amivLayout, m(board)));
    },
  },
  '/studydocuments': {
    render() {
      return m(layout, m(studydocList));
    },
  },
  '/studydocuments/new': {
    render() {
      return m(layout, m(studydocNew));
    },
  },
  '/events': {
    render() {
      return m(layout, m(eventList));
    },
  },
  '/events/:eventId': {
    render(vnode) {
      return m(layout, m(eventDetails, vnode.attrs));
    },
  },
  '/jobs': {
    render() {
      return m(layout, m(jobOfferList));
    },
  },
  '/jobs/:jobId': {
    render(vnode) {
      return m(layout, m(jobOfferDetails, vnode.attrs));
    },
  },
  '/profile': {
    render(vnode) {
      return m(layout, m(profile, vnode.attrs));
    },
  },
  '/companies': {
    render() {
      return m(layout, m(companyList));
    },
  },
  '/companies/:companyId': {
    render(vnode) {
      return m(layout, m(companyDetail, vnode.attrs));
    },
  },
});
