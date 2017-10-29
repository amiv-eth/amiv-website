// src/index.js
const m = require('mithril');
const Layout = require('./layout');
const amiv = require('./amiv');
const statuten = require('./amiv/statuten');

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
});
