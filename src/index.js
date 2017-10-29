// src/index.js
const m = require('mithril');
const Layout = require('./layout');
const amiv = require('./amiv');

m.route(document.body, '/', {
  '/': {
    render() {
      return m(Layout, m(amiv));
    },
  },
});
