import { headerData, footerData } from './menu-data';
export const instanceData = {
  lang: "de",
  headerData: headerData,
  footerData: footerData,
  strings: {
    header: {
      slogan: "Die freie Lernplattform",
      search: "Suche",
      login: "Anmelden"
    },
    footer: {
      summaryHeading: "Serlo.org ist die Wikipedia fürs Lernen",
      summaryText: "Wir sind eine engagierte Gemeinschaft, die daran arbeitet, hochwertige Bildung weltweit frei verfügbar zu machen.",
      learnMore: "Mehr Erfahren",
      participate: "Mitmachen",
      donate: "Spenden",
      toTop: "Nach oben"
    },
    categories: {
      articles: 'Articles',
      courses: 'Courses',
      videos: 'Videos',
      applets: 'Applets',
      folders: 'Folders',
      exercises: "Aufgaben",
      events: 'Events'
    },
    entities: {
      applet: 'Applet',
      article: 'Article',
      course: 'Course',
      coursePage: 'Course Page',
      event: 'Event',
      exercise: 'Exercise',
      exerciseGroup: 'Exercise Group',
      folder: 'Folder',
      groupedExercise: 'Grouped Exercise',
      page: 'Page',
      solution: 'Solution',
      taxonomyTerm: 'Taxonomy Term',
      user: 'User',
      video: 'Video',
      topicFolder: 'Exercise folder',
      comment: 'Comment',
      revision: 'Revision',
      thread: 'Thread'
    },
    share: {
      button: "Teilen",
      title: "Weitergeben!",
      copyLink: "Link kopieren",
      copySuccess: "In die Zwischenablage kopiert!",
      close: "Schließen"
    },
    edit: {
      button: "Inhalt überarbeiten"
    },
    license: {
      readMore: "Was bedeutet das?"
    },
    course: {
      showPages: "Kursübersicht anzeigen",
      pages: "Kursübersicht",
      next: "Weiter"
    },
    content: {
      show: "anzeigen",
      hide: "ausblenden",
      prerequisite: "Für diese Aufgabe benötigst Du folgendes Grundwissen:",
      task: 'Task',
      right: 'Right',
      wrong: 'Wrong',
      check: 'Check',
      yourAnswer: 'Your answer…',
      chooseOption: 'Click on one of the options.'
    },
    cookie: {
      part1: "Mit der Nutzung dieser Webseite erklärst du dich mit unserer",
      part2: "und",
      part3: "einverstanden.",
      link1: "Datenschutzerklärung",
      link2: "Nutzungsbedingungen",
      button: "Verstanden"
    },
    notifications: {
      notifications: "Benachrichtigungen",
      pleaseLogInLink: "Bitte melde dich an",
      pleaseLogInText: "um deine Benachrichtigungen zu sehen"
    },
    comments: {
      question: "Hast du eine Frage?",
      commentsOne: "Kommentar",
      commentsMany: "Kommentare",
      submit: "Abschicken",
      reportComment: "Kommentar melden",
      archiveThread: "Thread archivieren",
      deleteThread: "Thread löschen",
      deleteComment: "Kommentar löschen",
      postedOn: "Gepostet am",
      placeholder: "Deine Frage oder Vorschlag…",
      placeholderReply: "Deine Antwort…"
    },
    revisions: {
      toOverview: "Back to overview",
      changes: "Changes",
      title: "Title",
      content: "Content",
      metaTitle: "Meta Title",
      metaDescription: "Meta Description",
      compare: "Compare",
      currentVersion: "Current Version",
      thisVersion: "This Version",
      thisIsCurrentVersion: "This is the currently accepted version.",
      by: 'By'
    },
    errors: {
      title: '😬 Websites make mistakes sometimes…',
      defaultMessage: 'So sorry, we ran into a problem loading this content.',
      temporary: 'The good news? The problem seems to be temporary, so please try again later.',
      permanent: 'We will see what we can do about that… ',
      typeNotSupported: 'Please try reloading this page.',
      refreshNow: 'Refresh now',
      backToPrevious: 'Back to previous page',
      backToHome: 'To our home page'
    }
  }
};
export const instanceLandingData = {
  lang: "de",
  strings: {
    vision: "Wir ermöglichen Schüler*innen und Studierenden selbständig und im eigenen Tempo zu lernen – unabhängig von den finanziellen Möglichkeiten ihrer Eltern, denn serlo.org ist und bleibt komplett kostenlos.\n\nUnsere Vision ist es, hochwertige Bildung weltweit frei verfügbar zu machen.",
    learnMore: "Mehr erfahren",
    democraticallyStructured: "demokratisch organisiert",
    nonProfit: 'non-profit',
    transparent: 'transparent',
    openlyLicensed: "frei lizensiert",
    adFree: "werbefrei",
    freeOfCharge: "kostenlos",
    wikiTitle: "Serlo.org ist die Wikipedia fürs Lernen",
    wikiText: "Genau die Wikipedia wird diese Plattform von einer engagierten Autor*innen Community erstellt. Serlo Education wird betrieben von einem dezentralisierten Team Ehrenamtlicher und Professioneller überall auf der Welt.",
    movementTitle: "Werden Sie Teil unserer Bewegung für freie Bildung",
    callForAuthors: "Wir suchen Lehrkräfte mit Begeisterung für ihr Fach. Werden Sie Autor*in auf serlo.org, erstellen Sie neue Inhalte und helfen Sie uns, die Qualität der Lernplattform zu sichern.",
    communityLink: "Zur Startseite für Autor*innen",
    callForOther: "Wir suchen neue hauptamtliche und ehrenamtliche Teammitglieder für die Bereiche Softwareentwicklung, Redaktion und NGO-Management.",
    getInvolved: "Mach mit!"
  }
};
export const serverSideStrings = {
  title: "lernen mit Serlo!"
};
export const loggedInData = {
  authMenu: [{
    url: '/user/notifications',
    title: "Benachrichtigungen",
    icon: 'notifications'
  }, {
    url: '',
    title: "Benutzer",
    icon: 'user',
    children: [{
      url: '/user/public',
      title: "Öffentliches Profil"
    }, {
      url: '/user/settings',
      title: "Profil bearbeiten"
    }, {
      url: '/auth/password/change',
      title: "Passwort aktualisieren"
    }, {
      url: '/event/history/user/me',
      title: "Meine Aktivitäten"
    }, {
      url: '/api/auth/logout',
      title: "Ausloggen"
    }]
  }],
  strings: {
    tools: "Weitere Tools",
    authorMenu: {
      log: "Aktivitätenlog",
      settings: "Einstellungen",
      moveCoursePage: "Kursseite in einen anderen Kurs verschieben",
      thisCoursePage: "Diese Kursseite",
      addCoursePage: "Kursseite hinzufügen",
      wholeCourse: "Gesamter Kurs",
      copyItems: "Element kopieren",
      moveItems: "Elemente verschieben",
      addGroupedTextExercise: "Gruppierte Textaufgabe hinzufügen",
      changeLicense: "Lizenz auswählen",
      subscribe: "Abonnieren",
      subscribeNotifications: "Benachrichtigungen empfangen",
      subscribeNotificationsAndMail: "Benachrichtigungen und E-Mails erhalten",
      convert: "Umwandeln (beta)",
      history: "Bearbeitungsverlauf",
      editAssignments: "Zuweisung zu Themen und Lehrplänen bearbeiten",
      flagContent: "Inhalt melden",
      moveToTrash: "In den Papierkorb verschieben",
      sort: "Unterelemente sortieren",
      edit: "Bearbeiten",
      organize: "Baumstruktur bearbeiten",
      moveToGroupedTextExercise: "Inhalt zu anderer Gruppe verschieben",
      moveToTextExercise: "Inhalt zu anderer Textaufgabe verschieben",
      sortEntities: "Inhalt sortieren",
      newEntity: "Neuer Inhalt"
    },
    notifications: {
      loadMore: "Weitere laden",
      unknownProblem: "Es gibt ein Problem beim laden der Benachrichtigungen, bitte versuche es später noch einmal.",
      loading: "Benachrichtigungen werden geladen",
      hide: "Benachrichtigungen für diesen Inhalt nicht mehr anzeigen.",
      setThreadStateArchived: "%actor% hat einen %thread% archiviert.",
      setThreadStateUnarchived: "%actor% hat einen %thread% unarchiviert.",
      createComment: "%actor% hat einen %comment% in einem %thread% erstellt.",
      createThread: "%actor% hat einen %thread% in einem %object% erstellt.",
      createEntity: "%actor% hat %object% erstellt.",
      setLicense: "%actor% hat die Lizenz von %repository% geändert.",
      createEntityLink: "%actor% hat %child% mit %parent% verknüpft.",
      removeEntityLink: "%actor% hat die Verknüpfung von %child% mit %parent% entfernt.",
      createEntityRevision: "%actor% hat eine %revision% von %entity% erstellt.",
      checkoutRevision: "%actor% hat eine %revision% von %repository% übernommen.",
      rejectRevision: "%actor% hat %revision% für %repository% abgelehnt.",
      createTaxonomyLink: "%actor% hat %child% in %parent% eingeordnet.",
      removeTaxonomyLink: "%actor% hat %child% aus %parent% entfernt.",
      createTaxonomyTerm: "%actor% hat den %term% erstellt.",
      setTaxonomyTerm: "%actor% hat den %term% geändert.",
      setTaxonomyParentDeleted: "%actor% hat den Elternknoten von %child% entfernt.",
      setTaxonomyParentChangedFrom: "%actor% hat den Elternknoten von %child% von %previousparent% auf %parent% geändert.",
      setTaxonomyParentChanged: "%actor% hat den Elternknoten von %child% auf %parent% geändert.",
      setUuidStateTrashed: "%actor% hat %object% in den Papierkorb verschoben.",
      setUuidStateRestored: "%actor% hat %object% aus dem Papierkorb wieder hergestellt.",
      entityPlaceholderFallback: "Content"
    }
  }
};