import m from 'mithril';
import * as events from '../models/events';
import './styles/frontpage.less';

const date = `${new Date().toISOString().split('.')[0]}Z`;

const renderCards = item => m('div', { class: 'frontpage-card' }, item);

const renderHotCards = (item, index) => {
  if (index === 0) return m('div', { class: 'hot-first-card' }, item);
  return m('div', { class: 'hot-card' }, item);
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

    // this.events = events.getList().slice(0, 3);

    // MOCKDATA
    this.hot = ['super hot', 'also pretty hot', 'kinda hot'];
    this.events = ['cool event', 'another event', 'sorta cool', 'something'];
    this.jobs = ['google', 'less than google', 'abb', 'accenture'];
  }

  static oninit() {
    console.log('init');
  }

  view() {
    return m('div', { class: 'container' }, [
      m('div', { class: 'hot-row' }, this.hot.map((item, index) => renderHotCards(item, index))),
      m('div', { class: 'frontpage-row' }, this.events.map(item => renderCards(item))),
      m('div', { class: 'frontpage-row' }, this.jobs.map(item => renderCards(item))),
    ]);
  }
}
