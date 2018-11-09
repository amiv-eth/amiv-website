// Contains static information about our ressorts.
// Markdown can be used to style the text.

import kulturImage from '../images/ressorts/kultur.png';
import itImage from '../images/ressorts/it.jpg';
import designImage from '../images/ressorts/design.jpg';

const data = [
  {
    name: 'Designteam',
    image: designImage,
    email: 'design@amiv.ethz.ch',
    phone: '+41 44 632 42 45',
    description: {
      en: `Making the world a prettier place since 2016 - the AMIV's very own in-house design team is tasked with creating better looking posters, flyers & infoscreens, lit merchandise and stickers you will keep forever. If you enjoy the creative side of life, and are looking to learn or apply some editing skills then hit us up with an e-mail.

      Once a semester we host a Photoshop-battle, inviting everyone who wants to put their Photoshop/GIMP/Affinity/Paint skills to the test in a laidback atmosphere.

      Most of our work can be found by scrolling through the AMIV event page.`,
      de: `Der Verschönerungsverein des AMIVs, gegründet 2016 - auch als Designteam bekannt - übernimmt die Verantwortung für bessere und schönere Plakate, Flyers & Infoscreens, opulentes Merchandise und Kleber, welche lebenslang am Computer kleben bleiben. Falls Du zu viel von Vorlesungen oder Übungsserien hast und die kreativere Seite vom Leben kosten möchtest, dann ist das Designteam ideal für dich! 

      Einmal pro Semester organisieren wir ein Photoshop-battle, bei dem alle herzlich eingeladen sind, die ihre Photoshop/GIMP/Affinity/Paint Fähigkeiten in einer gechillten Atmosphäre unter Beweis stellen möchten.

      Die meisten Poster können auf der AMIV Event-Page gefunden werden.`,
    },
  },
  {
    name: 'ER Team',
    email: 'er@amiv.ethz.ch',
    phone: '+41 44 632 42 45',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
  },
  {
    name: 'IT Team',
    image: itImage,
    email: 'it@amiv.ethz.ch',
    phone: '+41 44 632 42 45',
    description: {
      en: `Webapps, Websites and beer dispenser are just a few things the AMIV IT provides.

        Programming applications and managing linux servers are the major tasks the IT team does.
        We are always looking for motivated people. No advanced skills are needed.

        Do you want to learn more?

        Send us an email or drop by the AMIV office.`,
      de: `Webapps, Webseiten und Bierautomat sind nur wenige Dinge, die von der AMIV IT bereitstellt werden.

        Programmieren von Anwendungen und managen von Linux Servern sind die Hauptaufgaben des IT Teams.
        Wir sind stetig auf der Suche nach motivierten Leuten. Es sind keine Vorkenntnisse erforderlich.

        Melde dich doch per Mail oder schau einfach mal im AMIV Büro vorbei!`,
    },
  },
  {
    name: 'Kulturteam',
    image: kulturImage,
    email: 'kultur@amiv.ethz.ch',
    phone: '+41 44 632 42 45',
    description: {
      en: `The AMIV culture branch brings you more than 30 events every semester:
        from legendary happenings such as our Sushi-Night, AMIVondue to Lasertag, theatre visits and speed dating, there is something for everyone!

        Do you have a brilliant idea for a new event that we missed and should be holding? Or would you like to help us organise an event?
        Send us an email or drop by the AMIV offices and join the AMIV culture branch!`,
      de: `Wir vom Kulturteam organisieren für euch über 30 Events pro Semester.
        Von Sushi-Night und AMIVondue über Lasertag bis zu Theater und Speeddating hat es bestimmt für jeden etwas dabei!
      
        Hast du eine geniale Idee für ein Event, das dir noch fehlt? Oder möchtest du gerne selbst einmal Event-Luft schnuppern und mithelfen ein Event zu planen? Dann melde dich doch per Mail bei uns oder schau einfach mal im AMIV-Büro vorbei!`,
    },
  },
  {
    name: 'HoPo MAVT',
    email: 'hopo-mavt@amiv.ethz.ch',
    phone: '+41 44 632 42 45',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
  },
  {
    name: 'HoPo ITET',
    email: 'hopo-itet@amiv.ethz.ch',
    phone: '+41 44 632 42 45',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
    },
  },
];

export { data };
