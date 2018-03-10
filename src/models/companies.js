import m from 'mithril';

// ensure that all markdown files are compiled
require.context('../views/companies/markdown');

export default function load(companyId) {
  // dynamically load markdown
  return m.request({
    url: `/dist/companies/${companyId}.html`,
    method: 'GET',
    deserialize: response => response,
  });
}
