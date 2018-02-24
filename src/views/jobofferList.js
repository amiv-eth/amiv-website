import m from 'mithril';
import { apiUrl } from '../models/config';
import * as jobs from '../models/joboffers';

const date = `${new Date().toISOString().split('.')[0]}Z`;

export default class JobOfferList {
  static oninit() {
    jobs.load({
      where: {
        time_end: { $gte: date },
        show_website: true,
      },
      sort: ['time_end'],
    });
  }

  static onbeforeupdate(vnode, old) {
    // when attrs are different it means we changed route
    if (vnode.attrs.id !== old.attrs.id) {
      jobs.reload();
    }
  }

  static view() {
    return m('table', [
      m('thead', [
        m('tr', [
          m('th', 'Company'),
          m('th', 'Title'),
          m('th', 'Details'),
        ]),
      ]),
      m('tbody', jobs.getList().map(job =>
        m('tr', [
          m('td', m('img', { src: `${apiUrl}${job.logo.file}`, width: '150px', alt: job.company })),
          m('td', job.title),
          m('td', m('a', { href: `/jobs/${job._id}`, oncreate: m.route.link }, 'Details')),
        ]))),
    ]);
  }
}
