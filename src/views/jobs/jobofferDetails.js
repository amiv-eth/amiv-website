import m from 'mithril';
import marked from 'marked';
import escape from 'html-escape';
import { apiUrl } from 'config';
import { Button } from 'polythene-mithril';
import { i18n } from '../../models/language';

export default class JobofferDetails {
  static view({ attrs: { joboffer } }) {
    return m('div.joboffer-details', [
      m('div.description', m.trust(marked(escape(joboffer.getDescription())))),
      m(Button, {
        label: i18n('joboffers.downloadAsPdf'),
        border: true,
        events: {
          onclick: () => {
            window.open(apiUrl + joboffer.pdf.file, '_blank');
          },
        },
      }),
    ]);
  }
}
