// src/index.js
const m = require('mithril');
const Layout = require('./views/layout');
const amiv = require('./views/amiv');
const login = require('./views/login');

m.route(document.body, '/', {
  '/': {
    render() {
      return m(Layout, m(amiv));
    },
  },
  '/login': {
    render() {
      return m(Layout, m(login));
    },
  },
});
