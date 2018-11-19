// Contains static information about the current board.
// Markdown can be used to style the text.

import boardImage from '../images/board/board.png';
import presidentImage from '../images/board/president.png';
import quaestorImage from '../images/board/quaestor.png';
import kulturImage from '../images/board/kultur.png';
import erImage from '../images/board/er.png';
import hopoImage from '../images/board/hopo.png';
import informationImage from '../images/board/information.png';
import infrastructureImage from '../images/board/infrastructure.png';
import itImage from '../images/board/it.png';

const boardPortraits = [
  {
    image: presidentImage,
    portraits: [
      {
        role: 'President',
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
    portraits: [
      {
        role: 'Quaestor',
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
    portraits: [
      {
        role: 'IT',
        name: 'Sandro Lutz',
        description: {
          de:
            'Sandro ist der wohl erste IT-Vorstand, der keinen Kaffee trinkt [edit: mittlerweile schon, aber selbstverständlich nur fancy Tannenbar-Kaffee]. In seiner dritten Amtszeit überschaut er einige grosse Informatikprojekte, darunter auch die seit vielen Jahren sehnlichst erwartete neue AMIV-Website und das neue PVK-Tool. Damit der AMIV auch in der Zukunft IT-mässig spitze bleibt, versucht er an den Coding-Days im Dezember, Nachwuchs für das IT-Team zu rekrutieren. Im 6. Semester des Elektrotechnikstudiums bleibt ihm trotz Gruppenarbeit genug Zeit um im Bastli tatkräftig an verschiedensten Projekten mitzuwerkeln.',
        },
      },
    ],
  },
  {
    image: informationImage,
    portraits: [
      {
        role: 'Information',
        name: 'Patricia Schmid',
        description: {
          de:
            '«In einem Jahr bin ich Präsidentin von diesem Saftladen!» Hat nicht so schon manche gute Geschichte angefangen? Ok… vielleicht auch nicht… Die von Patricia jedenfalls schon. Nach dem ESW – wo eben diese Geschichte ihren Lauf begann – engagierte sich Patricia vor allem im Kulturteam.  Fragt man Patricia, beginnt die Geschichte eigentlich schon viel früher: Und zwar, als sie im schönen Obwalden aufwuchs, die Ausrede «ich musste die Kühe meines Nachbars einfangen» noch zählte und man den Test wiederholen konnte, wenn man die Bedeutung von Plus und Minus verwechselt hatte. Anyway… Nebstdem sie, mit viel Freude an der Reichweite, den Amiv-Instagram-Account unterhält, ist sie noch Infovorstand und euer Ansprechpartner für alles Mögliche.',
        },
      },
    ],
  },
  {
    image: kulturImage,
    portraits: [
      {
        role: 'Event Planning',
        name: 'Lina Gehri',
        description: {
          de:
            'Am Erstiweekend hat Lina das erste Mal AMIV-Luft geschnuppert und rutschte dann in ihrem Basisjahr immer tiefer hinein. Im den letzten zwei Semester war sie unter anderem mit der Organisation des Speeddatings, für die Verbreitung von Liebe zuständig. Nach einem bestandenen Basisjahr und einem guten halben Jahr Brainwashing entschied sie sich dazu, als Kulturvorstand zusammen mit Kira (vermutlich das erste Mal in der Geschichte des AMIV, dass beide Kulturvorstände Frauen sind...) dafür zu sorgen, dass weiterhin geile Events zustande kommen.',
        },
      },
      {
        role: 'Event Planning',
        name: 'Ian Boschung',
        description: {
          de:
            'Ian ist seit seinem ersten Semester Kulturi aus Leidenschaft. Mit seiner Begeisterung für seinen absoluten Lieblingsevent, die Weindegu (Als fast-Welscher ist Wein halt eine Herzenssache), erinnerte er so stark an andere Kulturvorstände vergangener Tage, dass seine Nomination nur der nächste logische Schritt war. Ians Qualitäten als organisierter Planer und Teamplayer machen ihn zu einer Idealbesetzung für den nun dreiköpfigen Kulturvorstandsposten. Der einzige Nachteil: niemand versteht seinen Dialekt, und schon gar nicht seine Nachrichten!',
        },
      },
      {
        role: 'Event Planning',
        name: 'Betty Lory',
        description: {
          de:
            'Schon in ihrem ersten Jahr an der ETH im Studiengang HST wurde Betty von Kollegen mit ins AMIV-Büro geschleift und lernte so den besten Fachverein der ETH kennen. Trotz erfolgreich bestandener Basisprüfung wechselte sie ins Elektrotechnik-Studium und nahm an zahlreichen Amiv-Events teil. Sicher auch deshalb liess sie sich 5 Tage vor der GV noch dazu überzeugen, Kulturvorstand zu werden. Wenn neben dem Studium und dem AMIV noch Zeit bleibt, trifft man Betty sicher im Papperlapub an.',
        },
      },
    ],
  },
  {
    image: hopoImage,
    portraits: [
      {
        role: 'University Policy',
        name: 'Daniel Biek',
        description: {
          de: `Biek, Daniel Biek. Aufgewachsen ist er mit seinen zwei schwulen Schildkröten Koopa und Yoshi in Berlin. Obwohl er halb Deutscher und halb Kolumbianer ist sowie russische und dänische Vorfahren hat, spricht er weder Russisch, noch Dänisch, noch Spanisch. Nur Deutsch. Ein wenig enttäuschend, aber naja. Dafür ist Dani prädestiniert als Hopo-ITET-Vorstand, da er eine weltoffene Persönlichkeit besitzt, mit allen und jedem spricht und sich alle Namen, Adressen, Augenfarben, etc. merken kann (Stalker-Alarm!). Ebenfalls ist er als Gossip Girl erster Ansprechpartner für Klatsch und Tratsch am D-ITET. Er bevorzugt Fussball über Icehockey, Mayo über Ketchup, Mc Donald’s über BurgerKing, Sommer über Winter, den BVB über Bayern, Kakao über Kaffee (?!?) und Tequilla über allem (but… why?). Weiter liebt er Raclette (wer schon nicht?!) und hat sein schwächeres Auge links (daher die Brille, thanks Captain Obvious).

            Und grün. Seine Lieblingsfarbe ist grün.`,
        },
      },
      {
        role: 'University Policy',
        name: 'Julia Jäggi',
        description: {
          de: `Seit Julia mit dem Maschinenbaustudium an der ETH angefangen hatte, engagierte sie sich tatkräftig beim HoPo-MAVT-Team. Dort hat sie zu vielen Themen eine gut überlegte Meinung und scheut auch nicht, diese zu vertreten. Während ihrem Basisjahr organisierte sie zahlreiche PVKs und arbeitete sich in diverse Gremien ein. Nach erfolgreichem Basisjahr traf Julia die einzige richtige Entscheidung und wurde Vorstand des HoPo-MAVTs. Wenn Julia nicht gerade in der Vorlesung HoPo-Angelegenheiten regelt, ist sie bestimmt mit ihrem Hund unterwegs, am Wandern im Engadin oder am Skifahren.

            Mit einem Bier aus dem guten alten Bierautomat in der Hand wird man Julia jedoch nie sehen und bei Sitzungen geht ihr Magen oft leer aus. All das, weil Julia gluten-intolerant ist. Von diesem Rückschlag lässt sie sich jedoch nicht unterkriegen und Julia ist oft bei geselligen Anlässen anzutreffen.`,
        },
      },
    ],
  },
  {
    image: erImage,
    portraits: [
      {
        role: 'External Relations',
        name: 'Silvio Geel',
        description: {
          de: `Silvio kam an seinem Ersti-Weekend zum ersten Mal mit dem amiv in Kontakt. Danach galt es zunächst die Basisprüfung zu bestehen. Als Einstiegsdroge entpuppte sich dann im 3. Semester die Braukommission. Silvio arbeitete sich stetig empor. Vom normalen Brauko-Mitglied zum Vizepräsidenten bis er schliesslich diesen Winter zum Braumeister gewählt wurde.

            Als Infrastrukturverantwortlicher für die Firmenmesse Kontakt.17 lernte Silvio auch das Ressort External Relations kennen. Als ER-Vorstand bemüht er sich mehr Stabilität in das Sponsoring zu bringen und versucht mit Qi zusammen das Ressort für die Zukunft umzustrukturieren.
          
            Parallel zur amiv Laufbahn studiert Silvio Elektrotechnik. Nach ein paar Rückschlägen hat er alle Blöcke bestanden und befindet sich kurz vor dem Bachelorabschluss.

            Vor allem die Vertiefung im Bereich Kommunikation hat es ihm angetan.`,
        },
      },
      {
        role: 'External Relations',
        name: 'Marie Matos',
        description: {
          de:
            'Als fremdsprachiges Vorstandsmitglied hat Marie manchmal einen schweren Stand. Immer wieder heisst es «Hei Leute, Änglisch!». Doch als zielstrebige Person, kann sie das gut managen. Vielleicht kommt das auch von ihrer langjährigen Erfahrung als Schiedsrichterin. Neben dem Studium spielt sie auch sehr gerne Volleyball. Sie studiert Biomedical Engineering und möchte später Leuten mit Knie- oder Hüftproblemen helfen. Doch vorher sorgt sie erstmal dafür, dass in der Eventkasse des amiv kein grosses Loch klafft und die Kontakt gut über die Bühne geht.',
        },
      },
    ],
  },
  {
    image: infrastructureImage,
    portraits: [
      {
        role: 'Infrastructure',
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
