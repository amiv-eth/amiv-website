import m from 'mithril';
import marked from 'marked';
import escape from 'html-escape';
import { apiUrl } from 'config';
import Button from '../../components/Button';
import ActionBar from '../../components/ActionBar';
import { i18n, currentLanguage } from '../../models/language';
import { copyToClipboard } from '../../utils';

export default class JobofferDetails {
  static view({ attrs: { joboffer } }) {
    const urlId = `joboffer-${joboffer._id}-url`;

    return m('div.joboffer-details', [
      m('div.description', m.trust(marked(escape(joboffer.getDescription())))),
      m(ActionBar, {
        right: [
          joboffer.pdf
            ? m(Button, {
                className: 'flat-button',
                label: i18n('joboffers.downloadAsPdf'),
                events: {
                  onclick: () => {
                    window.open(apiUrl + joboffer.pdf.file, '_blank');
                  },
                },
              })
            : null,
          m('textarea', {
            id: urlId,
            style: { opacity: 0, width: 0, height: 0, padding: 0 },
          }),
          m(Button, {
            className: 'flat-button',
            label: i18n('copyDirectLink'),
            events: {
              onclick: () => {
                const url = `${window.location.origin}/${currentLanguage()}/${this.name}/${
                  joboffer._id
                }`;
                const inputElement = document.getElementById(urlId);

                copyToClipboard(url, inputElement);
              },
            },
          }),
        ],
      }),
    ]);
  }
}
