import m from 'mithril';
import { Tabs } from '../components';
import Navigation from '../models/navigation';

export default class Navbar {
  constructor() {
    this.nav = new Navigation();
  }

  onupdate() {
    this.nav.onupdate();
  }

  view() {
    return m(Tabs, this.nav.tabs);
  }
}
