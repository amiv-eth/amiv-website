// Contains static information about the current board.
// Markdown can be used to style the text.

import { boardRoles } from './board_roles';

import boardImage from '../images/board/Board.jpg';
import presidentImage from '../images/board/Antonia.jpg';
import quaestorImage from '../images/board/Luzian.jpg';
import kulturImage1 from '../images/board/Betty.jpg';
import kulturImage2 from '../images/board/Ian.jpg';
import kulturImage3 from '../images/board/Max.jpg';
import erImage1 from '../images/board/Leon.jpg';
import erImage2 from '../images/board/Silvio.jpg';
import hopoImageITET from '../images/board/Lioba.jpg';
import hopoImageMAVT from '../images/board/Julia.jpg';
import informationImage from '../images/board/Patricia.jpg';
import infrastructureImage from '../images/board/Lukas.jpg';
import itImage from '../images/board/IT.jpg';

const boardPortraits = [
  {
    image: presidentImage,
    showRoles: true,
    portraits: [
      {
        role: boardRoles.president,
        name: 'Antonia Mosberger',
        description: {
          de:
            '"Ich nehme die Wahl an". So begann die neue Ära des AMIV: Antonia ist die neue Präsidentin. Sie hat das geschafft, von was Hillary Clinton träumt. Sie kommt aus sehr harten Verhältnissen: musste sie sich als Infrastruktur-Vorstand von gefühlt 5-Jährigen Studenten immer das Gleiche anhören: Wo hast du Bier ? Wann gibt es wieder Bier ? Doch dieses internationale Bootcamp hat sie nur stärker gemacht. So kann sie jetzt ihre fröhliche, liebenswerte und lebensfreudige Art dafür nutzen, dass der AMIV auf Kurs bleibt und sich in vielen Bereichen erweitert. Vergisst Angela Merkels Hand- Raute. Jetzt gibt es nur noch ein Symbol: Die lockigen Haare.',
        },
      },
    ],
  },
  {
    image: quaestorImage,
    showRoles: true,
    portraits: [
      {
        role: boardRoles.quaestor,
        name: 'Luzian Bieri',
        description: {
          de: `Seine Anfänge im AMIV hatte Luzi bereits am ESW. Schnell war klar, dass er für den AMIV wie geschaffen war (sein Kürzel ist luziBIER, for real?!). Er trat der Brauko bei und wurde Kulturi der Leiden (schafft), womit er sich im AMIV schnell einen Namen machte. Auch der Kontakt drückt er als PR Verantwortlicher seinen Stempel auf und meistert diese Aufgabe mit Bravour und einer unglaublicher Effizienz, wie man sie von einem Berner kaum gewohnt ist.

            Doch das war Luzi noch alles nicht genug, weshalb er sich zusätzlich den Posten als Quästor des AMIV aufhalste. Dies alles führt dazu, dass Luzi 24/7 im Büro anzutreffen ist und schon fast zum Inventar gehört. Man munkelt dass er immer wieder seine pyromaische Ader auslebt und allen möglichen Materialien einem Feuertest unterzieht, weshalb zu hoffen ist, dass das Büro Luzis Amtszeit übersteht.`,
        },
      },
    ],
  },
  {
    image: itImage,
    showRoles: true,
    portraits: [
      {
        role: boardRoles.it,
        name: '',
        description: {
          de:
            'Da leider niemand gefunden wurde, ist der Posten dieses Semester vakant. Silvio Geel übernimmt in Zusammenarbeit mit Sandro Lutz und dem IT-Team die wichtigsten Aufgaben, bis jemand gefunden wird.',
        },
      },
    ],
  },
  {
    image: informationImage,
    showRoles: true,
    portraits: [
      {
        role: boardRoles.information,
        name: 'Patricia Schmid',
        description: {
          de:
            '«In einem Jahr bin ich Präsidentin von diesem Saftladen!» Hat nicht so schon manche gute Geschichte angefangen? Ok… vielleicht auch nicht… Die von Patricia jedenfalls schon. Nach dem ESW – wo eben diese Geschichte ihren Lauf begann – engagierte sich Patricia vor allem im Kulturteam.  Fragt man Patricia, beginnt die Geschichte eigentlich schon viel früher: Und zwar, als sie im schönen Obwalden aufwuchs, die Ausrede «ich musste die Kühe meines Nachbars einfangen» noch zählte und man den Test wiederholen konnte, wenn man die Bedeutung von Plus und Minus verwechselt hatte. Anyway… Nebstdem sie, mit viel Freude an der Reichweite, den Amiv-Instagram-Account unterhält, ist sie noch Infovorstand und euer Ansprechpartner für alles Mögliche.',
        },
      },
    ],
  },
  {
    image: kulturImage1,
    showRoles: true,
    portraits: [
      {
        role: boardRoles.eventPlanning,
        name: 'Betty Lory',
        description: {
          de:
            'Schon in ihrem ersten Jahr an der ETH im Studiengang HST wurde Betty von Kollegen mit ins AMIV-Büro geschleift und lernte so den besten Fachverein der ETH kennen. Trotz erfolgreich bestandener Basisprüfung wechselte sie ins Elektrotechnik-Studium und nahm an zahlreichen Amiv-Events teil. Sicher auch deshalb liess sie sich 5 Tage vor der GV noch dazu überzeugen, Kulturvorstand zu werden. Wenn neben dem Studium und dem AMIV noch Zeit bleibt, trifft man Betty sicher im Papperlapub an.',
        },
      },
    ],
  },
  {
    image: kulturImage2,
    showRoles: false,
    portraits: [
      {
        role: boardRoles.eventPlanning,
        name: 'Ian Boschung',
        description: {
          de:
            'Ian ist seit seinem ersten Semester Kulturi aus Leidenschaft. Mit seiner Begeisterung für seinen absoluten Lieblingsevent, die Weindegu (Als fast-Welscher ist Wein halt eine Herzenssache), erinnerte er so stark an andere Kulturvorstände vergangener Tage, dass seine Nomination nur der nächste logische Schritt war. Ians Qualitäten als organisierter Planer und Teamplayer machen ihn zu einer Idealbesetzung für den nun dreiköpfigen Kulturvorstandsposten. Der einzige Nachteil: niemand versteht seinen Dialekt, und schon gar nicht seine Nachrichten!',
        },
      },
    ],
  },
  {
    image: kulturImage3,
    showRoles: false,
    portraits: [
      {
        role: boardRoles.eventPlanning,
        name: 'Max Aspect',
        description: {
          de: `Ein ungewöhnlicher Weg führte Max nach Zürich. Mr. Cosmopolitan ist in Paris geboren, hat in Düsseldorf den Kindergarten besucht, wieder zurück in Paris das französische Schulsystem getestet und zu guter Letzt in Zürich die Schule abgeschlossen.
            
            Angekommen an der ETH führte für den Kultri aus Leidenschaft kein Weg am AMIV vorbei. Schnell gab es kaum eine Kommission im AMIV die noch vor Max sicher war. Sein Engagement beim Blitz, Braukommission, Irrational Co., EESTEC und RandomDudes dienten ihm als perfekte Vorbereitung für seine Aufgaben als Kulturvorstand. Es ist erstaunlich, dass er neben all diesen Tätigkeiten sogar ab und zu noch Zeit für sein Maschinenbaustudium findet.`,
        },
      },
    ],
  },
  {
    image: hopoImageITET,
    showRoles: true,
    portraits: [
      {
        role: boardRoles.universityPolicy,
        name: 'Lioba Heimbach',
        description: {
          de:
            'Lioba hat den Posten des Hopo Vorstands für ITET übernommen. Sie ist eine sehr nette ITET’lerin die immer wieder ein Lächeln auf die Gesichter unserer Bürobewohner zaubert. Ihr grösstes Hobby ist das Reisen und sie präferiert exotische Cocktails über Bier. Wenn sie nicht gerade im Büro ist, ist Lioba des Öfteren, der Jusbibliothek anzutreffen. Lioba wurde in Emails des wiederholt mit der falschen Anrede angeschrieben. Sie hat es nun satt immer als Mann angeschrieben zu werden setzt sie sich nun stark für die Gleichberechtigung im Mailverkehr ein.',
        },
      },
    ],
  },
  {
    image: hopoImageMAVT,
    showRoles: true,
    portraits: [
      {
        role: boardRoles.universityPolicy,
        name: 'Julia Jäggi',
        description: {
          de: `Seit Julia mit dem Maschinenbaustudium an der ETH angefangen hatte, engagierte sie sich tatkräftig beim HoPo-MAVT-Team. Dort hat sie zu vielen Themen eine gut überlegte Meinung und scheut auch nicht, diese zu vertreten. Während ihrem Basisjahr organisierte sie zahlreiche PVKs und arbeitete sich in diverse Gremien ein. Nach erfolgreichem Basisjahr traf Julia die einzige richtige Entscheidung und wurde Vorstand des HoPo-MAVTs. Wenn Julia nicht gerade in der Vorlesung HoPo-Angelegenheiten regelt, ist sie bestimmt mit ihrem Hund unterwegs, am Wandern im Engadin oder am Skifahren.

            Mit einem Bier aus dem guten alten Bierautomat in der Hand wird man Julia jedoch nie sehen und bei Sitzungen geht ihr Magen oft leer aus. All das, weil Julia gluten-intolerant ist. Von diesem Rückschlag lässt sie sich jedoch nicht unterkriegen und Julia ist oft bei geselligen Anlässen anzutreffen.`,
        },
      },
    ],
  },
  {
    image: erImage2,
    showRoles: true,
    portraits: [
      {
        role: boardRoles.externalRelations,
        name: 'Silvio Geel',
        description: {
          de: `Silvio kam an seinem Ersti-Weekend zum ersten Mal mit dem amiv in Kontakt. Danach galt es zunächst die Basisprüfung zu bestehen. Als Einstiegsdroge entpuppte sich dann im 3. Semester die Braukommission. Silvio arbeitete sich stetig empor. Vom normalen Brauko-Mitglied zum Vizepräsidenten bis er schliesslich diesen Winter zum Braumeister gewählt wurde.

            Als Infrastrukturverantwortlicher für die Firmenmesse Kontakt.17 lernte Silvio auch das Ressort External Relations kennen. Als ER-Vorstand bemüht er sich mehr Stabilität in das Sponsoring zu bringen und versucht mit Qi zusammen das Ressort für die Zukunft umzustrukturieren.
          
            Parallel zur amiv Laufbahn studiert Silvio Elektrotechnik. Nach ein paar Rückschlägen hat er alle Blöcke bestanden und befindet sich kurz vor dem Bachelorabschluss.

            Vor allem die Vertiefung im Bereich Kommunikation hat es ihm angetan.`,
        },
      },
    ],
  },
  {
    image: erImage1,
    showRoles: true,
    portraits: [
      {
        role: boardRoles.externalRelations,
        name: 'Leon Hinderling',
        description: {
          de:
            'Man kann sich darüber streiten, welcher ER Vorstand die prominentere Frisur hat, diese Frage soll hier aber auch gar nicht ausdiskutiert werden. Was allerdings klar ist: Leon ist voll an seinem Platz angekommen. Seit dem Beginn seiner ETH-"Karriere" ist er im Aufenthaltsraum anzutreffen und bringt seine Legi zum dampfen. Immer gemütlich und gechillt führt er nun das ER Team als amiv Vorstand, nachdem er so lange mit dabei war. Seinen Platz auf dem Sofa im Aufenthaltsraum hat er gegen ein Sofa im Büro ausgetauscht. Und wie  es isch für einen wahren Sparfuchs gehört  steht an seinem neuen Arbeitsplatz seine eigene Palette Mate.',
        },
      },
    ],
  },
  {
    image: infrastructureImage,
    showRoles: true,
    portraits: [
      {
        role: boardRoles.infrastructure,
        name: 'Lukas Eberle',
        description: {
          de: `Anfangs schien es dem Landburschen Lukas gar nicht zu gefallen an der ETH: wenn es ihm mal wieder zu stressig wird, träumt er laut von einem chilligen Leben an der PH (je nach Tagesform auch von einer Karriere als Curlingprofi oder davon, die nächstbeste Dorfbank zu übernehmen). Doch seit der Übernahme der Infrastruktur scheint er angekommen zu sein; es gibt schliesslich kein befriedigenderes Gefühl als einen vollen Bierautomat und glückliche Studenten mit einer Hülse in der Hand.

            Am meisten freut sich Lukas darauf, sein ganzes Budget im Metzgereizentrum für Grillzubehör auszugeben, damit der amiv seine grösste Stärke weiter ausbauen kann: Bier-und-Wurst-Events!`,
        },
      },
    ],
  },
];

export { boardPortraits, boardImage };
