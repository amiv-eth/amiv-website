export default {
  // Common stuff
  language: {
    de: 'German',
    en: 'English',
  },
  loading: 'Loading...',
  close: 'close',
  loadingError: 'Error while loading data.',
  loadMore: 'Load more',
  loadMoreError: 'Loading failed. Try again?',
  retry: 'Retry',
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
  button: {
    cancel: 'cancel',
    confirm: 'confirm',
    enroll: 'enroll',
    withdraw: 'withdraw',
  },
  membership: {
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
    password: {
      change: 'Change password',
      revertToLdap: 'Revert to LDAP',
      set: 'Set password',
      requirements: 'Password has to be between 7 and 100 characters long.',
      current: 'Current password',
      new: 'New password',
      repeatNew: 'Repeat new password',
      errors: {
        current: 'Password is incorrect.',
        notEqual: 'Passwords do not match.',
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
      search: 'Search groups',
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
    types: {
      cheatsheets: 'Summaries',
      exams: 'Old exams',
      lectureDocuments: 'Lecture Documents',
      exercises: 'Exercises',
    },
    semester: 'Semester',
    allSemesters: 'All semesters',
    semester1: '1st Semester',
    semester2: '2nd Semester',
    semester3: '3rd Semester',
    semester4: '4th Semester',
    semester5: '5+ Semester',
    lecture: 'Lecture',
    allLectures: 'All lectures',
    department: 'Department',
    professor: 'Professor',
    noDepartment: 'No department',
    type: 'Type',
    title: 'Title',
    author: 'Author',
    noSemester: 'No semester',
    courseYear: 'Course Year',
    files: 'Files',
    upload: 'Upload study document(s)',
    uploading: 'Uploading...',
    accessDenied: 'Study documents are available only for ETH students.',
    rules: {
      title: 'Rules',
      one:
        'This platform is based on a give-and-take principle, so please consider investing a few minutes to see whether you could contribute anything yourself. It does not take much time.',
      two:
        'This overview is still in development. Feedback would be appreciated and can be submitted at  unterlagen@amiv.ethz.ch.',
      three:
        'Some of the listed documents are subject to the [BOT](https://rechtssammlung.sp.ethz.ch/_layouts/15/start.aspx#/default.aspx) as well as copyright and serve only as internal documentation according to [Bundesgesetz SR 231.1, Art. 19.1c](https://www.admin.ch/opc/de/classified-compilation/19920251/index.html#a19) and must not be distributed to non-ETH members. For these reasons Login is mandatory.',
      four:
        'Plagiarism may have dire consequences. Do not promote work of others as your own and read [this page](https://www.ethz.ch/studierende/de/studium/leistungskontrollen/plagiate.html) as well as [this ETH guide](http://www.lit.ethz.ch/faq/Italienisch/Lehre/box_feeder/PlagioETH_studenti)',
    },
    thanks:
      'On behalf of all students we would like to thank those who contribute with their own documents and summaries – You da real MVP <3',
    oralExams: 'Oral Exams',
    oralExamsExplanation:
      'You can order your exam protocols here and get them for a deposit of CHF 20.- at the AMIV Office in CAB E37.  You will get your deposit back for providing a protocol yourself. This shall make sure that our system is always up to date. If you need or want to provide an exam protocol, please send an e-mail to pruefungen@amiv.ethz.ch. A protocol includes at least the following content: course, professor/examinator, key words, what was asked and so on…',
    oralExamDatesIntro:
      'Protocols for the summer session 2018 can be picked up (upon request) on the following dates:',
  },

  // Joboffers Page
  joboffers: {
    title: 'Jobs',
    downloadAsPdf: 'Download as PDF',
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
  },
};
