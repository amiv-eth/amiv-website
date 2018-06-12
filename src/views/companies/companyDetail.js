import m from 'mithril';
import load from '../../models/companies';
import { data } from './data/companies';
import { Error404 } from '../errors';
import { i18n } from '../../models/language';

export default class CompanyDetails {
  oninit(vnode) {
    if (!data[vnode.attrs.companyId]) return;

    this.company = data[vnode.attrs.companyId];
    this.content = '';
    load(vnode.attrs.companyId).then(response => {
      this.content = response;
    });
  }

  view() {
    if (!this.company) {
      return m(Error404);
    }
    return m('div', [
      m('h1', this.company.name),
      this.company.logo ? m('img', { src: `/${this.company.logo}` }) : m(''),
      m('div', [
        m('h2', i18n('companies.contact_information')),
        this.company.address.map(item => m('div', item)),
        this.company.email
          ? m('div', [
              m('span', `${i18n('companies.email')} `),
              m('a', { href: `mailto:${this.company.email}` }, this.company.email),
            ])
          : m(''),
        this.company.phone
          ? m('div', [
              m('span', `${i18n('companies.phone')} `),
              m('a', { href: `tel:${this.company.phone}` }, this.company.phone),
            ])
          : m(''),
        this.company.website
          ? m('div', [
              m('span', `${i18n('companies.website')} `),
              m('a', { href: this.company.website }, this.company.website),
            ])
          : m(''),
      ]),
      this.company.employees
        ? m('div', [
            m('h2', i18n('companies.employees')),
            Object.entries(this.company.employees).map(([key, employees]) =>
              m('div', [m('span', `${i18n(`companies.employees_${key}`)}: `), m('span', employees)])
            ),
          ])
        : m(''),
      m('div', m.trust(this.content)),
    ]);
  }
}
