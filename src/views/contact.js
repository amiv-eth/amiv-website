import m from 'mithril';

module.exports = {
  view() {
    return m('div', [
      m('h3', 'Kontakt'),
      m('pre', 'AMIV an der ETH\nCAB E37\nUniversitätsstrasse 6\n8092 Zürich'),
      m('pre', '+41 44 632 42 45\ninfo@amiv.ethz.ch'),
      m(
        'pre',
        'Die Räumlichkeiten des AMIV befinden sich im Gebäude CAB, E-Stock, im Zentrum der ETH Zürich:'
      ),
      m(
        'pre',
        'Gewisse Dienstleistungen des AMIV wurden im Laufe der Zeit in eigene Kommissionen ausgelagert. Dies umfasst unsere Fachvereins-Zeitschrift Blitz, die Bastler (mit eigenem Bauteile-Laden und Messplatz) vom Bastli, eine eigene Bier-Braukommission, ein "Local Committee" des europäischen Netzwerks EESTEC, die Amateur-Funker von der Funkbude sowie das Organisationskomitee der AMIV-Firmenmesse Kontakt. Zudem gibt es seit dem Jahr 2009 je eine Kommission, die die Studenten der spezialisierten Masterstudiengänge "Biomedical Engineering" und "Energy Science" zusammenfassen und betreuen.'
      ),
    ]);
  },
};
