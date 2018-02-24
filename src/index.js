// src/index.js
import m from 'mithril';
import studydocList from './views/studydocList';
import studydocNew from './views/studydocNew';
import eventList from './views/eventList';
import eventDetails from './views/eventDetails';
import profile from './views/profile';
import layout from './views/layout';
import amivLayout from './views/amiv/amivLayout';
import amiv from './views/amiv';
import login from './views/login';
import statuten from './views/amiv/statuten';
import contact from './views/contact';
import aufenthaltsraum from './views/amiv/aufenthaltsraum';
import board from './views/amiv/board';
import jobOfferList from './views/jobofferList';
import jobOfferDetails from './views/jobofferDetails';

m.route(document.body, '/', {
  '/': {
    render() {
      return m(layout, m(amivLayout, m(amiv)));
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
});
