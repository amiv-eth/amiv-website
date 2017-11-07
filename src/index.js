// src/index.js
const m = require('mithril');
const Layout = require('./layout');
const kontakt = require('./amiv/kontakt');
const aufenthaltsraum = require('./amiv/aufenthaltsraum');
const comissions = require('./amiv/comissions');

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
  '/comissions': {
    render() {
      return m(comissions);
    },
  },
});
