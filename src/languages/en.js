export default {
  // Common stuff
  language: {
    de: 'German',
    en: 'English',
  },
  loading: 'Loading...',
  emptyList: 'There are no items to show.',
  close: 'close',
  loadingError: 'Error while loading data.',
  loadMore: 'Load more',
  loadMoreError: 'Loading failed. Try again?',
  retry: 'Retry',
  warning: 'Warning',
  switzerland: 'Switzerland',
  menu: 'menu',
  amiv: 'AMIV',
  contact: 'Contact',
  calendar: 'Calendar',
  login: 'login',
  logout: 'logout',
  username: 'Username',
  password: 'Password',
  email: 'Email',
  search: 'Search',
  reset: 'Reset',
  externalLink: 'External link',
  copyDirectLink: 'Copy link',
  button: {
    clear: 'clear',
    create: 'create',
    cancel: 'cancel',
    confirm: 'confirm',
    enroll: 'enroll',
    withdraw: 'withdraw',
    proceed: 'proceed',
  },
  membership: {
    none: 'NO MEMBER',
    regular: 'REGULAR MEMBER',
    extraordinary: 'EXTRAORDINARY MEMBER',
    honorary: 'HONORARY MEMBER',
  },
  missing: {
    image: 'No image available.',
    description: 'No description available.',
    contactInfo: 'No contact information.',
  },

  // Main Menu
  mainMenu: {
    about: {
      label: 'Info',
      about: 'About $t(amiv)',
      board: 'Board',
      teams: 'Teams',
      statutes: 'Statutes',
      minutes: 'Minutes',
      gv: 'General Assemblies',
    },
    events: 'Events',
    studydocuments: 'Study Documents',
    jobs: {
      label: 'Jobs',
      jobs: 'Jobs',
      companies: 'Companies',
    },
    login: 'Login',
    logout: 'Logout',
    profile: 'Profile',
  },

  // Board Page
  board: {
    title: 'Board',
    roles: {
      president: 'President',
      quaestor: 'Quaestor',
      it: 'IT',
      eventPlanning: 'Event Planning',
      universityPolicy: 'University Policy',
      externalRelations: 'External Relations',
      infrastracture: 'Infrastructure',
    },
    tasks: 'Tasks',
  },

  // Teams Page
  teams: {
    ressorts: 'Teams',
    commissions: 'Commissions',
  },

  // Legal Notice Page
  legalNotice: {
    title: 'Legal Notice',
    disclaimer: 'Disclaimer',
    disclaimerText:
      'The author is not responsible for the correctness, accuracy, timeliness, reliability or completeness of the information. For contents of external links, the author assumes no liability. The operators of the linked websites are exclusively responsible for the content.',
    copyrights: 'Copyrights',
    copyrightsText:
      'The copyright and any other rights relating to texts, illustrations, photos or any other files on the website belong exclusively «AMIV an der ETH» or mentioned owners. Any reproduction requires the written permission of the copyright holder , which must be obtained in advance.',
  },

  // Profile Page
  profile: {
    freeBeer: 'You are allowed to get free beer!',
    setRfid: 'Set your RFID below to get free beer!',
    rfid: 'RFID',
    rfidError: '6 digits required. See back of your legi.',
    rfidChanged: 'RFID number changed.',
    rfidPatchError: 'An error occurred. The number might already be in use.',
    rfidNotSet: 'not set',
    password: {
      change: 'Change password',
      changed: 'Password updated.',
      revertToLdap: 'Revert to LDAP',
      revertToLdapWarning:
        'If you cannot authenticate against the ETH LDAP service, you can no longer log in!\nOnly ETH affiliated people should use this function.\n\n**This cannot be undone!**',
      explanation:
        'You can always log in with your ETH credentials, but you can also set an additional password to log in to AMIV services.',
      set: 'Set password',
      requirements: 'Password has to be between 7 and 100 characters long.',
      current: 'Current password',
      new: 'New password',
      repeatNew: 'Repeat new password',
      errors: {
        current: 'Password is incorrect.',
        notEqual: 'Passwords do not match.',
        unknown: 'There was an error. Please try again.',
      },
    },
    newsletter: {
      unsubscribe: 'Unsubscribe from Newsletter',
      subscribe: 'Subscribe to Newsletter',
    },
    sessions: {
      loading: 'Loading session data',
      none: 'You have no other active sessions',
      terminateOthers: 'Terminate all other {{count}} active sessions',
    },
    groups: {
      searchEnrolled: 'Search enrolled groups',
      searchPublic: 'Search public groups (with self enrollment)',
      noneFound: 'No groups found.',
      expires: 'expires on {{date}}',
    },
  },

  // Filtered List Page
  filter: {
    show: 'Show filter',
    hide: 'Hide filter',
  },

  // Events Page
  events: {
    title: 'Events',
    agenda: 'Event Calendar',
    headers: {
      openRegistration: 'Open Registration',
      upcoming: 'Upcoming Events',
      past: 'Past Events',
    },
    noUpcoming: 'No upcoming events.',
    price: 'Price',
    free: 'Free',
    allEvents: 'All Events',
    restrictions: {
      title: 'Restrictions',
      none: 'Open for everyone',
      membersOnly: 'For $t(amiv) members only',
    },
    registration: {
      none: 'No registration required',
      over: 'The registration period is over.',
      startsAt: 'Registration starts at',
    },
    spot: 'spot',
    spot_plural: 'spots',
    noSpotsAvailable: 'No spots available',
    spotsAvailable: '{{count}} $t(events.spot) available',
    updateData: 'Update your data below.',
    signup: {
      action: 'signup',
      updateAction: 'change signup',
      success: "Success! you're in",
      failed: 'Signup failed',
      blacklisted: 'You cannot register for this event because you are on the blacklist.',
      waitingList: 'You are on the waiting list.',
      accepted: 'You are signed up and got a spot.',
    },
    signoff: {
      action: 'signoff',
      success: 'Signoff successful',
      failed: 'Signoff failed',
    },
  },

  // Studydocuments Page
  studydocs: {
    quickfilter: {
      title: 'Quick Filter',
      selection: 'Selection',
      selectSemester: 'Select department and semester',
      selectDepartment: 'Select department',
      selectLecture: 'Select lecture',
      lecturePlaceholder: 'Type lecture name',
      loadingError: 'Oops, we could not load the filter values.',
    },
    departments: {
      all: 'All',
      other: 'Other',
      otherLong: 'Other Departments',
    },
    types: {
      cheatsheets: 'Summaries',
      exams: 'Old exams',
      lectureDocuments: 'Lecture Documents',
      exercises: 'Exercises',
    },
    name: {
      default: 'Not categorized',
      'cheat sheets': 'Summary',
      exams: 'Exam',
      'lecture documents': 'Lecture Documents',
      exercises: 'Exercises',
    },
    semester: 'Semester',
    allSemesters: 'All semesters',
    semester1: '1st Semester',
    semester2: '2nd Semester',
    semester3: '3rd Semester',
    semester4: '4th Semester',
    'semester5+': '5+ Semester',
    lecture: 'Lecture',
    allLectures: 'All lectures',
    department: 'Department',
    allDepartments: 'All departments',
    professor: 'Professor',
    allProfessors: 'All professors',
    noDepartment: 'No department',
    type: 'Type',
    title: 'Title',
    author: 'Author',
    noSemester: 'No semester',
    courseYear: 'Course Year',
    files: 'Files',
    upload: 'Upload study document(s)',
    uploadTitle: 'Upload a new study document',
    uploadFileHint: 'You can select multiple files!',
    uploadLoadingError: 'Could not load the upload form.',
    uploadError: 'There was an error while uploading the documents.',
    uploading: 'Uploading...',
    createNewEntry: 'Create a new entry',
    createNewEntryLabel: 'new entry',
    accessDenied: 'Study documents are available only for ETH students.',
    selectTextHelp: 'Tick «create» to create a new entry.',
    legacyText:
      'You didn\'t find the document you were looking for? Take a look at the <a href="https://legacy.amiv.ethz.ch/studium/unterlagen" target="_blank">old website</a>.',
    legactLink: 'Try your luck',
    rules: {
      title: 'Rules',
      one:
        'This platform is based on a give-and-take principle, so please consider investing a few minutes to see whether you could contribute anything yourself. It does not take much time.',
      two:
        'Some of the listed documents are subject to the [BOT](https://rechtssammlung.sp.ethz.ch/_layouts/15/start.aspx#/default.aspx) as well as copyright and serve only as internal documentation according to [Bundesgesetz SR 231.1, Art. 19.1c](https://www.admin.ch/opc/de/classified-compilation/19920251/index.html#a19) and must not be distributed to non-ETH members. For these reasons Login is mandatory.',
      three:
        'Plagiarism may have dire consequences. Do not promote work of others as your own! Please read [this page](https://www.ethz.ch/students/en/studies/performance-assessments/plagiarism.html).',
      four:
        'If you have any feedback or spotted some issues, tell us by mail on [info@amiv.ethz.ch](mailto:info@amiv.ethz.ch)',
    },
    thanks:
      'On behalf of all students we would like to thank those who contribute with their own documents and summaries!',
    oralExams: 'Oral Exams',
    oralExamsExplanation:
      'You can order your exam protocols here and get them for a deposit of CHF 20.- at the AMIV Office in CAB E37.  You will get your deposit back for providing a protocol yourself. This shall make sure that our system is always up to date. If you need or want to provide an exam protocol, please send an e-mail to pruefungen@amiv.ethz.ch. A protocol includes at least the following content: course, professor/examinator, key words, what was asked and so on…',
    oralExamDatesIntro:
      'Protocols for the summer session 2018 can be picked up (upon request) on the following dates:',
  },

  // Joboffers Page
  joboffers: {
    title: 'Jobs',
    downloadAsPdf: 'Download PDF',
    publishedToday: 'published today',
    publishedYesterday: 'published yesterday',
    publishedDaysAgo: 'published {{days}} days ago',
  },

  // Error
  error: {
    title: "Woops, that's an error!",
    accessDenied: 'This page is accessible only for authenticated users.',
    notFound: 'The page you are looking for could not be found.',
    translationUnavailable: 'Translation not available.',
    shownLanguage: 'Showing text in {{shown_language}}.',
    loadingPage: 'Could not load the requested page.',
  },

  // Footer
  footer: {
    issueSpotted: 'Did you encounter a problem?',
    issueReport: 'Report a bug',
  },
};
