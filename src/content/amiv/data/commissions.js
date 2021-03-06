// Contains static information about our commissions.
// Markdown can be used to style the text.

import bastliImage from '../images/commissions/bastli.png';
import blitzImage from '../images/commissions/blitz.jpg';
import emc2Image from '../images/commissions/emc2.jpg';
import irrationalImage from '../images/commissions/irrational.jpg';
import kontaktImage from '../images/commissions/kontakt.jpg';
import randomDudesImage from '../images/commissions/randomdudes.jpg';
import limesImage from '../images/commissions/limes.jpg';
import braukoImage from '../images/commissions/brauko.jpg';
import eestecImage from '../images/commissions/eestec.png';
import funkbudeImage from '../images/commissions/funkbude.jpg';

import icons from '../../../images/icons';

const data = [
  {
    name: 'Bastli',
    image: bastliImage,
    contact: [
      {
        icon: icons.earth,
        label: 'bastli.ethz.ch',
        url: 'https://bastli.ethz.ch',
      },
      {
        icon: icons.email,
        label: 'info@bastli.ethz.ch',
        url: 'mailto:info@bastli.ethz.ch',
      },
      {
        icon: icons.phone,
        label: '+41 44 632 49 41',
        url: 'tel:+41 44 632 49 41',
      },
    ],
    description: {
      en: `The eletronics laboratory is open for UZH and ETH students offering material and workspaces to make your projects and build your ideas.

        We are happy to help you. No prior knowledge is needed. The main thing is that you enjoy building things.

        The opening hours for our electronic components shop can be found on our website.

        We are always looking for people. If you want to learn more, just drop by the workshop or write us an email.`,
      de: `Das Elektroniklabor des AMIV von und für ETH / UZH Studierende bietet Euch kostenlose Arbeitsplätze und Werkzeuge um eure eigenen Projekte und Ideen umzusetzen.

        Wir sind für alle da und helfen euch gerne. Vorkenntnisse werden keine benötigt, Hauptsache ihr habt Spass daran Dinge zu bauen.

        Die Öffnungszeiten von unserem Bauteile-Shop findest du auf unserer Webseite.

        Wir sind stetig auf der Suche nach neuen Mitgliedern. Wenn du mehr erfahren möchtest, komm einfach mal im Bastli vorbei oder schreib uns eine E-Mail.`,
    },
  },
  {
    name: 'Blitz',
    image: blitzImage,
    contact: [
      {
        icon: icons.earth,
        label: 'blitz.ethz.ch',
        url: 'https://blitz.ethz.ch',
      },
      {
        icon: icons.email,
        label: 'info@blitz.ethz.ch',
        url: 'mailto:info@blitz.ethz.ch',
      },
    ],
    description: {
      en: `The amiv commission named blitz publishes the magazine of the student’s association of the same name every second week. Therein you find interesting articles about current events, information around mechanical engineering and electrical engineering, riddles and much more.

        We are always looking for students who write articles, create riddles, help distribute the blitz or help otherwise. You can contribute one-time, in irregular time intervals or join our team. Do you feel appealed to? Write us an email to praesident@blitz.ethz.ch. Weare  looking forward to getting to know you!`,
      de: `Die amiv Kommission blitz gibt alle zwei Wochen die gleichnamige Fachvereinszeitschrift heraus. In dieser findet ihr interessante Artikel zu aktuellen Ereignissen, Informationen rund um Maschinenbau und Elektrotechnik, Rätsel und vieles mehr.

        Wir suchen immer Studenten, die Artikel schreiben, Rätsel entwerfen, helfen den blitz zu verteilen oder sonst wie mithelfen. Du kannst einmalig oder unregelmässig etwas beitragen oder gerne auch bei uns im Team mitmachen. Du fühlst dich angesprochen? Dann schreib uns eine E-Mail an praesident@blitz.ethz.ch. Wir freuen uns darauf, dich kennenzulernen!`,
    },
  },
  {
    name: 'Braukommission',
    image: braukoImage,
    email: 'amivbraeu@amiv.ethz.ch',
    contact: [
      {
        icon: icons.calendar,
        label: {
          en: 'Brewing Calendar',
          de: 'Braukalender',
        },
        url: 'https://cloud.amiv.ethz.ch/index.php/apps/calendar/p/qJerTAw9TKLe6xtY/Braukommission',
      },
      {
        icon: icons.instagram,
        label: 'Instagram: amivbrau',
        url: 'https://www.instagram.com/amivbrau/',
      },
      {
        icon: icons.email,
        label: 'amivbraeu@amiv.ethz.ch',
        url: 'mailto:amivbraeu@amiv.ethz.ch',
      },
    ],
    description: {
      en: `The brewing commission supplies the AMIV with handcrafted beers. From 
      grains to bottling we perform all process steps right here in the CAB 
      building.

        Over the years we evolved from kitchen equipment on gas flames into a 
      proper microbrewery with an half automated set up. We brew on a Speidel 
      Braumeister 200 approximately twice a month.

        If you want to know more about us or feel thirsty for some really good 
      beer drop in on the next brewing event or write us a mail!`,
      de: `Die Braukommission versorgt den AMIV mit hauseigenem Bier. Wir nehmen 
      dabei jeden Schritt der zum Bierbrauen gehört selber in die Hand.

        Von den ehemaligen Töpfen auf Gasbrennern hat die Braukommission sich 
      schon lange weiter entwickelt zu einer Art Microbrauerei mit 
      halbautomatisierter Brauanlage. Wir brauen in einem Speidel Braumeister 
      200 und das etwa alle zwei Wochen.

        Falls du mehr über uns und wie man Bier herstellt wissen willst oder 
      einfach nur Lust auf ein richtig gutes Bier hast, dann komm doch beim 
      nächsten Braugang einfach vorbei oder schreib uns eine Mail!`,
    },
  },
  {
    name: 'Irrational Co.',
    image: irrationalImage,
    contact: [
      {
        icon: icons.email,
        label: 'irrational@amiv.ethz.ch',
        url: 'mailto:irrational@amiv.ethz.ch',
      },
      {
        icon: icons.phone,
        label: '+41 76 437 68 37',
        url: 'tel:+41 76 437 68 37',
      },
    ],
    description: {
      en: `Irrational Coffee is an AMIV commission dedicated to spreading alternative coffee culture.
        If you are interested in learning more about different coffee beans, processing techniques, brewing methods, or anything coffee-related, then this is the place for you!

        **Every Friday 12:00-14:00**, come out to the CAB courtyard where you can taste different coffees and cascara tea at our coffee stand.

        Irrational Coffee also organizes coffee workshops and other coffee-related events, such as trips and coffee «pub crawls». `,
    },
  },
  {
    name: 'EESTEC',
    image: eestecImage,
    contact: [
      {
        icon: icons.earth,
        label: 'eestec.ch',
        url: 'https://eestec.ch',
      },
      {
        icon: icons.email,
        label: 'contact@eestec.ethz.ch',
        url: 'mailto:contact@eestec.ethz.ch',
      },
    ],
    description: {
      en:
        `EESTEC is the Electrical Engineering STudents’ assoCiation and spans over 50 different cities! Being both a commision of AMIV and a branch of EESTEC International, LC Zurich not only organizes shorter local events but also week-long international events!

Do you want to travel, meet people from different cultures, and improve yourself - while keeping everything on a low cost? Or do you want to help organize memorable events here in Zurich while having the time of your life? Write an email, check out our website, or simply drop by ;)`,
      de:
        `EESTEC ist die “Electrical Engineering STudents’ assoCiation” und ist in über 50 Städten vertreten! Als Kommission des AMIVs und Teil von EESTEC International organisiert LC Zurich nicht nur lokale Events, sondern auch bis zu einwöchige Internationale Events.

Willst du reisen, Leute aus unterschiedlichen Kulturen und dich selber besser kennenlernen - und das Ganze mit einem Studentenbudget? Oder willst du mithelfen unvergessliche Events hier in Zürich zu organisieren und währenddessen dem Studienalltag entfliehen? Dann schreibe eine E-Mail, schau dir unsere Webseite an oder komme einfach vorbei ;)`,
    },
  },
  {
    name: 'Funkbude',
    image: funkbudeImage,
    contact: [
      {
        icon: icons.earth,
        label: 'hb9zz.ethz.ch',
        url: 'https://hb9zz.ethz.ch',
      },
      {
        icon: icons.email,
        label: 'funkbude@amiv.ethz.ch',
        url: 'mailto:funkbude@amiv.ethz.ch',
      },
    ],
    description: {
      en:
        'The Funkbude is operating the radio shack on the roof of the ETZ building, which is well equipped.  This allows us to support almost all modulation schemes, from CW through SSB and the digital formats. We also work on interesting projects in the domain of wireless communication. To prepare you for the HB9 amateur radio exam, the Funkbude is providing an interesting course every autumn semester. We are open to all members and alumni of ETH.',
      de:
        'Die Funkbude betreibt die Amateurfunkstation auf dem ETZ-Dach. Der Shack - die Funkstation - ist bestens ausgerüstet. Vom klassischen Morsen bis hin zu den neuen digitalen Betriebsarten ist funktechnisch fast alles möglich. Daneben realisieren wir spannende Projekte aus dem Bereich der Funktechnik. Zur Vorbereitung auf die HB9 Amateurfunkprüfung bietet die Funkbude jedes Herbstsemester einen spannenden Vorbereitungskurs an. Wir sind offen für alle Angehörige und ehemalige der ETH.',
    },
  },
  {
    name: 'LIMES',
    image: limesImage,
    contact: [
      {
        icon: icons.earth,
        label: {
          en: 'LIMES Website',
          de: 'LIMES Webseite',
        },
        url: 'https://www.limes.ethz.ch/',
      },
      {
        icon: icons.email,
        label: 'limes@amiv.ethz.ch',
        url: 'mailto:limes@amiv.ethz.ch',
      },
    ],
    description: {
      en: `We **L**adies **i**n **M**echanical and **E**lectrical **S**tudies are the women’s committee of the AMIV. We organize different events to connect female students of ITET and MAVT and to network with industry partners.

        Our events are mainly addressed to female AMIV fellows. New Ladies in our main board are besides always welcome. But at our talk events, we are also always happy about male AMIV participants.

        _...because engineering knows no limits!_`,
      de: `Wir **L**adies **i**n **M**echanical and **E**lectrical **S**tudies sind die Frauenkommission des AMIV. Wir organisieren verschiedene Events um Studentinnen untereinander, aber auch mit Industriepartnern zu verknüpfen.

        Unsere Events sind hauptsächlich an AMIVlerinnen gerichtet. Neue Ladies im Vorstand sind ausserdem immer herzlich willkommen. Bei unseren Talk Events freuen wir uns aber auch immer über männliche Kommilitonen.

        _...because engineering knows no limits!_`,
    },
  },
  {
    name: 'Kontakt',
    image: kontaktImage,
    contact: [
      {
        icon: icons.earth,
        label: 'kontakt.amiv.ethz.ch',
        url: 'https://kontakt.amiv.ethz.ch',
      },
      {
        icon: icons.email,
        label: 'kontakt@amiv.ethz.ch',
        url: 'mailto:kontakt@amiv.ethz.ch',
      },
    ],
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
    name: 'RandomDudes',
    image: randomDudesImage,
    contact: [
      {
        icon: icons.facebook,
        label: 'AMIV-Gondel',
        url: 'https://www.facebook.com/amiv.gondel/',
      },
      {
        icon: icons.instagram,
        label: 'AMIV-Gondel',
        url: 'https://www.instagram.com/amiv_gondel/',
      },
      {
        icon: icons.email,
        label: 'randomdudes@amiv.ethz.ch',
        url: 'mailto:randomdudes@amiv.ethz.ch',
      },
    ],
    description: {
      en: `The Randomdudes form one of the more special commissions the amiv incorporates. Its main duties are sustaining knowledge within the amiv and to ensure the ridiculously generous opening hours of the amiv office. Most of our members are former board members and other friends of the gondola, which we care for and continuously improve.

      We also organize many events that make studying a little easier and especially more fun.`,
      de: `Die Randomdudes sind die wohl speziellste Kommission des AMIV. Vorrangig für den Wissenserhalt und generelle Anwesenheit im Büro zuständig, bestehen wir zum größten Teil aus ehemaligen Vorständen und freunden der Gondel, für dessen Pflege wir auch zuständig sind.

        Außerdem organisieren wir regelmäßig Events zur Bespaßung der Studentenschaft, um Euch den Studienalltag ein bisschen erträglicher zu machen.`,
    },
  },
  {
    name: 'E=MC^2',
    image: emc2Image,
    contact: [
      {
        icon: icons.facebook,
        label: 'Facebook: emc2eth',
        url: 'https://fb.me/emc2eth',
      },
      {
        icon: icons.email,
        label: 'emc2@amiv.ethz.ch',
        url: 'mailto:emc2@amiv.ethz.ch',
      },
    ],
    description: {
      en: `The Energy Master Chill Club is a student-run AMIV commission bringing together energy students across different years through all types of events (Fondue Night, BBQ, Ski Weekend, etc.).

        Our events are not just for MEST students, we encourage any and all students to join us!`,
      de: `Der Energy Master Chill Club ist eine studentische AMIV-Kommission, welche MEST-Studenten von allen Jahrgängen bei verschiedenen Events zusammenbringt (Fondueabend, BBQ, Skiwochenende, etc.).

        Unsere Event sind nicht exklusiv für MEST-Studenten, wir freuen uns über alle TeilnehmerInnen!`,
    },
  },
  {
    name: 'BEEZ',
    contact: [
      {
        icon: icons.email,
        label: 'beez@amiv.ethz.ch',
        url: 'mailto:beez@amiv.ethz.ch',
      },
    ],
    description: {
      en: `The Biomedical Engineering Student Association at ETH Zurich is a social group with members mostly studying in or graduated from Biomedical Engineering MSc. program. Our aim is to bring together young engineers in their studies and help maintain the crucial balance between work life and leisure.

        However, just as our academic program, we are open to students from various backgrounds. If you are interested in biomedical research AND having fun, follow us!`,
    },
  },
  {
    name: 'MNS',
    contact: [
      {
        icon: icons.email,
        label: 'mns@amiv.ethz.ch',
        url: 'mailto:mns@amiv.ethz.ch',
      },
    ],
    description: {
      en: 'The Micro- and Nanosystems (MNS) Commission brings together people interested in Microsystems and Nanotechnology by organizing events for prospective, current and former students and researchers at any level (BSc, MSc, PhD, postdoc…), as well as faculty members. During our events (e.g. dinners, apéros) you can learn about the Micro- and Nanosystems specialization (lectures, exams, research, internships) and perhaps find your supervisor/student for a bachelor, semester and master thesis. You will probably get a more realistic impression of the personality of your supervisor/student after a few drinks at the CLA rooftop than through a 10-minute office meeting or by scrolling through a research group’s website. If that sounds useful, or you just want to chat with your classmates over a pizza, do not hesitate to drop us a short email and we will put you on the mailing list for our upcoming events!',
    },
  },
];

export { data };
