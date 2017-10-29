// src/index.js
const m = require('mithril');
const Layout = require('./layout');
const amiv = require('./amiv');
const statuten = require('./amiv/statuten');
const contact = require('./contact');
const aufenthaltsraum = require('./amiv/aufenthaltsraum');

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
});
