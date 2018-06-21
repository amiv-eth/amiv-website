import m from 'mithril';
import { EventController } from '../models/events';
import { JobofferController } from '../models/joboffers';
import { i18n } from '../models/language';
import { Card } from '../components';

// Render the Hot Cards, with link and imageurl
const renderHotCards = (item, index) => {
  if (index === 0) return m('div.hot-first-card', m(Card, item));
  return m('div.hot-card', m(Card, item));
};

// Render the frontpage cards, with href and imageurl
const renderRowCards = item => m('div.frontpage-row-card', m(Card, item));

export default class Frontpage {
  constructor() {
    this.eventController = new EventController(
      {
        max_results: 3,
        sort: ['-priority', 'time_advertising_start'],
      },
      false
    );
    this.jobOfferController = new JobofferController({ max_results: 3 });

    this.events = [];
    this.eventController.upcomingEvents.getPageData(1).then(events => {
      this.events = events;
    });
    this.jobs = [];
    this.jobOfferController.getPageData(1).then(jobs => {
      this.jobs = jobs;
    });

    // MOCKDATA
    this.hot = [
      {
        title: 'super hot',
        imageurl: 'http://www.heilpraxisnet.de/wp-content/uploads/2016/04/bier-lagern-1024x724.jpg',
      },
      { title: 'also pretty hot' },
      { title: 'kinda hot' },
    ];

    // Social Media Attributes, with their different APIs
    this.socialmedia = [
      {
        title: 'Facebook',
        href: 'https://www.facebook.com/AMIV.ETHZ/',
        imageurl:
          'http://www.fub.se/sites/www.fub.se/files/styles/artikelbild_full/public/facebook-logotyp.jpg?itok=e244p_Sa',
      },

      {
        title: 'Instagram',
        href: 'https://www.instagram.com/amiv_eth/?hl=de',
        imageurl:
          'https://i2.wp.com/www.newscouch.de/wp-content/uploads/2017/11/insta-logo.jpg?fit=2569%2C1761&ssl=1',
      },
      {
        title: 'Twitter',
        href: 'https://twitter.com/amiv_ethz',
        imageurl: 'https://rngeternal.com/wp-content/uploads/2017/12/twitter-logo.png',
      },
    ];
  }

  view() {
    return m('div#frontpage-container', [
      m('h2', i18n('frontpage.whats_hot')),
      m('div.hot-row', this.hot.map((item, index) => renderHotCards(item, index))),
      m('h2', i18n('Events')),
      m('div.frontpage-row', this.events.map(item => renderRowCards(item))),
      m('h2', 'Jobs'),
      m('div.frontpage-row', this.jobs.map(item => renderRowCards(item))),
      m('h2', i18n('frontpage.social_media')),
      m('div.frontpage-row', this.socialmedia.map(item => renderRowCards(item))),
    ]);
  }
}
