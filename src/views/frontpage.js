import m from 'mithril';
import * as events from '../models/events';

const date = `${new Date().toISOString().split('.')[0]}Z`;

const renderCards = item => {
  const { title } = item;
  return m('div.frontpage-card', title);
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
    console.log(this.events);

    // MOCKDATA
    this.hot = [{ title: 'super hot' }, { title: 'also pretty hot' }, { title: 'kinda hot' }];
    this.jobs = [
      { title: 'google' },
      { title: 'less than google' },
      { title: 'abb' },
      { title: 'accenture' },
    ];
  }

  onbeforeupdate() {
    this.events = events.getList().slice(0, 4);
    console.log(this.events);
  }

  view() {
    return m('div#frontpage-container', [
      m('div.hot-row', this.hot.map((item, index) => renderHotCards(item, index))),
      m('div.frontpage-row', this.events.map(item => renderCards(item))),
      m('div.frontpage-row', this.jobs.map(item => renderCards(item))),
    ]);
  }
}
