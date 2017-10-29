// src/index.js
const m = require('mithril');
const Layout = require('./layout');

m.route(document.body, '/', {
  '/': {
    render() {
      return m(Layout);
    },
  },
});
