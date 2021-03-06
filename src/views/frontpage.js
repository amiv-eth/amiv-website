import m from 'mithril';
import { apiUrl } from 'config';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Card } from 'polythene-mithril-card';
import Spinner from 'amiv-web-ui-components/src/spinner';
import EventCard from '../components/EventCard';
import EventController from '../models/events/EventController';
import JobofferController from '../models/joboffers/JobofferController';
import { i18n } from '../models/language';

async function getData(state) {
  const events = await state.eventController.upcomingEvents.getPageData(1);
  // if there are more than 3 upcoming events with posters, show two rows with event posters.
  const posterCount = events.length <= 3 ? 3 : 6;
  if (events.length < posterCount) {
    const pastEvents = await state.eventController.pastEvents.getPageData(1);
    const { length } = events;
    for (let i = 0; i < Math.min(posterCount - length, pastEvents.length); i += 1) {
      events.push(pastEvents[i]);
    }
  }
  const jobs = await state.jobOfferController.getPageData(1);
  return { events, jobs };
}

export default class Frontpage {
  oninit() {
    this.eventController = new EventController(
      {
        max_results: 6,
        sort: ['-priority', '-time_advertising_start'],
        where: { img_poster: { $ne: null } },
      },
      false
    );
    this.jobOfferController = new JobofferController({ max_results: 6 });

    this.events = [];
    this.jobs = [];
  }

  oncreate() {
    getData(this).then(result => {
      this.events = result.events;
      this.jobs = result.jobs;
      m.redraw();
    });
  }

  view() {
    return m('div#frontpage-container', [
      m(
        'h2',
        m(
          m.route.Link,
          {
            selector: 'a',
            href: `${m.route.get()}events`,
          },
          i18n('events.title')
        )
      ),
      m(
        'div.frontpage-row',
        this.events.length > 0
          ? this.events.map(item => m(EventCard, { item }))
          : Array.from(Array(3)).map(() => m(EventCard))
      ),
      m(
        'h2',
        m(
          m.route.Link,
          {
            selector: 'a',
            href: `${m.route.get()}jobs`,
          },
          i18n('joboffers.title')
        )
      ),
      m(
        'div.frontpage-row',
        this.jobs.length > 0
          ? this.jobs.map(item => this.constructor._renderJobCard(item))
          : Array.from(Array(3)).map(() => this.constructor._renderJobCard(null, true))
      ),
    ]);
  }

  static _renderJobCard(item, loading = false) {
    let url;
    let cardContent;

    if (item && !loading) {
      url = `${m.route.get()}jobs/${item._id}`;

      let logo;
      if (item.logo) {
        logo = m('img', { src: `${apiUrl}${item.logo.file}`, alt: item.company });
      }

      cardContent = m('div', [m('h3', item.getTitle()), m('div.image.ratio-4to1', logo)]);
    } else {
      cardContent = m('div.image.ratio-2to1', m(Spinner, { show: true }));
    }

    return m(
      m.route.Link,
      {
        selector: 'a',
        href: url,
      },
      m(Card, {
        className: 'frontpage-job',
        content: cardContent,
      })
    );
  }
}
