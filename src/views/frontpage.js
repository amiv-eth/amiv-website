import m from 'mithril';
import { apiUrl } from 'config';
import { Card } from 'polythene-mithril';
import { EventController } from '../models/events';
import { JobofferController } from '../models/joboffers';
import { i18n, currentLanguage } from '../models/language';
// import { Card } from '../components';
import AmivLogo from '../images/logoNoText.svg';

async function getData(state) {
  const events = await state.eventController.upcomingEvents.getPageData(1);
  console.log(events);
  if (events.length < 3) {
    const pastEvents = await state.eventController.pastEvents.getPageData(1);
    const { length } = events;
    for (let i = 0; i < Math.min(3 - length, pastEvents.length); i += 1) events.push(pastEvents[i]);
  }
  const jobs = await state.jobOfferController.getPageData(1);
  return { ...{ events }, ...{ jobs } };
}

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
    getData(this).then(result => {
      this.events = result.events;
      this.jobs = result.jobs;
      m.redraw();
    });

    // MOCKDATA
    this.hot = [
      {
        getTitle: () => {
          if (currentLanguage() === 'de') return 'richtig heiss';
          return 'super hot';
        },
        imageurl:
          'https://www.heilpraxisnet.de/wp-content/uploads/2016/04/bier-lagern-1024x724.jpg',
      },
      {
        getTitle: () => {
          if (currentLanguage() === 'de') return 'auch ziemlich heiss';
          return 'also pretty hot';
        },
        imageurl:
          'https://image.shutterstock.com/z/stock-photo-group-of-happy-people-isolated-over-white-background-102307264.jpg',
      },
      {
        title_en: 'kinda hot',
        title_de: 'lauwarm',
        getTitle: () => {
          if (currentLanguage() === 'de') return 'lauwarm';
          return 'kinda hot';
        },
        imageurl: 'https://bit.ly/2OUjN5w',
      },
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
      m('div.hot-row', this.hot.map((item, index) => this.constructor._renderHotCard(item, index))),
      m('h2', i18n('Events')),
      m('div.frontpage-row', this.events.map(item => this.constructor._renderEventCard(item))),
      m('h2', i18n('Jobs')),
      m('div.frontpage-row', this.jobs.map(item => this.constructor._renderJobCard(item))),
      m(
        'div.frontpage-row',
        this.socialmedia.map(item => this.constructor._renderSocialMediaCard(item))
      ),
    ]);
  }

  static _renderHotCard(item, index) {
    return m(Card, {
      className: index === 0 ? 'hot-first-card' : 'hot-card',
      content: [
        {
          media: {
            origin: 'center',
            ratio: 'landscape',
            content: m('img', {
              src: item.imageurl ? item.imageurl : AmivLogo,
            }),
            overlay: {
              sheet: true,
              content: [
                {
                  primary: {
                    title: item.getTitle(),
                  },
                },
              ],
            },
          },
        },
      ],
    });
  }

  static _renderEventCard(item) {
    return m(Card, {
      url: {
        href: `${m.route.get()}events/${item._id}`,
        oncreate: m.route.link,
      },
      content: [
        {
          media: {
            origin: 'center',
            ratio: 'landscape',
            content: m('img', {
              src: item.img_infoscreen ? `${apiUrl}${item.img_infoscreen.file}` : AmivLogo,
            }),
          },
        },
        {
          primary: {
            title: item.getTitle(),
          },
        },
      ],
    });
  }

  static _renderJobCard(item) {
    return m(Card, {
      url: {
        href: `${m.route.get()}jobs/${item._id}`,
        oncreate: m.route.link,
      },
      content: [
        {
          primary: {
            title: item.getTitle(),
          },
        },
        {
          media: {
            origin: 'center',
            ratio: 'landscape',
            size: 'small',
            content: m('img', {
              src: item.logo ? `${apiUrl}${item.logo.file}` : AmivLogo,
            }),
          },
        },
      ],
    });
  }

  static _renderSocialMediaCard(item) {
    return m(Card, {
      url: {
        href: item.href,
      },
      content: [
        {
          media: {
            origin: 'center',
            ratio: 'landscape',
            content: m('img', {
              src: item.imageurl ? item.imageurl : AmivLogo,
            }),
          },
        },
      ],
    });
  }
}
