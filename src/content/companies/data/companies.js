// Contains static information about company profiles.
// Markdown can be used to style the text.

import abbLogo from '../logos/abb.png';
import mfLogo from '../logos/m-f.png';

const data = {
  abb: {
    name: 'ABB Schweiz AG',
    logo: abbLogo,
    address: ['ABB Schweiz AG', 'Herr Marcel Winkelmann', 'Brown Boveri Strasse 6', '5400 Baden'],
    email: 'hrmarketing@ch.abb.com',
    website: 'http://www.abb.ch/',
    employees: {
      worldwide: 145000,
      Switzerland: 6800,
    },
  },
  'm-f': {
    name: 'M&F Engineering',
    logo: mfLogo,
    address: ['M&F Engineering', 'Rachel Blaser', 'Querstrasse 17', '8951 Fahrweid'],
    email: 'rachel.blaser@m-f.ch',
    phone: '+41 44 747 44 33',
    website: 'http://www.m-f.ch/',
    employees: {
      worldwide: 25,
      Switzerland: 25,
    },
  },
  sensirion: {
    name: 'Sensirion AG',
    address: ['Marco Höhener'],
    phone: '+41 44 927 11 96',
    website: 'http://www.sensirion.com/',
  },
};

export { data };
