// Contains static information about the current board.
// Markdown can be used to style the text.

import boardImage from '../images/board/board.jpg';
import pqImage from '../images/board/pq.jpg';
import eventPlanningImage from '../images/board/eventPlanning.jpg';
import erImage from '../images/board/er.jpg';
import hopoImage from '../images/board/hopo.jpg';
import informationImage from '../images/board/information.jpg';
import infrastructureImage from '../images/board/infrastructure.jpg';
import itImage from '../images/board/it.jpg';

const boardPortraits = [
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
  },
];

export { boardPortraits, boardImage };
