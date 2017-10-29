// src/index.js
const m = require('mithril');
const Layout = require('./layout');
const statuten = require('./amiv/statuten');

m.route(document.body, '/', {
  '/': {
    render() {
      return m(Layout);
    },
  },
  '/amiv/statuten': {
    render() {
      return m(statuten);
    },
  },
});
