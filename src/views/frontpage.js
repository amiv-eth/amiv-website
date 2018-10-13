import m from 'mithril';
import { EventController } from '../models/events';
import { JobofferController } from '../models/joboffers';
import { i18n, currentLanguage } from '../models/language';
import { Card } from '../components';
import { SocialMediaPlugin } from '../components';

// Render the Hot Cards, with link and imageurl
const renderHotCards = (item, index) => {
  const card_item = item;
  switch (currentLanguage()) {
    case 'de':
      card_item.title = item.title_de;
      break;
    case 'en':
    default:
      card_item.title = item.title_en;
  }
  if (index === 0) return m('div.hot-first-card', m(Card, card_item));
  return m('div.hot-card', m(Card, card_item));
};

// Render the frontpage cards, with href and imageurl
const renderRowCards = (item, type) => {
  const card_item = item;
  if (!card_item.href) card_item.href = `${m.route.get() + type}/${card_item._id}`;
  switch (currentLanguage()) {
    case 'de':
      card_item.title = item.title_de;
      break;
    case 'en':
    default:
      card_item.title = item.title_en;
  }
  return m('div.frontpage-row-card', m(Card, card_item));
};

//Render socialMedia plugins
const renderSocialMedia = item => m('div.frontpage-row-card', m(SocialMediaPlugin, item));

export default class Frontpage {
  oninit() {
    this.eventController = new EventController(
      {
        max_results: 3,
        sort: ['-priority', 'time_advertising_start'],
      },
      false
    );
    this.jobOfferController = new JobofferController({ max_results: 3 });

    this.hot = [];
    this.events = [];
    this.jobs = [];
    this.socialmedia = [];
  }

  oncreate() {
    this.eventController.upcomingEvents.getPageData(1).then(events => {
      this.events = events;
      m.redraw();
    });
    this.jobs = [];
    this.jobOfferController.getPageData(1).then(jobs => {
      this.jobs = jobs;
      m.redraw();
    });

    // MOCKDATA
    this.hot = [
      {
        title_en: 'super hot',
        title_de: 'richtig heiss',
        imageurl: 'http://www.heilpraxisnet.de/wp-content/uploads/2016/04/bier-lagern-1024x724.jpg',
      },
      {
        title_en: 'also pretty hot',
        title_de: 'auch ziemlich heiss',
        imageurl:
          'https://image.shutterstock.com/z/stock-photo-group-of-happy-people-isolated-over-white-background-102307264.jpg',
      },
      {
        title_en: 'kinda hot',
        title_de: 'lauwarm',
        imageurl: 'https://bit.ly/2OUjN5w',
      },
    ];

    // Social Media Attributes, with their different APIs
    this.socialmedia = [
      {
        title: 'Facebook',
        href: 'https://www.facebook.com/AMIV.ETHZ/',
      },

      {
        title: 'Instagram',
        href: 'https://www.instagram.com/amiv_eth/?hl=de',
      },
      {
        title: 'Twitter',
        href: 'https://twitter.com/amiv_ethz',
      },
    ];
  }

  view() {
    return m('div#frontpage-container', [
      m('div.hot-row', this.hot.map((item, index) => renderHotCards(item, index))),
      m('h2', i18n('Events')),
      m('div.frontpage-row', this.events.map(item => renderRowCards(item, 'events'))),
      m('h2', 'Jobs'),
      m('div.frontpage-row', this.jobs.map(item => renderRowCards(item, 'jobs'))),
      m('h2', i18n('frontpage.social_media')),
      m('div.frontpage-row', this.socialmedia.map(item => renderSocialMedia(item))),
    ]);
  }
}
