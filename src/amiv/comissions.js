const m = require('mithril');

module.exports = {
  view() {
    return m('div', [
      m('h3', 'Kommissionen'),
      // Bastli
      m('h4', 'Bastli'),
      m('pre', [
        'Der Bastli ist die Kommission des AMIV, welche dir einen guten Zugang zur praktischen Seite deines Studiums ermöglicht.Wir betreiben ein Elektroniklabor und einen Bauteileshop, beides mehrmals pro Woche geöffnet. Dort kannst du von modernen Messgeräten, jeder Menge Laborausrüstung, einer Platinenfräse zur Platinenherstellung, viel Werkzeug und Fachwissen profitieren. ',
        m('a', { href: 'http://www.bastli.ethz.ch/' }, 'Zur Webseite.'),
      ]),
      // BEEZ
      m('h4', 'BEEZ'),
      m('pre', [
        'BEEZ steht für Biomedical Engineering ETH Zürich und ist eine am 9. März 2009 gegründete Kommission des AMIVs, die die Interessen der Studenten im Master Programm "Biomedical Engineering" vertritt. ',
        m('a', { href: 'https://www.facebook.com/ETH.beez' }, 'Zur Webseite'),
      ]),
      // Blitz
      m('h4', 'Blitz'),
      m('pre', [
        'Der Blitz ist die Fachzeitschrift des AMIVs. Er erscheint 6 Mal pro Semester, an jedem zweitem Montag, und erreicht nahezu 100% aller Studierenden der Departemente Maschinenbau und Verfahrenstechnik (D-MAVT) und Informationstechnologie und Elektrotechnik (D-ITET). Dies sind gut 3000 Ingenieure von morgen! ',
        m('a', { href: 'https://www.blitz.ethz.ch/' }, 'Zur Webseite'),
      ]),
      // Braukommission
      m('h4', 'Braukommission'),
      m('pre', [
        'Seit dem Sommer 2001 besteht die Braukommission des AMIVs. Zwei bis drei Mal pro Semester brauen die Mitglieder eigenes Bier und schenken dieses dann an den unterschiedlichsten AMIV-Anlässen aus. ',
        m('a', { href: 'https://www.amiv.ethz.ch/bierkommission/braukommission' }, 'Zur Webseite'),
      ]),
      // EESTEC
      m('h4', 'EESTEC'),
      m('pre', [
        'Suchst du Auslandserfahrung? Hast du Interesse an Workshops zu neuesten technischen Trends? Möchtest du neue Kontakte mit Studenten aus ganz Europa knüpfen? Dann geh auf einen der kostenlosen Workshops von EESTEC europaweit oder engagiere dich in im hiesigen Local Committee! ',
        m('a', { href: 'http://www.eestec.ch/' }, 'Zur Webseite'),
      ]),
      // Funkbude
      m('h4', 'Funkbude'),
      m('pre', [
        'Die Funkbude betreibt die Amateurfunkstation auf dem ETZ-Dach. Der Shack - die Funkstation - ist bestens ausgerüstet. Vom klassischen Morsen bis hin zu den neuen digitalen Betriebsarten ist funktechnisch fast alles möglich. Zur Vorbereitung auf die Amateurfunkprüfung bietet die Funkbude jedes Herbstsemester einen Vorbereitungskurs an. ',
        m('a', { href: 'https://hb9zz.ethz.ch/' }, 'Zur Webseite'),
      ]),
      // Kontakt
      m('h4', 'Kontakt'),
      m('pre', [
        'Die AMIV Kontakt ist eine Firmenkontaktmesse, die den Studenten und auch den Firmen die Gelegenheit gibt, in gegenseitigen Kontakt zu treten. Sie wird jedes Jahr von einem Team, das aus Leuten des External Relations - Ressort sowie freiwilligen Helfern besteht, organisiert. ',
        m('a', { href: 'http://www.kontakt.amiv.ethz.ch/' }, 'Zur Webseite'),
      ]),
      // LIMES
      m('h4', 'LIMES'),
      m('pre', [
        'Die LIMES = Ladies in Mechanical and Electrical Engineering Studies haben es sich zum Ziel gesetzt, den weiblichen Nachwuchs im AMIV zu fördern. Ausserdem setzen sie sich für den Zusammenhalt und die Zukunft der bestehenden MAVT- und ITET-Studentinnen ein, indem sie Gesellschaftsabende und Exkursionen organisieren. ',
        m('a', { href: 'mailto:limes@amiv.ethz.ch' }, 'Email Adresse'),
      ]),
      // Randomdudes
      m('h4', 'Randomdudes'),
      m('pre', 'Die AMIV Kontakt ist eine Firmenkontaktmesse, die den Studenten und auch den Firmen die Gelegenheit gibt, in gegenseitigen Kontakt zu treten. Sie wird jedes Jahr von einem Team, das aus Leuten des External Relations - Ressort sowie freiwilligen Helfern besteht, organisiert. '),
      // Micro- und Nanosystems (MNS)
      m('h4', 'Micro- und Nanosystems (MNS)'),
      m('pre', 'Genau wie unsere "Biomedical" Masterstudenten haben auch die "Micro- and Nanosystems" Studenten ihre eigene Kommission. Hier können Exkursionen zu speziellen Firmen und Einrichtungen oder gemeinsame Plausch-Abende auf dem Programm stehen. Ob mit oder ohne Professoren.'),
      // Historykommission
      m('h4', 'Historykommission'),
      m('pre', [
        'Schon sehr bald, genauer im Jahr 2018, wird der AMIV sein 125-jähriges Jubiläum feiern. Damit wir für diesen Anlass auch gut gerüstet sind, kümmert sich die History-Kommission um eine Aufarbeitung dieser Jahre. Ausserdem werden sie die Feierlichkeiten zusammen mit dem Kulturteam planen. ',
        m('a', { href: 'mailto:history@amiv.ethz.ch' }, 'Email Adresse'),
      ]),
      // Link to English Website
      m('a', { href: 'https://www.amiv.ethz.ch/node/2137' }, 'English'),
    ]);
  },
};
