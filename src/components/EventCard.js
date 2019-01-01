import m from 'mithril';
import { apiUrl } from 'config';
import { Card } from 'polythene-mithril-card';
import Spinner from 'amiv-web-ui-components/src/spinner';

export default class EventCard {
  /**
   * A card showing the event poster (or titel and catchphrase if there is not poster)
   *
   * @param {object} attrs.item Event item received from the API.
   *
   * Example:
   *   ```javascript
   *   m(EventCard, { item: null })
   *   ```
   */

  static view({ attrs: { item } }) {
    let url;
    let cardContent;

    if (item) {
      url = {
        href: `${m.route.get()}events/${item._id}`,
        oncreate: m.route.link,
      };

      if (item.img_poster) {
        cardContent = m('img', {
          src: `${apiUrl}${item.img_poster.file}`,
          alt: item.getTitle(),
        });
      } else {
        cardContent = m('div', [m('h2', item.getTitle()), m('span', item.getCatchphrase())]);
      }
    } else {
      cardContent = m(Spinner, { show: true });
    }

    return m(Card, {
      url,
      content: m('div.image.ratio-paper-a-vertical', cardContent),
    });
  }
}
