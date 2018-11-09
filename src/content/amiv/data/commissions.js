// Contains static information about our commissions.
// Markdown can be used to style the text.

import bastliImage from '../images/commissions/bastli.png';
import blitzImage from '../images/commissions/blitz.jpg';
import emc2Image from '../images/commissions/emc2.jpg';
import irrationalImage from '../images/commissions/irrational.jpg';
import kontaktImage from '../images/commissions/kontakt.jpg';
import randomDudesImage from '../images/commissions/randomdudes.jpg';
import limesImage from '../images/commissions/limes.jpg';

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
    name: 'LIMES',
    image: limesImage,
    email: 'limes@amiv.ethz.ch',
    website: 'https://limes.ethz.ch',
    description: {
      en: `We **L**adies **i**n **M**echanical and **E**lectrical **S**tudies are the women’s committee of the AMIV. We organize different events to connect female students of ITET and MAVT and to network with industry partners.

        Our events are mainly addressed to female AMIV fellows. New Ladies in our main board are besides always welcome. But at our talk events, we are also always happy about male AMIV participants.

        _...because engineering knows no limits!_`,
      de: `Wir **L**adies **i**n **M**echanical and **E**lectrical **S**tudies sind die Frauenkommission des AMIV. Wir organisieren verschiedene Events um Studentinnen untereinander, aber auch mit Industriepartnern zu verknüpfen.

        Unsere Events sind hauptsächlich an AMIVlerinnen gerichtet. Neue Ladies im Vorstand sind ausserdem immer herzlich willkommen. Bei unseren Talks Events freuen wir uns aber auch immer über männliche Kommilitonen.

        _...because engineering knows no limits!_`,
    },
  },
  {
    name: 'RandomDudes',
    image: randomDudesImage,
    email: 'randomdudes@amiv.ethz.ch',
    description: {
      en: `The Randomdudes form one of the more special commissions the amiv incorporates. Its main duties are sustaining knowledge within the amiv and to ensure the ridiculously generous opening hours of the amiv office. Most of our members are former board members and other friends of the gondola, which we care for and continuously improve.

      We also organize many events that make studying a little easier and especially more fun.`,
      de: `Die Randomdudes sind die wohl speziellste Kommission des AMIV. Vorrangig für den Wissenserhalt und generelle Anwesenheit im Büro zuständig, bestehen wir zum größten Teil aus ehemaligen Vorständen und freunden der Gondel, für dessen Pflege wir auch zuständig sind.

        Außerdem organisieren wir regelmäßig Events zur Bespaßung der Studentenschaft, um Euch den Studienalltag ein bisschen erträglicher zu machen.`,
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
