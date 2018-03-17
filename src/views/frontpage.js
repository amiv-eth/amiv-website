import m from 'mithril';
import * as events from '../models/events';

const date = `${new Date().toISOString().split('.')[0]}Z`;

const renderCards = item => {
  const { title, href } = item;
  return m('div.frontpage-card', m('a', { href }, title));
};

const renderHotCards = (item, index) => {
  const { title } = item;
  if (index === 0) return m('div.hot-first-card', title);
  return m('div.hot-card', title);
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
    this.hot = [{ title: 'super hot' }, { title: 'also pretty hot' }, { title: 'kinda hot' }];
    this.jobs = [{ title: 'google' }, { title: 'abb' }, { title: 'accenture' }];
    this.socialmedia = [
      { title: 'Facebook', href: 'https://www.facebook.com/AMIV.ETHZ/' },
      { title: 'Instagram', href: 'https://www.instagram.com/amiv_eth/?hl=de' },
      { title: 'Twitter', href: 'https://twitter.com/amiv_ethz?lang=de' },
    ];
  }

  onbeforeupdate() {
    this.events = events.getList().slice(0, 3);
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
