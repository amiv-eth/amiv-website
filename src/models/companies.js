import m from 'mithril';
import { currentLanguage } from './language';

// ensure that all markdown files are compiled
require.context('../content/companies/markdown');

/**
 * Load company profile asynchronously from the compiled html files.
 *
 * @param {String} companyId company to load. This corresponds to the name of the markdown file.
 * @return {Promise} exports for additional response handling
 */
export default function load(companyId) {
  // dynamically load compiled html files
  return m.request({
    url: `/dist/companies/${companyId}.${currentLanguage()}.html`,
    method: 'GET',
    deserialize: response => response,
  });
}
