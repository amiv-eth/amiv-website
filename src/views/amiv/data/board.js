// Contains static information about the current board.
// Markdown can be used to style the text.

import image from '../images/board/board.jpg';
import pqImage from '../images/board/pq.jpg';
import eventPlanningImage from '../images/board/eventPlanning.jpg';
import erImage from '../images/board/er.jpg';
import hopoImage from '../images/board/hopo.jpg';
import informationImage from '../images/board/information.jpg';
import infrastructureImage from '../images/board/infrastructure.jpg';
import itImage from '../images/board/it.jpg';

const data = [
  {
    image: pqImage,
    portraits: [
      {
        role: 'President',
        name: 'Aurel Neff',
        description: {
          de:
            'Da Innerrhoden schon fest in familiärer Hand ist, hat Aurel beschlossen den Westen zu infiltrieren und kam zur Tarnung an die ETH. Nach einem erfolgreichen Jahr als Kulturi und einem weiteren als Kulturvorstand hat Aurel es nun als Präsident ganz nach oben in der Hierarchie des AMIVs geschafft. Nach so langer Zeit im AMIV ist er allerdings übergelaufen und hat seine neue Heimat, das AMIV-Büro, voll und ganz akzeptiert. Nur die Liebe zum Jassen und der innerrhoder Dialekt ist ihm noch geblieben - das Nacktwandern konnten wir ihm bereits abgewöhnen.',
        },
      },
      {
        role: 'Quaestor',
        name: 'Patrick Wintermeyer',
        description: {
          de:
            'Geboren in Brasilien, aufgewachsen in Portugal, Deutschland, Frankreich und der Schweiz ist Patrick eine kosmopolitische Persönlichkeit. Mit jungen 17 Jahren führte sein Weg vor zwei Jahren an die ETH, um Elektrotechnik zu studieren. Nach der Basisprüfung wollte er sich ehrenamtlich engagieren und meldete sich auf eine Anzeige der Kontakt.17. Er wurde Quästor und Vizepräsident, bei der er freundlich, aber bestimmt, die Finanzen unter Kontrolle hielt. Um mehr Verantwortung zu übernehmen und um ein grösseres Budget zu verwalten, wurde er schlussendlich amiv Quästor. Ansonsten bereichert er uns mit seinen schnippischen, aber doch gut gemeinten Kommentaren.',
        },
      },
    ],
    tasks: {
      de: `
        Der Präsident ist für die Koordination der Arbeit des gesamten Vorstandes verantwortlich und repräsentiert den Fachverein nach aussen. Er beruft die Sitzungen und Generalversammlungen ein und delegiert die Arbeit an die einzelnen Ressorts. Er ist das Bindeglied zum Dachverband, dem VSETH.

        Der Quästor ist verantwortlich für die finanziellen Angelegenheiten des AMIV, namentlich für die Budgetierung und Rechnungsführung. Er verwaltet zudem die Vereinskonten und prüft die Rechnungen aller Kommissionen.`,
      en: `
        The president is responsible for coordinating the work of the entire board and represents the association to the outside world. He convenes the meetings and general assemblies and delegates the work to the individual departments. He is the link to the umbrella organization, the VSETH.

        The Quaestor is responsible for the financial affairs of AMIV, namely budgeting and accounting. He also manages the bank accounts of the association and checks the bills of all commissions.`,
    },
  },
  {
    image: itImage,
    portraits: [
      {
        role: 'IT',
        name: 'Sandro Lutz',
        description: {
          de:
            'Sandro ist der wohl erste IT-Vorstand, der keinen Kaffee trinkt. In seiner zweiten Amtszeit überschaut er einige grosse Informatikprojekte, darunter auch die seit vielen Jahren sehnlichst erwartete neue AMIV-Website und das neue PVK-Tool. Damit der AMIV auch in der Zukunft IT-mässig spitze bleibt, versucht er an den Coding-Days im Dezember, Nachwuchs für das IT-Team zu rekrutieren. Im 5. Semester des Elektrotechnikstudiums bleibt ihm trotz Gruppenarbeit genug Zeit um im Bastli tatkräftig an verschiedensten Projekten mitzuwerkeln.',
        },
      },
    ],
    tasks: {
      de:
        'Der IT Vorstand ist verantwortlich für alle Technik im AMIV. Dazu gehören zum Beispiel Webseite, Apps, Bierautomat, PVK Tool, Server, Workstations und die Organisation des Codingweekends. Alles was die Website angeht: webmaster@amiv.ethz.ch',
      en:
        'The head of IT is responsible for all technical stuff at AMIV. This includes maintaining the website, apps, beer dispenser, PVK tool, servers, workstations and leading the IT team. Everything regarding the website: webmaster@amiv.ethz.ch',
    },
  },
  {
    image: informationImage,
    portraits: [
      {
        role: 'Information',
        name: 'Mathis Dedial',
        description: {
          de:
            'Wie so viele Info-Vorstände vor ihm kam Mathis buchstäblich im letzten Moment aus der neugewonnen Leere des dritten ET-Studienjahres zum AMIV. Er bietet eine Idealbesetzung für den Job, sammelte er doch während zweier Jahre als "Customer Service Representative" bei Digitec zahlreiche Erfahrungen beim kompetenten Handling von Hate-Mails (Man munkelt über einen Schredder an seinem Druckerausgang). Seine Ziele für das kommende Jahr sind eine tadellose Kommunikation mit allen Organen der Universität, dem AMIV zum hottesten Instagram-Account 2k18 zu verhelfen und endlich mehr Likes als der VSETH abzustauben. Die Inspiration für neue, kreative Announce-Titel holt sich Mathis vor allem wenn ihm der Wind beim Motorradfahren um die Ohren bläst.',
        },
      },
    ],
    tasks: {
      de:
        'Der Informationsvorstand koordiniert diverse Informationskanäle wie die Announce, Facebook und die gute alte Homepage, und stellt sicher, dass alle Studenten gut über des Geschehen in und um ihren Lieblingsverein informiert bleiben. Nicht zuletzt gehört auch das pflichtbewusste Beantworten von allem, was am Ende des Tages im info@amiv.ethz.ch Postfach übrigbleibt, dazu. Ausserdem leitet er das Design-Team, welches sich um das ganze AMIV Werbematerial kümmert.',
      en:
        'The head of communications coordinates various information channels such as the Announce, Facebook and the good old website, and ensures that all students stay well informed about the events in and around their favorite association. Last but not least, dutifully answering everything that remains at the end of the day in the info@amiv.ethz.ch mailbox is part of it. He also leads the design team, which takes care of the entire AMIV advertising material.',
    },
  },
  {
    image: eventPlanningImage,
    portraits: [
      {
        role: 'Event Planning',
        name: 'Kira Erb',
        description: {
          de: `
            Mit einer frischen Matura in der Tasche kam Kira letztes Jahr an die ETH und somit in den amiv. Schon nach der ersten Woche und dem Erstiweekend hatte Kira sich bei den alten amiv-Hasen ins Gedächtnis gesetzt. Und genau so wie ihre amiv-Karriere begonnen hat, machte sie auch weiter. Schon im Herbstsemester organisierte Kira einige Events, welche sich durch eine Neigung zum Kulinarischen auszeichneten. Im Sommersemester wurden Kiras Events immer grösser und ihre Einsatz rundete sich schlussendlich mit der Absolventenparty ab.

            Nachdem Kira im Sommer ‘17 ihre Basisprüfung, für amiv Verhältnisse, ausserordentlich gut bestanden hatte, tat sie das einzig Richtige. Sie hat sich dazu entschieden dem amiv und seinen fleissigen Eventbesuchern durch den Posten als Kulturvorstand noch mehr Zuwendung zu schenken.`,
        },
      },
      {
        role: 'Event Planning',
        name: 'Lina Gehri',
      },
    ],
    tasks: {
      de:
        'Neben einem anspruchsvollen und zeitintensivem Studium, das die ETH bekanntlich mit sich bringt, kommt das Sozialleben oft zu kurz. Deswegen geht das Ressort Kultur der Aufgabe nach, den Studenten ein abwechslungsreiches Freizeitangebot zu bieten. Die Kulturis organisieren diverse Veranstaltungen, bei denen unsere Mitglieder die Möglichkeit haben, sich gegenseitig kennenzulernen. Seit einem Jahr werden die Kultur-Vorstände vom Kulturteam bei der Event-Organisation unterstützt. In diesem Team kann jeder mitmachen, der Lust dazu hat. Zudem gibt es je nach Event noch zahlreiche Helfer, um alle anfallenden Arbeiten zu bewältigen. Interessenten melden sich bitte unter kultur@amiv.ethz.ch',
    },
  },
  {
    image: hopoImage,
    portraits: [
      {
        role: 'University Policy',
        name: 'Tino Gfrörer',
        description: {
          de: `
            Tino ist momentan in seinem 5. Semester des Elektrotechnik Bachelors an der ETH. Falls ihr euch manchmal wundert wer gerade im Aufenthaltsraum gerade so rum singt, wisst ihr nun bescheid… Tino benutzt seine Stimme nicht nur um die ITET Studenten Optimal zu vertreten, sondern auch um die allgemeine Stimmung der total überforderten Studenten etwas in die Höhe zu treiben.

            Außerdem kann man sich mit ihm auch noch schön vom Alltag ablenken wenn man gerade so einige Reisetipps sucht. Da er 3 Jahre in Singapur gelebt hat kennt er sich mit dem Thema Ausland ziemlich gut aus.`,
        },
      },
      {
        role: 'University Policy',
        name: 'Johannes Schretter',
      },
    ],
    tasks: {
      de:
        'An der ETH haben die Studenten sehr viele Mitspracherechte – vielleicht mehr, als man gemeinhin so denkt. Die Hochschulpolitiker engagieren sich dabei (zusammen mit einem HoPo-Team pro Departement) in den Departements- und Unterrichtskonferenzen der beiden vom AMIV abgedeckten Departementen. Zudem sind sie Ansprechpartner für alle möglichen Studiumsbezogenen Fragen, organisieren Prüfungsvorbereitungskurse und führen Vorlesungs-Evaluationen mittels Semestersprechern sowie Tutorenabende für Studenten aus den tieferen Semestern durch. Hast du Fragen oder Anregungen? Melde dich ganz unverbindlich beim entsprechenden HoPo-Team unter  hopo-itet@amiv.ethz.ch oder hopo-mavt@amiv.ethz.ch',
    },
  },
  {
    image: erImage,
    portraits: [
      {
        role: 'External Relations',
        name: 'Silvio Geel',
      },
      {
        role: 'External Relations',
        name: 'Shuaixin	Qi',
      },
    ],
    tasks: {
      de:
        'Die Mitglieder des Ressorts External Relations bauen neue Kontakte zur Wirtschaft auf und pflegen bereits vorhandene. Hauptaufgabe ist die Beschaffung von Sponsoringgeldern und der Informationsaustausch zwischen Industrie und Studenten – um Mehrwert für die Studenten zu schaffen. Zusammen mit dem Präsidenten sind die Vorstände dieses Ressorts das Gesicht des AMIV nach aussen. Ausserdem organisieren sie jeweils im Herbstsemester die grosse AMIV Firmenkontaktmesse «AMIV Kontakt». Um auch während dem Semester interessante Exkursionen anbieten zu können, sind die beiden auf externe Mithilfe angewiesen. Hast du Lust, das ER-Team im Bereich Exkursionen, Kontakt oder Sponsoring zu unterstützen? Dann melde dich kurz unter  kontakt@amiv.ethz.ch',
    },
  },
  {
    image: infrastructureImage,
    portraits: [
      {
        role: 'Infrastructure',
        name: 'Antonia Mosberger',
        description: {
          de:
            'Um das ohnehin nicht sehr langweilige dritte Semester des Maschinenbaustudiums noch ein bisschen herausfordernder zu gestalten, entschloss sich Antonia neben ihrer Tätigkeit als Hilfsassistentin noch den traditionsreichen Posten des Infrastruktur-Vorstands zu übernehmen. Sie ist damit die Hausherrin aller AMIV-Räume und sorgt überall für Sauberkeit und Ordnung. Als Nachfolgerin von Luca hat sie zwar in grosse (und alkoholhaltige) Fussstapfen zu treten, meistert jedoch ihre Rolle mit ihrer charmanten Art perfekt. Zu ihren Tätigkeiten gehört unter anderem auch, dass die Studierenden ihr tägliches wachhaltendes Lebenselixier bekommen: Sie befüllt den Bierautomaten im Aufenthaltsraum.',
        },
      },
    ],
    tasks: {
      de:
        'Antonia ist für sämtliche Räumlichkeiten des AMIV und der darin enthaltenen, dem Verein gehörenden, Einrichtung und deren Zustand verantwortlich. Die Gestaltung und Zuordnung im Kulturraumes, Regeln für den Aufenthaltsraum und die Getränkeversorgung beanspruchen die meiste Zeit ihrer Tätigkeit als Vorstand. Es freut sie jeweils, wenn sie sieht, wie AMIVler denn Müll trennen und sich um Ordnung und Sauberkeit bemühen. Für sämtliche Anliegen, Anreize und Ideen hat sie stets ein offenes Ohr und freut sich auf eine Mail von euch. infrastruktur@amiv.ethz.ch',
    },
  },
];

export { data, image };
