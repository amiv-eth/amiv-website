// Contains static information about our commissions.
// Markdown can be used to style the text.

import bastliImage from '../images/commissions/bastli.png';
import blitzImage from '../images/commissions/blitz.jpg';
import emc2Image from '../images/commissions/emc2.jpg';
import irrationalImage from '../images/commissions/irrational.jpg';
import kontaktImage from '../images/commissions/kontakt.jpg';

const data = [
  {
    name: 'Bastli',
    image: bastliImage,
    website: 'https://bastli.ethz.ch',
    email: 'info@bastli.ethz.ch',
    phone: '+41 44 632 49 41',
    description: {
      en: `The eletronics laboratory is open for UZH and ETH students offering material and workspaces to make your projects and build your ideas.

        We are happy to help you. No prior knowledge is needed. The main thing is that you enjoy building things.`,
      de: `Das Elektroniklabor des AMIV von und für ETH / UZH Studierende bietet Euch kostenlose Arbeitsplätze und Werkzeuge um eure eigenen Projekte und Ideen umzusetzen.

          Wir sind für alle da und helfen euch gerne. Vorkentnisse werden keine benötigt, Hauptsache ihr habt Spass daran Dinge zu bauen.`,
    },
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
    image: irrationalImage,
    email: 'irrational@amiv.ethz.ch',
    phone: '+41 76 437 68 37',
    description: {
      en: `Irrational Coffee is an AMIV commission dedicated to spreading alternative coffee culture.
        If you are interested in learning more about different coffee beans, processing techniques, brewing methods, or anything coffee-related, then this is the place for you!

        **Every Wednesday 16:00-18:00**, come out to the CAB courtyard where you can taste different coffees and cascara tea at our coffee stand.

        Irrational Coffee also organizes coffee workshops and other coffee-related events, such as trips and coffee «pub crawls». `,
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
    image: kontaktImage,
    email: 'kontakt@amiv.ethz.ch',
    website: 'https://kontakt.amiv.ethz.ch',
    description: {
      en: `The Kontakt comission is responsible for organising all aspects of the annual AMIV Kontakt job fair.

        Contact with companies, catering, PR, controlling, the responsibilities are varied, and everybody can
      find his/her place.`,
      de: `Die Kommission Kontakt ist für die Organisation der jährlichen Firmenmesse verantwortlich.

        Catering, Public Relations, Finanzen, Kontakt zu Firmenvertretern – hier ist für jeden etwas
      dabei.`,
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
    email: 'beez@amiv.ethz.ch',
    description: {
      en: `The Biomedical Engineering Student Association at ETH Zurich is a social group with members mostly studying in or graduated from Biomedical Engineering MSc. program. Our aim is to bring together young engineers in their studies and help maintain the crucial balance between work life and leisure.

        However, just as our academic program, we are open to students from various backgrounds. If you are interested in biomedical research AND having fun, follow us!`,
    },
  },
];

export { data };
