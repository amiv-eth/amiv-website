# AMIV website

**AMIV website but it doesn't suck, because we use VUE.js**

## How to use

### Update Content

[See this guide for further instructions](src/content/)

### Development

```bash
npm install
npm run server  #start developer server
```

### Production

```bash
npm install
npm run build
```

Then copy `index.html` and the dist folder to your webhost.

### Lint

```bash
npm run lint
```

### Documentation

```bash
npm run docs    # output format: HTML
npm run docs-md # output format: markdown
```

## Developer

Backend: [AMIV API](https://github.com/amiv-eth/amivapi)

Technologies:

* [Mithril](https://mithril.js.org/)
* [i18n for Virtual DOM](https://i18n4v.js.org)

Needed extensions:

* [ESlint](https://github.com/eslint/eslint)
* [Prettier](https://github.com/prettier/prettier)
* [stylelint](https://stylelint.io)

Needed build tools:

* [npm](https://www.npmjs.com)
