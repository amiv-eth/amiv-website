import m from 'mithril';
import { apiUrl } from '../models/config';
import * as jobs from '../models/joboffers';
import { log } from '../models/log';

export default class JobOfferDetails {
  static oninit(vnode) {
    jobs.selectOffer(vnode.attrs.jobId);
  }

  static view() {
    const jobOffer = jobs.getSelectedOffer();

    if (typeof jobOffer === 'undefined') {
      return m('');
    }

    log(jobs.getSelectedOffer());
    return m('div', [
      m('h1', jobOffer.title),
      m('img', { src: `${apiUrl}${jobOffer.logo.file}`, alt: jobOffer.company }),
      m('p', jobOffer.description),
      m('a', { href: `${apiUrl}${jobOffer.pdf.file}`, target: '_blank' }, 'Download as PDF'),
    ]);
  }
}
