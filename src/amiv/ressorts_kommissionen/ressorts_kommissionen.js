const m = require('mithril');

module.exports = {
  view() {
    return m('div', [
      m('h3', 'Bastli'),
      m('p', [
        `Der Bastli ist die Kommission des AMIV, welche dir einen guten Zugang zur praktischen Seite deines Studiums ermöglicht.
      Wir betreiben ein Elektroniklabor und einen Bauteileshop, beides mehrmals pro Woche geöffnet. Dort kannst du von modernen Messgeräten,
      jeder Menge Laborausrüstung, einer Platinenfräse zur Platinenherstellung, viel Werkzeug und Fachwissen profitieren. `,
        m('a', { href: 'http://www.bastli.ethz.ch/', target: '_blank' }, 'Zur Website'),
      ]),
      m('h3', 'BEEZ'),
      m('p', [
        `BEEZ steht für Biomedical Engineering ETH Zürich und ist eine am 9. März 2009 gegründete Kommission des AMIVs,
        die die Interessen der Studenten im Master Programm "Biomedical Engineering" vertritt. `,
        m('a', { href: '#!/amiv/kommissionen/beez', target: '_blank' }, 'Zur Website'),
      ]),
      m('h3', 'Blitz'),
      m('p', [
        `Der Blitz ist die Fachzeitschrift des AMIVs. Er erscheint 6 Mal pro Semester, an jedem zweitem Montag,
        und erreicht nahezu 100% aller Studierenden der Departemente Maschinenbau und Verfahrenstechnik (D-MAVT)
        und Informationstechnologie und Elektrotechnik (D-ITET). Dies sind gut 3000 Ingenieure von morgen! `,
        m('a', { href: 'https://www.blitz.ethz.ch/', target: '_blank' }, 'Zur Website'),
      ]),
      m('h3', 'Braukommission'),
      m('p', [
        `Seit dem Sommer 2001 besteht die Braukommission des AMIVs.
        Zwei bis drei Mal pro Semester brauen die Mitglieder eigenes Bier und schenken dieses dann an den unterschiedlichsten AMIV-Anlässen aus. `,
        m('a', { href: '#!/amiv/kommissionen/brauko' }, 'Zur Website'),
      ]),
      m('h3', 'EESTEC'),
      m('p', [
        `Suchst du Auslandserfahrung? Hast du Interesse an Workshops zu neuesten technischen Trends?
        Möchtest du neue Kontakte mit Studenten aus ganz Europa knüpfen? Dann geh auf einen der kostenlosen Workshops von EESTEC europaweit oder engagiere dich in im hiesigen Local Committee! `,
        m('a', { href: '#!/amiv/kommissionen/eestec' }, 'Zur Website'),
      ]),
      m('h3', 'Funkbude'),
      m('p', [
        `Die Funkbude betreibt die Amateurfunkstation auf dem ETZ-Dach. Der Shack - die Funkstation - ist bestens ausgerüstet.
        Vom klassischen Morsen bis hin zu den neuen digitalen Betriebsarten ist funktechnisch fast alles möglich.
        Zur Vorbereitung auf die Amateurfunkprüfung bietet die Funkbude jedes Herbstsemester einen Vorbereitungskurs an. `,
        m('a', { href: 'https://hb9zz.ethz.ch/', target: '_blank' }, 'Zur Website'),
      ]),
      m('h3', 'Kontakt'),
      m('p', [
        `Die AMIV Kontakt ist eine Firmenkontaktmesse, die den Studenten und auch den Firmen die Gelegenheit gibt, in gegenseitigen Kontakt zu treten.
        Sie wird jedes Jahr von einem Team, das aus Leuten des External Relations - Ressort sowie freiwilligen Helfern besteht, organisiert. `,
        m('a', { href: 'http://www.kontakt.amiv.ethz.ch/', target: '_blank' }, 'Zur Website'),
      ]),
      m('h3', 'LIMES'),
      m('p', [
        `Die LIMES = Ladies in Mechanical and Electrical Engineering Studies haben es sich zum Ziel gesetzt, den weiblichen Nachwuchs im AMIV zu fördern.
        Ausserdem setzen sie sich für den Zusammenhalt und die Zukunft der bestehenden MAVT- und ITET-Studentinnen ein, indem sie Gesellschaftsabende und Exkursionen organisieren. `,
        m('a', { href: '#!/amiv/kommissionen/limes' }, 'Zur Website'),
      ]),
      m('h3', 'Randomdudes'),
      m('p', [
        `Seit ewigen Zeiten im AMIV, ein eingeschworener Haufen und immer da, wenn Not am Mann ist.
        Die Randomdudes sorgen dafür, dass der AMIV auch ohne offizielle Bürozeiten auskommt und sie sind immer für neue Ideen zu begeistern.`,
      ]),
      m('h3', 'Micro- und Nanosystems (MNS)'),
      m('p', [
        `Genau wie unsere 'Biomedical' Masterstudenten haben auch die 'Micro- and Nanosystems' Studenten ihre eigene Kommission.
        Hier können Exkursionen zu speziellen Firmen und Einrichtungen oder gemeinsame Plausch-Abende auf dem Programm stehen.
        Ob mit oder ohne Professoren.`,
      ]),
      m('h3', 'History'),
      m('p', [
        `Schon sehr bald, genauer im Jahr 2018, wird der AMIV sein 125-jähriges Jubiläum feiern.
        Damit wir für diesen Anlass auch gut gerüstet sind, kümmert sich die History-Kommission um eine Aufarbeitung dieser Jahre.
        Ausserdem werden sie die Feierlichkeiten zusammen mit dem Kulturteam planen.`,
        m('a', { href: 'mailto:history@amiv.ethz.ch' }, 'history@amiv.ethz.ch'),
      ]),
    ]);
  },
};
