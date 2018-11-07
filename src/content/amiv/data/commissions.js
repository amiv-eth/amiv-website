// Contains static information about our commissions.
// Markdown can be used to style the text.

import bastliImage from '../images/commissions/bastli.png';
import blitzImage from '../images/commissions/blitz.jpg';
import emc2Image from '../images/commissions/emc2.jpg';

const data = [
  {
    name: 'Bastli',
    description: {
      de: `Das Elektroniklabor des AMIV von und für ETH Studenten bietet Euch kostenlose Arbeitsplätze und Werkzeuge um eure eigenen Projekte und Ideen umzusetzen.

          Wir sind für alle da und helfen euch gerne. Vorkentnisse werden keine benötigt, Hauptsache ihr habt Spass daran Dinge zu bauen ;)`,
    },
    image: bastliImage,
    website: 'https://bastli.ethz.ch',
    email: 'info@bastli.ethz.ch',
    phone: '+41 44 632 49 41',
  },
  {
    name: 'Blitz',
    image: blitzImage,
    website: 'https://blitz.ethz.ch',
    email: 'info@blitz.ethz.ch',
  },
  {
    name: 'Braukommission',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
  },
  {
    name: 'Irrational Co.',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
  },
  {
    name: 'EESTEC',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
  },
  {
    name: 'Funkbude',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
  },
  {
    name: 'LIMES - Ladies in Mechanical and Electrical Studies',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
    website: 'https://limes.ethz.ch',
    email: 'limes@amiv.ethz.ch',
  },
  {
    name: 'RandomDudes',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
  },
  {
    name: 'Kontakt',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
  },
  {
    name: 'E=MC^2',
    image: emc2Image,
    email: 'emc2@amiv.ethz.ch',
    website: 'https://fb.me/emc2eth',
    description: {
      en: `The Energy Master Chill Club is a student-run AMIV commission bringing together energy students across different years through all types of events (Fondue Night, BBQ, Ski Weekend, etc.).

        Our events are not just for MEST students, we encourage any and all students to join us!`,
      de: `Der Energy Master Chill Club ist eine studentische AMIV-Kommission, welche MEST-Studenten von allen Jahrgängen bei verschiedenen Events zusammenbringt (Fondueabend, BBQ, Skiwochenende, etc.).

        Unsere Event sind nicht exklusiv für MEST-Studenten, wir freuen uns über alle TeilnehmerInnen!`,
    },
  },
  {
    name: 'MNS',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
  },
  {
    name: 'BEEZ',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
  },
];

export { data };
