import m from 'mithril';

// ensure that all markdown files are compiled
require.context('../views/companies/markdown');

/**
 * Load company profile asynchronously from the compiled html files.
 *
 * @param {String} companyId company to load. This corresponds to the name of the markdown file.
 * @return {Promise} exports for additional response handling
 */
export default function load(companyId) {
  // dynamically load compiled html files
  return m.request({
    url: `/dist/companies/${companyId}.html`,
    method: 'GET',
    deserialize: response => response,
  });
}
