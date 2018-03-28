import m from 'mithril';

const rfidLink = 'https://www.amiv.ethz.ch/dienste/rfid-register';

module.exports = {
  view() {
    return m('div', [
      m('h3', 'Der Aufenthaltsraum'),
      m(
        'pre',
        'Der Aufenthaltsraum im CAB E31 steht allen Studenten des AMIV (MAVT & ITET), VIS (INFK) und VMP (MATH & PHYS) unentgeltlich zur Verfügung.'
      ),
      m('h4', 'Das hat es alles:'),
      m('ul', [
        m(
          'li',
          '55" grosser Farbfernseher (HD) mit Nintendo Wii, Playstation 4, XBox One, XBox 360, Verstärker'
        ),
        m('li', '4 Sofaecken'),
        m('li', '1 Spender mit Quellwasser (gekühlt und heiss für Tee)'),
        m('li', '2 Getränkeautomat'),
        m('li', '1 Kaffeautomat'),
        m('li', '1 Mikrowelle'),
        m('li', '2 Töggelikasten'),
        m('li', '1 Billardtisch'),
        m('li', 'Zeitschriftenschrank'),
      ]),
      m('h4', 'Verpflegung'),
      m('ul', [
        m(
          'li',
          'In der Mikrowelle können mitgebrachte Speisen aufgewärmt werden. Damit die Mikrowelle ordentlich bleibt, werden regelmässige Benutzer gebeten, sich in die Putzliste einzutragen und eine Woche für die Mikrowellensauberkeit zu sorgen.'
        ),
        m(
          'li',
          'Meist sind die Automaten oder der Wasserspender gefüllt. Sollte dies nicht der Fall sein, so kannst du dich höflich an die Vorstände im CAB E37 wenden. '
        ),
        m('ul', [
          m('li', 'Quellwasser steht zum Verzehr im Aufenthaltsraum à discrétion zur Verfügung.'),
          m(
            'li',
            'Tee steht gratis zur Verfügung. Teebeutel gibt es im Schrank unter der Kaffeemaschine, heisses Wasser aus dem Wasserspender oder der Kaffeemaschine.'
          ),
          m('li', 'Kaffee gibt es aus dem Automaten für AMIV-Mitglieder gratis (1 pro Tag)'),
          m(
            'li',
            'Bier gibt es für 1,20 CHF (Flasche 0,33l). Ein Bier pro Tag und Person bezahlt euch der AMIV zum gemeinsamen Verzehr im(!) Aufenthaltsraum.'
          ),
          m('li', 'Energy Drinks gibt es für 1,00 CHF im Automaten'),
        ]),
      ]),
      m('pre', [
        '*= Für den Gratisbezug von Bier und Kaffee ist eine einmalige Registrierung der Legi nötig. Diese kann ',
        m('a', { href: rfidLink }, 'hier'),
        ' einfach online getätigt werden.',
      ]),
      m('h4', 'Zugang'),
      m(
        'pre',
        'Während der normalen Gebäudeöffnungszeiten des CAB steht der Raum allen Mitgliedern zur Verfügung. Wir arbeiten daran, für alle einen 24/7 Gebäudezugang zu erhalten. Leider stellt sich dies als einen langwierigen Prozess dar. Sollte sich etwas verändern, wird der Vorstand dies natürlich mitteilen.'
      ),
      m('h4', 'Ordnung bewahren'),
      m('ul', [
        m(
          'li',
          'Becher und Flaschen sind in den entsprechenden vorhanden Entsorgungskisten zu entsorgen '
        ),
        m('ul', [
          m(
            'li',
            'Die Falkenbier-Flaschen haben ein Pfand, weshalb diese bitte in den bereit gestellten Harassen zu hinterlegen sind. Das Bier aus dem Automaten ist nur für den Aufenthaltsraum gedacht und darf nicht mitgenommen werden!'
          ),
          m('li', 'Alle restlichen Glasflaschen sind im Container im Innenhof zu entsorgen.'),
        ]),
        m('li', 'Essensreste und -behältnisse entsprechend entsorgen'),
        m('li', 'Controller, Spiele und Kopfhörer entsprechend zurücklegen'),
        m(
          'li',
          'Natürlich gilt: den Raum so verlassen, wie man ihn antreffen möchte und das immer ordentlicher, als dass man ihn beim Betreten vorgefunden hat!'
        ),
        m('li', 'Wenn alle mithelfen, bleibt die Ordnung erhalten!'),
      ]),
      m('h4', 'Konsequenzen'),
      m('ul', [
        m(
          'li',
          'Werden einzelne fehlbare Mitglieder beim Nichteinhalten der Ordnungsregeln erwischt, so können ihnen diverse AMIV Privilegien (insb. Website und Files, Events sowie Zugang zum Aufenthaltsraum und Getränken) entzogen werden!'
        ),
        m(
          'li',
          'Wird die Ordnung generell vernachlässigt, so können diverse Privilegien für alle gestrichen werden, bis die Situation sich bessert!'
        ),
      ]),
    ]);
  },
};
