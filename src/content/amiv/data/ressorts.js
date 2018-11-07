// Contains static information about our ressorts.
// Markdown can be used to style the text.

import kulturImage from '../images/ressorts/kultur.png';
import itImage from '../images/ressorts/it.jpg';

const data = [
  {
    name: 'Designteam',
    email: 'design@amiv.ethz.ch',
    phone: '+41 44 632 42 45',
    description: {
      en: 'Not a real description.',
      de: 'Keine echte Beschreibung',
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
