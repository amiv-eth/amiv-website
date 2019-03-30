import m from 'mithril';
import DropdownCard from 'amiv-web-ui-components/src/dropdownCard';
import { i18n } from '../../models/language';

let expanded = false;

export default class EventCalendar {
  static view() {
    const animationDuration = 300; // in ms

    return m(DropdownCard, {
      className: ['events-calendar', expanded ? 'expanded' : null].join(' '),
      expanded,
      separated: false,
      duration: animationDuration,
      onChange: expandedArg => {
        expanded = expandedArg;
      },
      title: i18n('events.agenda'),
      content: m(
        'div.events-calendar-container',
        m.trust(
          '<iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=2&amp;bgcolor=%23FFFFFF&amp;src=mdk91hfvr18q8rrlh3sedlhgvo%40group.calendar.google.com&amp;color=%23B1365F&amp;ctz=Europe%2FZurich" style="border-width:0" width="800" height="600" frameborder="0" scrolling="no"></iframe>'
        )
      ),
    });
  }
}
