export default {
  // Common stuff
  language: {
    de: 'Deutsch',
    en: 'Englisch',
  },
  loading: 'Laden...',
  emptyList: 'Es sind keine Einträge zum Anzeigen vorhanden.',
  close: 'schliessen',
  loadingError: 'Ein Fehler ist während dem Laden der Daten aufgetreten.',
  loadMore: 'Mehr laden',
  loadMoreError: 'Laden fehlgeschlagen. Nochmal versuchen?',
  retry: 'Erneut versuchen?',
  warning: 'Warnung',
  switzerland: 'Schweiz',
  menu: 'Menu',
  amiv: 'AMIV',
  contact: 'Kontakt',
  calendar: 'Kalender',
  login: 'Login',
  logout: 'Logout',
  username: 'Benutzername',
  password: 'Passwort',
  email: 'Email',
  search: 'Suchen',
  reset: 'Zurücksetzen',
  externalLink: 'Externer Link',
  copyDirectLink: 'Direktlink kopieren',
  button: {
    clear: 'löschen',
    create: 'erstellen',
    cancel: 'abbrechen',
    confirm: 'bestätigen',
    enroll: 'einschreiben',
    withdraw: 'ausschreiben',
    proceed: 'fortfahren',
  },
  membership: {
    none: 'KEIN MITGLIED',
    regular: 'ORDENTLICHES MITGLIED',
    extraordinary: 'AUSSERORDENTLICHES MITGLIED',
    honorary: 'EHRENMITGLIED',
  },
  missing: {
    image: 'Kein Bild verfügbar.',
    description: 'Keine Beschreibung verfügbar.',
    contactInfo: 'Keine Kontaktinformationen verfügbar.',
  },

  // Main Menu
  mainMenu: {
    about: {
      label: 'Info',
      about: 'Über $t(amiv)',
      board: 'Vorstand',
      teams: 'Teams',
      statutes: 'Statuten',
      minutes: 'Protokolle',
      gv: 'Generalversammlungen',
    },
    events: 'Events',
    studydocuments: 'Studienunterlagen',
    jobs: {
      label: 'Jobs',
      jobs: 'Jobs',
      companies: 'Firmenprofile',
    },
    login: 'Login',
    logout: 'Logout',
    profile: 'Profil',
  },

  // Board Page
  board: {
    title: 'Vorstand',
    roles: {
      president: 'Präsidentin',
      quaestor: 'Quästor',
      it: 'IT',
      eventPlanning: 'Kultur',
      universityPolicy: 'Hochschulpolitik',
      externalRelations: 'External Relations',
      infrastructure: 'Infrastruktur',
      information: 'Information',
    },
    tasks: 'Aufgaben',
  },

  // Teams Page
  teams: {
    ressorts: 'Ressorts',
    commissions: 'Kommissionen',
  },

  // Legal Notice Page
  legalNotice: {
    title: 'Impressum',
    disclaimer: 'Haftungsausschluss',
    disclaimerText:
      'Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen. Für die Inhalte der externen Links übernimmt der Autor keine Haftung. Die Betreiber der verlinkten Seiten sind ausschliesslich für den Inhalt verantwortlich.',
    copyrights: 'Urheberrechte',
    copyrightsText:
      'Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website gehören ausschliesslich dem «AMIV an der ETH» oder den speziell genannten Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger im Voraus einzuholen.',
  },

  // Profile Page
  profile: {
    freeBeer: 'Du bist berechtigt, gratis Bier zu beziehen!',
    setRfid: 'Setze deine RFID unten, um gratis Bier zu erhalten!',
    rfid: 'RFID',
    rfidError: '6 Ziffern erforderlich. Siehe Rückseite deiner Legi.',
    rfidChanged: 'RFID Nummer aktualisiert.',
    rfidPatchError:
      'Ein Fehler ist aufgetreten. Möglichweise ist die RFID Nummer bereits in Verwendung.',
    rfidNotSet: 'nicht gesetzt',
    password: {
      change: 'Passwort ändern',
      changed: 'Password wurde geändert.',
      revertToLdap: 'Zu LDAP zurückkehren',
      revertToLdapWarning:
        'Falls du dich nicht über das ETH LDAP authentifizieren kannst, ist das einloggen nicht mehr möglich!\nNur ETH Angehörige sollten diese Aktion ausführen.\n\n**Dies kann nicht rückgängig gemacht werden!**',
      explanation:
        'Du kannst dich jederzeit mit deinen ETH-Anmeldedaten anmelden. Du kannst aber auch ein zusätzliches Passwort für die Anmeldung bei AMIV-Diensten festlegen.',
      set: 'Passwort setzen',
      requirements: 'Passwort muss zwischen 7 und 100 Zeichen lang sein.',
      current: 'Aktuelles Passwort',
      new: 'Neues Passwort',
      repeatNew: 'Neues Passwort wiederholen',
      errors: {
        current: 'Passwort ist falsch.',
        notEqual: 'Passwörter stimmen nicht überein.',
        unknown: 'Es ist ein Fehler aufgetreten. Bitte versuche es erneut.',
      },
    },
    announce: {
      unsubscribe: 'Von der AMIV Announce abmelden',
      subscribe: 'AMIV Announce abonnieren',
    },
    sessions: {
      loading: 'Lade Sitzungsdaten',
      none: 'Du hast keine anderen aktiven Sitzungen.',
      terminateOthers: 'Beende alle anderen {{count}} aktiven Sitzungen.',
    },
    groups: {
      searchEnrolled: 'Eingeschriebene Gruppen durchsuchen',
      searchPublic: 'Öffentliche Gruppen durchsuchen (mit Selbsteinschreibung)',
      noneFound: 'Keine Gruppen gefunden.',
      expires: 'läuft am {{date}} ab',
    },
  },

  // Filtered List Page
  filter: {
    show: 'Filter anzeigen',
    hide: 'Filter ausblenden',
  },

  // Events Page
  events: {
    title: 'Events',
    agenda: 'Event-Kalender',
    headers: {
      openRegistration: 'Anmeldung offen',
      upcoming: 'Bevorstehende Events',
      past: 'Vergangene Events',
    },
    noUpcoming: 'Keine bevorstehenden Events.',
    price: 'Preis',
    free: 'Gratis',
    allEvents: 'Alle Events',
    restrictions: {
      title: 'Einschränkungen',
      none: 'Offen für alle',
      membersOnly: 'Nur für $t(amiv) Mitglieder',
    },
    registration: {
      none: 'Keine Anmeldung erforderlich',
      over: 'Das Anmeldefenster ist geschlossen.',
      startsAt: 'Anmeldung möglich ab',
    },
    spot: 'Platz',
    spot_plural: 'Plätze',
    noSpotsAvailable: 'Keine Plätze verfügbar',
    spotsAvailable: '{{count}} $t(events.spot) verfügbar',
    updateData: 'Aktualisiere deine Daten im folgenden Formular.',
    signup: {
      action: 'anmelden',
      updateAction: 'Anmeldung ändern',
      success: 'Du hast einen Platz ergattert!',
      failed: 'Anmeldung fehlgeschlagen',
      blacklisted: 'Du kannst dich im Moment nicht anmelden, da du auf der Blacklist bist.',
      waitingList: 'Du bist auf der Warteliste.',
      accepted: 'Du bist angemeldet und hast einen Platz.',
      noAdditionalInfoRequired: 'Keine Zusatzinformationen erforderlich.',
    },
    signoff: {
      action: 'abmelden',
      success: 'Anmeldung gelöscht',
      failed: 'Abmelden fehlgeschlagen',
    },
  },

  // Studydocuments Page
  studydocs: {
    quickfilter: {
      title: 'Schnellfilter',
      selection: 'Auswahl',
      selectSemester: 'Departement und Semester auswählen',
      selectDepartment: 'Departement auswählen',
      selectLecture: 'Vorlesung auswählen',
      lecturePlaceholder: 'Vorlesung hier eintippen',
      loadingError: 'Ups, die Filteroptionen konnten nicht geladen werden.',
    },
    actions: {
      edit: 'bearbeiten',
      delete: 'löschen',
      cancel: 'abbrechen',
      confirm: 'bestätigen',
    },
    departments: {
      all: 'Alle',
      other: 'Andere',
      otherLong: 'Andere Departemente',
    },
    types: {
      cheatsheets: 'Zusammenfassungen',
      exams: 'Alte Prüfungen',
      lectureDocuments: 'Unterrichtsmaterialien',
      exercises: 'Übungen',
    },
    name: {
      default: 'Nicht kategorisiert',
      'cheat sheets': 'Zusammenfassung',
      exams: 'Prüfung',
      'lecture documents': 'Unterrichtsmaterialien',
      exercises: 'Übungen',
    },
    semester: 'Semester',
    allSemesters: 'Alle Semester',
    semester1: '1. Semester',
    semester2: '2. Semester',
    semester3: '3. Semester',
    semester4: '4. Semester',
    'semester5+': '5+ Semester',
    lecture: 'Vorlesung',
    allLectures: 'Alle Vorlesungen',
    department: 'Departement',
    allDepartments: 'Alle Departemente',
    professor: 'Professor',
    allProfessors: 'Alle Professoren',
    noDepartment: 'Kein Departement',
    type: 'Typ',
    title: 'Titel',
    author: 'Author',
    noSemester: 'Kein Semester',
    courseYear: 'Kursjahr',
    files: 'Dateien',
    noFiles: 'Keine Dateien ausgewählt.',
    upload: 'Dokument(e) hochladen',
    uploadTitle: {
      new: 'Ein neues Dokument hochladen',
      edit: 'Dokument bearbeiten',
    },
    uploadFileHint: 'Du kannst mehrere Dateien auswählen!',
    uploadLoadingError: 'Das Upload-Formular konnte nicht geladen werden.',
    uploadError: 'Während dem Hochladen ist ein Fehler aufgetreten.',
    uploading: 'lädt hoch...',
    createNewEntry: 'Einen neuen Eintrag erstellen',
    createNewEntryLabel: 'neuer Eintrag',
    accessDenied: 'Studienunterlagen sind nur für ETH Studenten verfügbar.',
    selectTextHelp: 'Kreuze «erstellen» an, um einen neuen Eintrag zu erstellen.',
    legacyText:
      'Du hast das gesuchte Dokument nicht gefunden? Schau auf der <a href="https://legacy.amiv.ethz.ch/studium/unterlagen" target="_blank">alten Webseite</a>.',
    rules: {
      title: 'Regeln',
      one:
        'Diese Plattform lebt vom geben und nehmen - investiere also auch mal ein paar Minuten und schaue ob du für andere nützliches Material hast und lade es hoch. Es kostet nicht viel Zeit.',
      two:
        'Einige der hier zu findenden Daten unterliegen der [BOT](https://rechtssammlung.sp.ethz.ch/_layouts/15/start.aspx#/default.aspx) sowie dem Urheberrecht und dienen zur internen Dokumentation gemäss [Bundesgesetz SR 231.1, Art. 19.1c](https://www.admin.ch/opc/de/classified-compilation/19920251/index.html#a19) und dürfen nicht an Nicht-ETH-Angehörige weitergegeben werden - daher ist der Login verpflichtend.',
      three:
        'Plagiate können schwerwiegende Folgen haben. Gib also keine Werke von anderen als dein eigenes aus und lies dir [diese Seite](https://www.ethz.ch/studierende/de/studium/leistungskontrollen/plagiate.html) durch.',
      four:
        'Hast du Feedback für uns oder ein Problem entdeckt? Sag uns Bescheid unter [info@amiv.ethz.ch](mailto:info@amiv.ethz.ch).',
    },
    thanks:
      'Wir bedanken uns im Namen aller Studenten bei Allen, die ihre Unterlagen, Zusammenfassungen, und und und hier für andere Studenten zugänglich machen. Danke tausend, Gruss und Kuss.',
    oralExams: 'Mündliche Prüfungen',
    oralExamsExplanation:
      'Die Prüfungsprotokolle sind hier bestellbar und können gegen ein Depot von 20.- im AMIV Büro im CAB E37 abgeholt werden. Das Depot erhält man jeweils zurück, wenn man selbst ein Protokoll abgibt. Dies soll gewährleisten, dass es stets aktuelle mündliche Prüfungen im System hat. Wenn du ein Prüfungsprotokoll brauchst oder abgeben willst, schicke eine Mail an pruefungen@amiv.ethz.ch. Ein Prüfungsprotokoll beinhaltet mindestens folgende Infos: Fach, Prof./Prüfer, Stichworte, Was wurde gefragt etc.',
    oralExamDatesIntro:
      'Für die Sommersession 2018 können Protokolle (nach erfolgter Anmeldung) zu den folgenden Zeitpunkten abgeholt werden:',
  },

  // Joboffers Page
  joboffers: {
    title: 'Jobs',
    downloadAsPdf: 'PDF herunterladen',
    publishedToday: 'heute veröffentlicht',
    publishedYesterday: 'gestern veröffentlicht',
    publishedDaysAgo: 'vor {{days}} Tagen veröffentlicht',
  },

  // Error
  error: {
    title: 'Ups, das ist ein Fehler!',
    accessDenied: 'Diese Seite ist nur für eingeloggte Benutzer verfügbar.',
    notFound: 'Die gewünschte Seite konnte nicht gefunden werden.',
    translationUnavailable: 'Übersetzung nicht verfügbar.',
    shownLanguage: 'Zeige Text in {{shown_language}}.',
    loadingPage: 'Die gewünschte Seite konnte nicht geladen werden.',
  },

  // Footer
  footer: {
    issueSpotted: 'Hast du ein Problem festgestellt?',
    issueReport: 'Melde einen Fehler',
  },
};
