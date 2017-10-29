// src/index.js
const m = require('mithril');
const Layout = require('./layout');
const kontakt = require('./amiv/kontakt');
const aufenthaltsraum = require('./amiv/aufenthaltsraum');

m.route(document.body, '/', {
  '/': {
    render() {
      return m(Layout);
    },
  },
  '/kontakt': {
    render() {
      return m(kontakt);
    },
  },
  '/aufenthaltsraum': {
    render() {
      return m(aufenthaltsraum);
    },
  },
});
