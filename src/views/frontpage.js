import m from 'mithril';
import * as events from '../models/events';

const date = `${new Date().toISOString().split('.')[0]}Z`;

// Render the frontpage cards, with href and imageurl
const renderCards = item => {
  const { title, href, imageurl } = item;
  return m(
    'div.frontpage-card',
    { style: `background-image: url(${imageurl})` },
    m('a', { href }, title)
  );
};

// Render the Hot Cards, with link and imageurl
const renderHotCards = (item, index) => {
  const { title, href, imageurl } = item;
  if (index === 0) {
    return m(
      'div.hot-first-card',
      {
        style: `background-image: url(${imageurl})`,
      },
      m('a', { href }, title)
    );
  }
  return m(
    'div.hot-card',
    { style: `background-image: url(${imageurl})` },
    m('a', { href }, title)
  );
};

export default class Frontpage {
  constructor() {
    events.load({
      where: {
        time_advertising_start: { $lte: date },
        time_advertising_end: { $gte: date },
        show_website: true,
      },
      sort: ['-priority', 'time_advertising_start'],
    });

    this.events = events.getList().slice(0, 3);

    // MOCKDATA
    this.hot = [
      {
        title: 'super hot',
        imageurl: 'http://www.heilpraxisnet.de/wp-content/uploads/2016/04/bier-lagern-1024x724.jpg',
      },
      { title: 'also pretty hot' },
      { title: 'kinda hot' },
    ];
    this.jobs = [{ title: 'Google' }, { title: 'ABB' }, { title: 'Accenture' }];
    this.socialmedia = [
      {
        title: 'Facebook',
        href: 'https://www.facebook.com/AMIV.ETHZ/',
        imageurl: 'https://upload.wikimedia.org/wikipedia/commons/c/c2/F_icon.svg',
      },
      {
        title: 'Instagram',
        href: 'https://www.instagram.com/amiv_eth/?hl=de',
        imageurl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2000px-Instagram_logo_2016.svg.png',
      },
      {
        title: 'Twitter',
        href: 'https://twitter.com/amiv_ethz?lang=de',
        imageurl:
          'https://upload.wikimedia.org/wikipedia/de/thumb/9/9f/Twitter_bird_logo_2012.svg/1200px-Twitter_bird_logo_2012.svg.png',
      },
    ];
  }

  onbeforeupdate() {
    this.events = events.getList().slice(0, 3);
    console.log(this.events);
  }

  view() {
    return m('div#frontpage-container', [
      m('div.hot-row', this.hot.map((item, index) => renderHotCards(item, index))),
      m('div.frontpage-row', this.events.map(item => renderCards(item))),
      m('div.frontpage-row', this.jobs.map(item => renderCards(item))),
      m('div.frontpage-row', this.socialmedia.map(item => renderCards(item))),
    ]);
  }
}
