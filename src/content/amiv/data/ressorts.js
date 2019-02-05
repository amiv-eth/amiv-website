// Contains static information about our ressorts.
// Markdown can be used to style the text.

import kulturImage from '../images/ressorts/kultur.png';
import itImage from '../images/ressorts/it.jpg';
import designImage from '../images/ressorts/design.jpg';
import icons from '../../../images/icons';

const data = [
  {
    name: 'Kulturteam',
    image: kulturImage,
    contact: [
      {
        icon: icons.email,
        label: 'kultur@amiv.ethz.ch',
        url: 'mailto:kultur@amiv.ethz.ch',
      },
      {
        icon: icons.phone,
        label: '+41 44 632 42 45',
        url: 'tel:+41446324245',
      },
    ],
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
    contact: [
      {
        icon: icons.email,
        label: 'hopo-mavt@amiv.ethz.ch',
        url: 'mailto:hopo-mavt@amiv.ethz.ch',
      },
      {
        icon: icons.phone,
        label: '+41 44 632 42 45',
        url: 'tel:+41446324245',
      },
    ],
    description: {
      en: '_No description available._',
      de: '_Keine Beschreibung verfügbar._',
    },
  },
  {
    name: 'HoPo ITET',
    contact: [
      {
        icon: icons.email,
        label: 'hopo-itet@amiv.ethz.ch',
        url: 'mailto:hopo-itet@amiv.ethz.ch',
      },
      {
        icon: icons.phone,
        label: '+41 44 632 42 45',
        url: 'tel:+41446324245',
      },
    ],
    description: {
      en: `The task of the student representation team at D-ITET is to represent its students with respects to Professors and the Department. This means, among others, contributing in teaching commission and department conference but also organizing information events for students.

        Are you interested in how teaching is organized at D-ITET? Do you want to bring in your ideas and opinions on current questions? Then do not hesitate to contact us!`,
      de: `Das HoPo ITET Team vertritt die Studenten gegenüber den Professoren und dem D-ITET. Das beinhaltet unter anderem die Teilnahme an Gremien wie der Departements- und Unterrichtskommission, oder die Organisation von Informationsevents und Prüfungsvorbereitungskursen für Studenten.

        Interessierst du dich für Hochschulpolitische Themen? Oder hast du ein Anliegen, welches du angehen möchtest? Dann melde dich unverbindlich bei uns, wir freuen uns auf dich!`,
    },
  },
  {
    name: 'Designteam',
    image: designImage,
    contact: [
      {
        icon: icons.email,
        label: 'design@amiv.ethz.ch',
        url: 'mailto:design@amiv.ethz.ch',
      },
      {
        icon: icons.phone,
        label: '+41 44 632 42 45',
        url: 'tel:+41446324245',
      },
    ],
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
    name: 'IT Team',
    image: itImage,
    contact: [
      {
        icon: icons.earth,
        label: 'gitlab.ethz.ch/amiv',
        url: 'https://gitlab.ethz.ch/amiv',
      },
      {
        icon: icons.email,
        label: 'it@amiv.ethz.ch',
        url: 'mailto:it@amiv.ethz.ch',
      },
      {
        icon: icons.phone,
        label: '+41 44 632 42 45',
        url: 'tel:+41446324245',
      },
    ],
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
    name: 'ER Team',
    contact: [
      {
        icon: icons.email,
        label: 'er@amiv.ethz.ch',
        url: 'mailto:er@amiv.ethz.ch',
      },
      {
        icon: icons.phone,
        label: '+41 44 632 42 45',
        url: 'tel:+41446324245',
      },
    ],
    description: {
      en: `The External Relation team is doing the link between the AMIV and the industry world. Our main activities are to organise excursion to the companies, industry talks, etc. One of the major aspects of the ER is to find sponsors to lower the price of the events.

        If you are interested in being in touch with companies and do some networking or if you have a brilliant idea to get more sponsors for the event, do not hesitate to write us.`,
      de: `Das Resort External Relations ist das Bindeglied zwischen dem AMIV und der Arbeitswelt. Unsere Aufgaben sind Exkursionen und Vorträge mit Firmen zu organisieren. Unsere Hauptaufgabe ist Sponsoren für die Kulturevents zu finden, damit sie durchgeführt werden können.

        Falls du Interesse hast mit Firmen in Kontakt zu kommen und dir ein Netzwerk aufbauen willst oder wenn du eine Idee hast, wie man weitere Sponsoren für Events gewinnen kann, zögere nicht dich bei uns zu melden.`,
    },
  },
];

export { data };
