# AMIV website

This is the home of the new AMIV website.

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

* [Mithril](https://mithril.js.org)
* [i18next](https://www.i18next.com)

Needed extensions:

* [ESlint](https://github.com/eslint/eslint)
* [Prettier](https://github.com/prettier/prettier)
* [stylelint](https://stylelint.io)

Needed build tools:

* [npm](https://www.npmjs.com)
