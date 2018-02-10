// src/index.js
import studydocList from './views/studydocList';
import studydocNew from './views/studydocNew';
import eventList from './views/eventList';
import eventDetails from './views/eventDetails';
import profile from './views/profile';
import Layout from './views/layout';
import amivLayout from './views/amiv/amivLayout';
import amiv from './views/amiv';
import login from './views/login';
import statuten from './views/amiv/statuten';
import contact from './views/contact';
import aufenthaltsraum from './views/amiv/aufenthaltsraum';
import board from './views/amiv/board';

const m = require('mithril');

m.route(document.body, '/', {
  '/': {
    render() {
      return m(Layout, m(amivLayout, m(amiv)));
    },
  },
  '/amiv/statuten': {
    render() {
      return m(Layout, m(amivLayout, m(statuten)));
    },
  },
  '/contact': {
    render() {
      return m(Layout, m(contact));
    },
  },
  '/amiv/aufenthaltsraum': {
    render() {
      return m(Layout, m(amivLayout, m(aufenthaltsraum)));
    },
  },
  '/login': {
    render() {
      return m(Layout, m(login));
    },
  },
  '/amiv/board': {
    render() {
      return m(Layout, m(amivLayout, m(board)));
    },
  },
  '/studydocuments': {
    render() {
      return m(Layout, m(studydocList));
    },
  },
  '/studydocuments/new': {
    render() {
      return m(Layout, m(studydocNew));
    },
  },
  '/events': {
    render() {
      return m(Layout, m(eventList));
    },
  },
  '/events/:eventId': {
    render(vnode) {
      return m(Layout, m(eventDetails, vnode.attrs));
    },
  },
  '/profile': {
    render(vnode) {
      return m(Layout, m(profile, vnode.attrs));
    },
  },
});
