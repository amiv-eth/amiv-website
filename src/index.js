// src/index.js
const m = require('mithril');

const Layout = require('./views/layout');
const amiv = require('./views/amiv');
const login = require('./views/login');
const statuten = require('./views/amiv/statuten');
const contact = require('./views/contact');
const aufenthaltsraum = require('./views/amiv/aufenthaltsraum');


m.route(document.body, '/', {
  '/': {
    render() {
      return m(Layout, m(amiv));
    },
  },
  '/amiv/statuten': {
    render() {
      return m(Layout, m(statuten));
    },
  },
  '/contact': {
    render() {
      return m(Layout, m(contact));
    },
  },
  '/amiv/aufenthaltsraum': {
    render() {
      return m(Layout, m(aufenthaltsraum));
    },
  },
  '/login': {
    render() {
      return m(Layout, m(login));
    },
  },
});
