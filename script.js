// Globale Variablen
let playerName = "";
let selectedAvatar = "";
let currentLevel = 1;
let currentQuestion = 0;
let levelScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
let selectedAnswer = null;

// Quiz-Fragen nach Level
const quizQuestions = {
  1: [
    {
      question: "🤔 Was zum Henker ist diese mysteriöse Riester-Rente eigentlich?",
      options: [
        "Ein staatlich geförderter Geldtopf für dein zukünftiges Ich",
        "Eine langweilige gesetzliche Rentenversicherung",
        "Eine betriebliche Altersvorsorge (gähn...)",
        "Eine Kapitallebensversicherung mit Geheimzutat"
      ],
      correctAnswer: 0,
      explanation: "Bingo! 🎯 Die Riester-Rente ist tatsächlich ein staatlich geförderter Spartopf für deine Zukunft. Benannt nach Walter Riester - dem Finanzminister, der so begeistert von Altersvorsorge war, dass sie seinen Namen bekam. Wie viele Menschen können das von sich behaupten? 😄"
    },
    {
      question: "👥 Wer darf sich im exklusiven Club der Riester-Sparer tummeln?",
      options: [
        "Nur die Elite des öffentlichen Dienstes",
        "Alle sozialversicherungspflichtig Beschäftigten und deren Ehepartner (die große Party!)",
        "Ausschließlich Selbstständige (die Einzelkämpfer)",
        "Nur Menschen über 40 (wenn die Midlife-Crisis zuschlägt)"
      ],
      correctAnswer: 1,
      explanation: "Richtig! 🎉 Die Riester-Party steht fast allen offen: Angestellten, Beamten, Soldaten und deren Ehepartnern. Es ist wie ein VIP-Club, aber mit weniger Champagner und mehr Altersvorsorge. Selbstständige müssen leider draußen bleiben - außer sie sind indirekt über den Ehepartner förderberechtigt. Life hack! 💡"
    },
    {
      question: "💰 Wie viel Taschengeld (Grundzulage) gibt Vater Staat dir jährlich für deine Riester-Rente?",
      options: [
        "75 Euro (gerade genug für ein nettes Abendessen)",
        "114 Euro (immerhin ein Budget-Smartphone)",
        "154 Euro (fast ein Premium-Streaming-Abo)",
        "175 Euro (jetzt wird's interessant!)"
      ],
      correctAnswer: 3,
      explanation: "Korrekt! 🤑 Der Staat spendiert dir satte 175 Euro pro Jahr - einfach so! Das ist wie ein Geburtstagsgeschenk, nur dass du es jedes Jahr bekommst. Und das Beste: Du musst nicht einmal 'Danke' sagen. Brutto kann jeder wäre stolz auf dich!"
    },
    {
      question: "👶 Wie viel Extra-Cash gibt's pro Kind im Riester-Universum?",
      options: [
        "185 Euro für Vintage-Kinder (vor 2008) und 300 Euro für die Neumodels (ab 2008)",
        "Pauschal 200 Euro (Gleichbehandlung und so)",
        "Großzügige 300 Euro für alle Kinder (der Staat liebt alle gleich)",
        "100 Euro für die Oldies, 200 Euro für die Youngsters"
      ],
      correctAnswer: 0,
      explanation: "Absolut richtig! 🎯 Der Staat praktiziert hier eine Art Zwei-Klassen-Gesellschaft: 185 Euro für die vor 2008 Geborenen und satte 300 Euro für die Nachzügler. Warum? Vielleicht weil Kinder wie Wein sind - sie werden mit der Zeit teurer! 😂 Futureproof X weiß: Mehr Kinder = mehr Zulagen = mehr Altersvorsorge. Mathematik kann so schön sein!"
    },
    {
      question: "📊 Wie viel deines hart verdienten Geldes solltest du mindestens in den Riester-Topf werfen, um die volle Förderung abzustauben?",
      options: [
        "2% (für Minimalisten)",
        "4% (die magische Zahl)",
        "6% (für Überachiever)",
        "8% (für Menschen mit zu viel Geld)"
      ],
      correctAnswer: 1,
      explanation: "Genau! 🎯 4% ist die Zauberformel - nicht mehr, nicht weniger. Das ist wie die perfekte Menge Kaffee am Morgen: genug um wach zu werden, aber nicht so viel, dass du zitterst. Maximal 2.100 Euro jährlich - selbst wenn du Millionär bist. Der Staat ist großzügig, aber nicht verrückt! 💸"
    }
  ],
  2: [
    {
      question: "🎁 Was ist dieser mysteriöse Berufseinsteigerbonus, von dem alle jungen Leute schwärmen sollten?",
      options: [
        "Ein lächerlicher Bonus von 100 Euro (kaum der Rede wert)",
        "Eine erhöhte Grundzulage für die ersten drei Berufsjahre (langweilig...)",
        "Ein saftiger Bonus von 200 Euro für alle Jungspunde unter 25 Jahren",
        "Eine Verdoppelung der Grundzulage im ersten Berufsjahr (zu schön, um wahr zu sein)"
      ],
      correctAnswer: 2,
      explanation: "Richtig! 🎯 Der Staat belohnt die Frühstarter mit einem Extra-Geschenk von 200 Euro. Warum? Weil junge Menschen, die an ihre Rente denken, so selten sind wie Einhörner! 🦄 Lady Vorsicht sagt: Wer früh anfängt, hat später mehr Geld zum Ausgeben für Dinge, die alte Menschen mögen... was auch immer das sein mag! 😂"
    },
    {
      question: "🧰 Welche Werkzeuge liegen in der Riester-Toolbox bereit?",
      options: [
        "Nur Banksparpläne (gähn...)",
        "Nur Fondssparpläne (etwas spannender)",
        "Die volle Packung: Banksparpläne, Fondssparpläne, Rentenversicherungen und Wohn-Riester",
        "Ausschließlich Rentenversicherungen (die Klassiker)"
      ],
      correctAnswer: 2,
      explanation: "Bingo! 🎉 Bei Riester ist für jeden etwas dabei - wie bei einem All-you-can-eat-Buffet der Altersvorsorge! Von langweilig-sicheren Banksparplänen bis zu aufregend-riskanten Fondssparplänen. Und mit Wohn-Riester kannst du sogar in Betongold investieren! Brutto kann jeder weiß: Diversifikation ist wie mehrere Desserts probieren - warum sich auf eines beschränken? 🍰"
    },
    {
      question: "🏠 Was verbirgt sich hinter dem geheimnisvollen 'Wohn-Riester'?",
      options: [
        "Eine spezielle Riester-Variante für ewige Mieter",
        "Der Trick, wie du mit Riester-Geld dein eigenes Schloss (oder zumindest eine Wohnung) finanzierst",
        "Eine großzügige Mietbeihilfe für treue Riester-Sparer",
        "Ein Zuschuss für Öko-Freaks, die ihr Haus dämmen wollen"
      ],
      correctAnswer: 1,
      explanation: "Genau! 🏆 Wohn-Riester ist wie ein Immobilien-Hack mit staatlicher Unterstützung! Statt im Alter Geld zu bekommen, kannst du es schon früher für dein Eigenheim nutzen. Futureproof X sagt: Warum auf die Rente warten, wenn du schon jetzt königlich wohnen kannst? 👑 Die eigenen vier Wände sind schließlich die beste Altersvorsorge - außer vielleicht reiche Kinder zu haben! 😜"
    },
    {
      question: "💸 Wie schnappt sich Vater Staat seinen Anteil an deiner Riester-Rente im Alter?",
      options: [
        "Gar nicht - alles steuerfrei (ein schöner Traum)",
        "Mit vollem Zugriff auf dein Riester-Geld - persönlicher Steuersatz sei Dank!",
        "Mit einer gemütlichen Pauschalsteuer von 25% (wie bei Kapitalerträgen)",
        "Nur die Erträge werden besteuert (die Beiträge bleiben unberührt)"
      ],
      correctAnswer: 1,
      explanation: "Korrekt! 🎯 Der Staat hat Gedächtnis wie ein Elefant - er erinnert sich genau, dass er dir beim Einzahlen Steuervorteile gewährt hat. Und jetzt, im Alter, kommt die Rechnung! Das nennt man 'nachgelagerte Besteuerung' - ein schicker Begriff für 'aufgeschobene Steuerzahlung'. Brutto kann jeder warnt: Der Steuermann klingelt immer zweimal! 🔔"
    },
    {
      question: "😱 Was passiert mit deiner geliebten Riester-Rente, wenn plötzlich die Arbeitslosigkeit zuschlägt?",
      options: [
        "Game Over - der Vertrag wird brutal gekündigt",
        "Die Förderung verschwindet schneller als Kekse im Büro",
        "Die Förderung bleibt dir treu - solange du weiter einzahlst (Beziehungsstatus: kompliziert)",
        "Jackpot! Du erhältst eine Sonderzahlung als Trostpflaster"
      ],
      correctAnswer: 2,
      explanation: "Richtig! 👍 Die gute Nachricht: Deine Förderberechtigung bleibt bestehen - wie ein treuer Hund, der auf dich wartet. Die schlechte Nachricht: Um die volle Förderung zu bekommen, musst du trotzdem weiter einzahlen. Lady Vorsicht sagt: Selbst in schweren Zeiten an die Zukunft denken - das ist wahres Heldentum! 🦸‍♀️"
    }
  ],
  3: [
    {
      question: "Was ist der Unterschied zwischen fondsgebundenen und klassischen Riester-Rentenversicherungen?",
      options: [
        "Es gibt keinen Unterschied",
        "Fondsgebundene Verträge bieten höhere Renditechancen bei höherem Risiko",
        "Klassische Verträge haben immer eine höhere Rendite",
        "Fondsgebundene Verträge sind nicht staatlich gefördert"
      ],
      correctAnswer: 1,
      explanation: "Fondsgebundene Riester-Verträge investieren in Investmentfonds und bieten höhere Renditechancen bei höherem Risiko, während klassische Verträge eine garantierte, aber meist niedrigere Verzinsung bieten."
    },
    {
      question: "Was bedeutet die Beitragsgarantie bei Riester-Produkten?",
      options: [
        "Die Beiträge können nicht erhöht werden",
        "Die eingezahlten Beiträge und Zulagen müssen zu Rentenbeginn mindestens zur Verfügung stehen",
        "Die Beiträge sind steuerlich absetzbar",
        "Die Beiträge werden vom Staat verdoppelt"
      ],
      correctAnswer: 1,
      explanation: "Die Beitragsgarantie bedeutet, dass zu Rentenbeginn mindestens die Summe der eingezahlten Beiträge und staatlichen Zulagen zur Verfügung stehen muss."
    },
    {
      question: "Welche Kosten fallen typischerweise bei Riester-Verträgen an?",
      options: [
        "Keine, da staatlich gefördert",
        "Nur einmalige Abschlusskosten",
        "Abschlusskosten, Verwaltungskosten und Vertriebskosten",
        "Ausschließlich jährliche Verwaltungsgebühren"
      ],
      correctAnswer: 2,
      explanation: "Bei Riester-Verträgen fallen typischerweise Abschlusskosten, laufende Verwaltungskosten und Vertriebskosten an, die die Rendite mindern können."
    },
    {
      question: "Was ist der Unterschied zwischen Riester-Rente und Rürup-Rente?",
      options: [
        "Es gibt keinen Unterschied",
        "Riester ist für Angestellte, Rürup für Selbstständige und Freiberufler konzipiert",
        "Riester bietet höhere staatliche Zulagen",
        "Rürup-Renten sind immer fondsgebunden"
      ],
      correctAnswer: 1,
      explanation: "Die Riester-Rente ist primär für Angestellte konzipiert, während die Rürup-Rente (Basisrente) besonders für Selbstständige und Freiberufler gedacht ist, die keine Zulagen, aber hohe Steuervorteile erhalten."
    },
    {
      question: "Wie flexibel sind Riester-Verträge bei finanziellen Engpässen?",
      options: [
        "Gar nicht, Beiträge müssen immer gezahlt werden",
        "Man kann den Vertrag beitragsfrei stellen oder die Beiträge reduzieren",
        "Der Vertrag wird automatisch gekündigt",
        "Man kann nur einmal im Leben aussetzen"
      ],
      correctAnswer: 1,
      explanation: "Bei finanziellen Engpässen kann man Riester-Verträge beitragsfrei stellen oder die Beiträge reduzieren. Allerdings erhält man dann keine oder nur anteilige staatliche Förderung."
    }
  ],
  4: [
    {
      question: "Was ist das 'Riester-Treppchen'?",
      options: [
        "Ein spezielles Auszahlungsmodell",
        "Die stufenweise Erhöhung der Beiträge",
        "Die Staffelung der Zulagen nach Einkommen",
        "Die Mindestbeitragsberechnung für die volle Zulage"
      ],
      correctAnswer: 3,
      explanation: "Das 'Riester-Treppchen' bezeichnet die Berechnung des Mindestbeitrags für die volle Zulage: 4% des Vorjahresbruttoeinkommens abzüglich der Zulagen, mindestens aber 60 Euro jährlich (Sockelbetrag)."
    },
    {
      question: "Welche Auszahlungsoptionen gibt es bei der Riester-Rente im Rentenalter?",
      options: [
        "Nur lebenslange Rente",
        "Nur Einmalzahlung",
        "Lebenslange Rente, bis zu 30% Einmalzahlung zu Rentenbeginn möglich",
        "Komplett flexible Auszahlung nach Wunsch"
      ],
      correctAnswer: 2,
      explanation: "Bei der Riester-Rente ist eine lebenslange Rente vorgeschrieben, jedoch können bis zu 30% des angesparten Kapitals zu Rentenbeginn als Einmalzahlung ausgezahlt werden."
    },
    {
      question: "Wie wirkt sich die Riester-Rente auf die Grundsicherung im Alter aus?",
      options: [
        "Sie wird vollständig auf die Grundsicherung angerechnet",
        "Sie wird gar nicht angerechnet",
        "Es gibt einen Freibetrag von bis zu 100 Euro monatlich",
        "Sie wird nur zur Hälfte angerechnet"
      ],
      correctAnswer: 2,
      explanation: "Seit 2018 gibt es einen Freibetrag für zusätzliche Altersvorsorge bei der Grundsicherung. Riester-Renten werden nicht voll angerechnet, sondern es gibt einen Freibetrag von bis zu 100 Euro monatlich plus 30% des darüber liegenden Betrags."
    },
    {
      question: "Was passiert mit dem Riester-Vertrag im Todesfall vor Rentenbeginn?",
      options: [
        "Das Kapital fällt immer an den Staat zurück",
        "Das angesparte Kapital geht an die Erben, die Zulagen müssen zurückgezahlt werden",
        "Das angesparte Kapital inkl. Zulagen kann an den Ehepartner übertragen werden",
        "Der Vertrag verfällt komplett"
      ],
      correctAnswer: 2,
      explanation: "Im Todesfall vor Rentenbeginn kann das angesparte Kapital inklusive Zulagen auf einen Riester-Vertrag des Ehepartners übertragen werden. Alternativ erhalten die Erben das Kapital, müssen aber die Zulagen zurückzahlen."
    },
    {
      question: "Welche Besonderheit gilt bei der Riester-Rente für Geringverdiener?",
      options: [
        "Sie erhalten keine Förderung",
        "Sie erhalten eine doppelte Grundzulage",
        "Sie können einen Zuschuss von bis zu 200 Euro erhalten (Geringverdiener-Bonus)",
        "Sie müssen nur 2% ihres Einkommens einzahlen"
      ],
      correctAnswer: 2,
      explanation: "Geringverdiener mit einem zu versteuernden Einkommen unter 20.000 Euro können einen zusätzlichen Bonus von bis zu 200 Euro erhalten, den sogenannten Geringverdiener-Bonus."
    }
  ],
  5: [
    {
      question: "Was ist der 'Wohn-Riester-Förderpfad'?",
      options: [
        "Ein spezieller Kredit für energetische Sanierungen",
        "Die Verwendung von Riester-Guthaben für Immobilienkauf/-bau und die spätere Besteuerung",
        "Ein Förderprogramm für Mietwohnungen",
        "Eine Sonderform der Grundzulage"
      ],
      correctAnswer: 1,
      explanation: "Der 'Wohn-Riester-Förderpfad' beschreibt den Prozess der Entnahme von Riester-Guthaben für den Immobilienkauf/-bau und die spätere nachgelagerte Besteuerung über das Wohnförderkonto."
    },
    {
      question: "Was ist das 'Wohnförderkonto' bei Wohn-Riester?",
      options: [
        "Ein Sparkonto für die Mietkaution",
        "Ein fiktives Konto, auf dem die für Wohneigentum genutzten Beträge inkl. Zulagen und 2% Zinsen p.a. bis zum Rentenalter geführt werden",
        "Ein Konto für die monatlichen Tilgungsraten",
        "Ein Konto für die Grundsteuer"
      ],
      correctAnswer: 1,
      explanation: "Das Wohnförderkonto ist ein fiktives Konto, auf dem die für Wohneigentum genutzten Riester-Beträge inklusive Zulagen geführt werden. Es wird jährlich mit 2% verzinst und bildet die Grundlage für die spätere Besteuerung."
    },
    {
      question: "Welche Besonderheit gilt bei der Riester-Rente für die Auszahlungsphase seit 2018?",
      options: [
        "Die Auszahlungen sind komplett steuerfrei",
        "Es gibt einen Rentenfreibetrag von 30%",
        "Die Auszahlungen werden mit einem Pauschalbetrag versteuert",
        "Es gibt einen Freibetrag bei der Grundsicherung im Alter"
      ],
      correctAnswer: 3,
      explanation: "Seit 2018 gibt es einen Freibetrag bei der Grundsicherung im Alter für zusätzliche Altersvorsorge wie die Riester-Rente. Bis zu 100 Euro monatlich plus 30% des darüber liegenden Betrags werden nicht auf die Grundsicherung angerechnet."
    },
    {
      question: "Was ist der Unterschied zwischen Zulagenförderung und Steuerförderung bei der Riester-Rente?",
      options: [
        "Es gibt keinen Unterschied",
        "Zulagenförderung ist für Geringverdiener, Steuerförderung für Gutverdiener vorteilhafter",
        "Zulagenförderung ist für alle gleich, Steuerförderung hängt vom Steuersatz ab",
        "Man kann nur eine der beiden Förderungen erhalten"
      ],
      correctAnswer: 1,
      explanation: "Bei der Riester-Rente gibt es zwei Förderarten: Die Zulagenförderung (Grund- und Kinderzulagen) ist besonders für Geringverdiener und Familien vorteilhaft, während die Steuerförderung (Sonderausgabenabzug) mit steigendem Einkommen und Steuersatz attraktiver wird."
    },
    {
      question: "Welche Änderungen sind bei der Riester-Rente in den letzten Jahren eingeführt worden?",
      options: [
        "Abschaffung der Zulagen",
        "Erhöhung der Grundzulage auf 175 Euro und Einführung des Freibetrags bei der Grundsicherung",
        "Komplette Steuerfreiheit in der Auszahlungsphase",
        "Abschaffung der Beitragsgarantie"
      ],
      correctAnswer: 1,
      explanation: "In den letzten Jahren wurde die Grundzulage von 154 auf 175 Euro erhöht und ein Freibetrag bei der Grundsicherung im Alter eingeführt. Zudem wurden die Informationspflichten der Anbieter verschärft und Produktinformationsblätter eingeführt."
    }
  ]
};

// Event-Listener beim Laden der Seite
document.addEventListener('DOMContentLoaded', function() {
    // Sicherstellen, dass alle Systeme initialisiert sind
    initializeSystems();
    
    // Event-Listener für Benutzerinteraktion hinzufügen, um AudioContext zu starten
    document.addEventListener('click', function initAudioOnFirstClick() {
      if (window.audioContext && window.audioContext.state === 'suspended') {
        window.audioContext.resume();
        console.log('AudioContext resumed nach Benutzerinteraktion');
      }
      document.removeEventListener('click', initAudioOnFirstClick);
    }, { once: true });
  });
  
  // Alle Systeme initialisieren
  function initializeSystems() {
    // Audio-System initialisieren
    if (window.audioSystem) {
      console.log('Verwende bestehendes Audio-System');
      window.audioSystem.playBackgroundMusic('menu', 500);
    } else if (typeof AudioSystem !== 'undefined') {
      // Nur initialisieren, wenn es noch nicht existiert
      window.audioSystem = new AudioSystem();
      console.log('Audio-System in script.js initialisiert');
      window.audioSystem.playBackgroundMusic('menu');
    }
    
    // Effekt-System initialisieren
    if (!window.effectSystem && typeof initEffects === 'function') {
      console.log('Effekt-System in script.js initialisiert');
      initEffects();
    }
    
    // Battle-Effects-System initialisieren
    if (!window.battleEffects && typeof initBattleEffects === 'function') {
      console.log('Battle-Effects-System in script.js initialisiert');
      initBattleEffects();
    }
    
    // Text-Animations-System initialisieren
    if (typeof TextAnimations !== 'undefined') {
      window.textAnimations = new TextAnimations();
      console.log('Text-Animations-System initialisiert');
    }
    
    // Fog-Effects-System initialisieren
    if (typeof FogEffects !== 'undefined' && !window.fogEffects) {
      window.fogEffects = new FogEffects();
      console.log('Fog-Effects-System initialisiert');
    }
  }
  
  // Start-Button
  document.getElementById('startButton').addEventListener('click', async function() {
    // Klick-Sound abspielen
    window.audioSystem.playSoundEffect('click');
    // Hintergrundmusik für Menü starten
    window.audioSystem.playBackgroundMusic('menu');
    // Intro-Cutscene anzeigen
    await showCutscene(epicStory.intro);
    showPlayerInfoScreen();
  });
  
  // Spielername-Eingabe
  document.getElementById('playerName').addEventListener('input', checkPlayerInfo);
  
  // Avatar-Auswahl
  const avatars = document.querySelectorAll('.avatar');
  avatars.forEach(avatar => {
    avatar.addEventListener('click', function() {
      // Klick-Sound abspielen
      window.audioSystem.playSoundEffect('click');
      
      avatars.forEach(a => a.classList.remove('selected'));
      this.classList.add('selected');
      selectedAvatar = this.getAttribute('data-avatar');
      checkPlayerInfo();
    });
  });
  
  // Start-Quiz-Button
  document.getElementById('startQuizButton').addEventListener('click', function() {
    // Klick-Sound abspielen
    window.audioSystem.playSoundEffect('click');
    showLevelSelectScreen();
  });
  
  // Level-Auswahl
  const levelCards = document.querySelectorAll('.level-card');
  levelCards.forEach(card => {
    card.addEventListener('click', async function() {
      if (!this.classList.contains('locked')) {
        // Klick-Sound abspielen
        window.audioSystem.playSoundEffect('click');
        
        currentLevel = parseInt(this.getAttribute('data-level'));
        
        // Kampfmusik starten, wenn Level 5 (Boss) ausgewählt wird
        if (currentLevel === 5) {
          window.audioSystem.playBackgroundMusic('boss');
          window.audioSystem.playSoundEffect('bossAppear');
        } else {
          // Normale Kampfmusik für andere Level
          window.audioSystem.playBackgroundMusic('battle');
        }
        
        // Story-Cutscene vor dem Level anzeigen
        await showCutscene(epicStory['level' + currentLevel].before, currentLevel, true);
        
        // Gegner anzeigen
        await showEnemy(currentLevel);
        
        // Dynamischen Hintergrund für den Kampf setzen
        if (window.effectSystem && window.effectSystem.createDynamicBackground) {
          if (currentLevel === 5) {
            // Spezieller Hintergrund für Boss-Level
            window.effectSystem.createDynamicBackground('quizScreen', 'boss');
          } else {
            window.effectSystem.createDynamicBackground('quizScreen', 'battle');
          }
        }
        
        startQuiz();
      } else {
        // Sound für gesperrtes Level
        window.audioSystem.playSoundEffect('wrong');
      }
    });
  });
  
  // Nächste-Frage-Button
  document.getElementById('nextQuestionButton').addEventListener('click', showNextQuestion);
  
  // Nächstes-Level-Button
  document.getElementById('nextLevelButton').addEventListener('click', async function() {
    // Klick-Sound abspielen
    window.audioSystem.playSoundEffect('click');
    
    currentLevel++;
    if (currentLevel > 5) {
      await showCutscene(epicStory.finale);
      showVictoryScreen();
    } else {
      startQuiz();
    }
  });
  
  // Zurück-zur-Levelauswahl-Button
  document.getElementById('backToLevelsButton').addEventListener('click', function() {
    // Klick-Sound abspielen
    window.audioSystem.playSoundEffect('click');
    // Menü-Musik wieder starten
    window.audioSystem.playBackgroundMusic('menu');
    showLevelSelectScreen();
  });
  
  // Zertifikat-erstellen-Button
  document.getElementById('generateCertificateButton').addEventListener('click', function() {
    // Klick-Sound abspielen
    window.audioSystem.playSoundEffect('click');
    generateCertificate();
  });
  
  // Neustart-Button
  document.getElementById('restartGameButton').addEventListener('click', function() {
    // Klick-Sound abspielen
    window.audioSystem.playSoundEffect('click');
    // Menü-Musik wieder starten
    window.audioSystem.playBackgroundMusic('menu');
    resetGame();
    showStartScreen();
  });
;

// Bildschirm-Funktionen
function hideAllScreens() {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => screen.classList.remove('visible'));
}

function showStartScreen() {
  hideAllScreens();
  document.getElementById('startScreen').classList.add('visible');
}

function showPlayerInfoScreen() {
  hideAllScreens();
  document.getElementById('playerInfoScreen').classList.add('visible');
}

function showLevelSelectScreen() {
  hideAllScreens();
  document.getElementById('levelSelectScreen').classList.add('visible');
  updatePlayerInfo();
  updateLevelStatus();
}

// Spieler-Info aktualisieren
function checkPlayerInfo() {
  const nameInput = document.getElementById('playerName');
  const startQuizButton = document.getElementById('startQuizButton');
  
  playerName = nameInput.value.trim();
  
  if (playerName && selectedAvatar) {
    startQuizButton.disabled = false;
  } else {
    startQuizButton.disabled = true;
  }
}

function updatePlayerInfo() {
  const playerNameDisplay = document.getElementById('playerNameDisplay');
  const playerAvatarDiv = document.getElementById('playerAvatar');
  
  playerNameDisplay.textContent = playerName;
  
  let avatarSeed;
  switch(selectedAvatar) {
    case 'Brutto kann jeder': avatarSeed = 'superhero'; break;
    case 'Lady Vorsicht': avatarSeed = 'detective'; break;
    case 'Futureproof X': avatarSeed = 'scientist'; break;
    default: avatarSeed = 'default';
  }
  
  playerAvatarDiv.innerHTML = `<img src="https://api.dicebear.com/6.x/bottts/svg?seed=${avatarSeed}" alt="${selectedAvatar}">`;
}

// Level-Status aktualisieren
function updateLevelStatus() {
  const levelCards = document.querySelectorAll('.level-card');
  
  levelCards.forEach(card => {
    const level = parseInt(card.getAttribute('data-level'));
    const statusDiv = card.querySelector('.level-status');
    
    // Level 1 ist immer entsperrt
    if (level === 1) {
      card.classList.remove('locked');
      if (levelScores[1] > 0) {
        statusDiv.textContent = `${levelScores[1]}/5 Punkte`;
        card.classList.add('completed');
      } else {
        statusDiv.textContent = 'Bereit';
        card.classList.remove('completed');
      }
    } 
    // Andere Level sind entsperrt, wenn das vorherige Level gespielt wurde
    else if (levelScores[level-1] > 0) {
      card.classList.remove('locked');
      if (levelScores[level] > 0) {
        statusDiv.textContent = `${levelScores[level]}/5 Punkte`;
        card.classList.add('completed');
      } else {
        statusDiv.textContent = 'Bereit';
        card.classList.remove('completed');
      }
    } 
    // Ansonsten gesperrt
    else {
      card.classList.add('locked');
      card.classList.remove('completed');
      statusDiv.textContent = 'Gesperrt';
    }
  });
}

// Quiz starten
function startQuiz() {
  currentQuestion = 0;
  selectedAnswer = null;
  hideAllScreens();
  document.getElementById('quizScreen').classList.add('visible');
  document.getElementById('currentLevelDisplay').textContent = `Level ${currentLevel}`;
  
  // Aktuellen Gegner anzeigen
  const enemy = enemies[currentLevel];
  document.getElementById('currentEnemyImage').src = enemy.image;
  document.getElementById('currentEnemyName').textContent = enemy.name;
  
  // Gegner-Gesundheitsbalken zurücksetzen
  document.getElementById('enemyHealthBar').style.width = '100%';
  
  // Gegner-Schadenszustand zurücksetzen
  if (window.battleEffects) {
    window.battleEffects.resetEnemyDamageState();
    window.battleEffects.setupLevelBackgrounds();
    
    // Erweiterte Gegner-Story anzeigen
    setTimeout(() => {
      window.battleEffects.showEnemyStory(currentLevel);
    }, 500);
  }
  
  showQuestion();
}

// Frage anzeigen
function showQuestion() {
  const questionData = quizQuestions[currentLevel][currentQuestion];
  const questionContainer = document.getElementById('questionContainer');
  const questionText = document.getElementById('questionText');
  const answerOptions = document.getElementById('answerOptions');
  const questionCounter = document.getElementById('questionCounter');
  const progressBar = document.getElementById('progressBar');
  const feedbackContainer = document.getElementById('feedbackContainer');
  
  // Feedback ausblenden
  feedbackContainer.style.display = 'none';
  
  // Frage und Zähler aktualisieren
  questionText.textContent = questionData.question;
  questionCounter.textContent = `Frage ${currentQuestion + 1}/5`;
  
  // Fortschrittsbalken aktualisieren mit Animation
  const progress = ((currentQuestion) / 5) * 100;
  progressBar.style.transition = 'width 0.8s cubic-bezier(0.65, 0, 0.35, 1)';
  progressBar.style.width = `${progress}%`;
  
  // Antwortoptionen mit Animation erstellen
  answerOptions.innerHTML = '';
  questionContainer.classList.remove('animate__fadeIn');
  void questionContainer.offsetWidth; // Reflow erzwingen
  questionContainer.classList.add('animate__fadeIn');
  
  questionData.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.classList.add('answer-option');
    optionElement.textContent = option;
    optionElement.setAttribute('data-index', index);
    
    // Verzögerung für Kaskaden-Effekt
    optionElement.style.animationDelay = `${index * 0.15}s`;
    
    // Klick-Sound hinzufügen
    const originalSelectAnswer = selectAnswer;
    const enhancedSelectAnswer = function(event) {
      // Klick-Sound abspielen
      if (window.audioSystem) {
        window.audioSystem.playSoundEffect('click');
      }
      originalSelectAnswer.call(this, event);
    };
    
    optionElement.addEventListener('click', enhancedSelectAnswer);
    answerOptions.appendChild(optionElement);
  });
  
  // Animation hinzufügen
  questionContainer.classList.remove('animate__fadeIn');
  void questionContainer.offsetWidth; // Reflow erzwingen
  questionContainer.classList.add('animate__fadeIn');
}

// Antwort auswählen und prüfen
function selectAnswer(event) {
  const selectedOption = event.currentTarget;
  const answerOptions = document.querySelectorAll('.answer-option');
  const questionData = quizQuestions[currentLevel][currentQuestion];
  const feedbackContainer = document.getElementById('feedbackContainer');
  const feedbackText = document.getElementById('feedbackText');
  
  // Bereits ausgewählte Antworten zurücksetzen
  answerOptions.forEach(option => {
    option.classList.remove('selected', 'correct', 'incorrect');
    option.removeEventListener('click', selectAnswer);
  });
  
  // Ausgewählte Antwort markieren
  selectedOption.classList.add('selected');
  selectedAnswer = parseInt(selectedOption.getAttribute('data-index'));
  
  // Richtige Antwort markieren und Feedback mit Animation anzeigen
  setTimeout(() => {
    const correctOption = answerOptions[questionData.correctAnswer];
    correctOption.classList.add('correct');
    
    if (selectedAnswer === questionData.correctAnswer) {
      // Sound für richtige Antwort
      window.audioSystem.playSoundEffect('correct');
      
      feedbackText.innerHTML = `<div class="feedback-header correct-text animate__animated animate__pulse">🎉 Volltreffer! 🎯</div><div class="feedback-explanation animate__animated animate__fadeIn animate__delay-1s">${questionData.explanation}</div>`;
      levelScores[currentLevel]++;
      document.getElementById('currentScore').textContent = levelScores[currentLevel];
      
      // Gegner-Gesundheitsbalken reduzieren
      const healthBar = document.getElementById('enemyHealthBar');
      const currentWidth = parseInt(healthBar.style.width) || 100;
      const newWidth = currentWidth - 20; // 20% pro richtige Antwort
      healthBar.style.width = `${newWidth}%`;
      
      // Gegner-Bild wackeln lassen
      const enemyImage = document.getElementById('currentEnemyImage');
      enemyImage.classList.add('animate__animated', 'animate__shakeX');
      setTimeout(() => {
        enemyImage.classList.remove('animate__animated', 'animate__shakeX');
      }, 1000);
      
      // Erweiterte Kampf-Effekte: Blitze und Funken
      if (window.battleEffects) {
        // Blitz- und Funken-Effekt auf Gegner
        window.battleEffects.createLightningEffect(enemyImage);
        window.battleEffects.createSparkEffect(enemyImage);
        
        // Gegner-Schadenszustand erhöhen
        document.dispatchEvent(new CustomEvent('enemyDamaged'));
      }
      
      // Events auslösen für battle-effects.js
      document.dispatchEvent(new CustomEvent('correctAnswer'));
    } else {
      // Sound für falsche Antwort
      window.audioSystem.playSoundEffect('wrong');
      
      selectedOption.classList.add('incorrect');
      feedbackText.innerHTML = `<div class="feedback-header incorrect-text animate__animated animate__headShake">😱 Autsch! Daneben!</div><div class="feedback-correct">Die Weisheit wäre gewesen: ${questionData.options[questionData.correctAnswer]}</div><div class="feedback-explanation animate__animated animate__fadeIn animate__delay-1s">${questionData.explanation}</div>`;
      
      // Event auslösen
      document.dispatchEvent(new CustomEvent('wrongAnswer'));
    }
    
    feedbackContainer.style.display = 'block';
    feedbackContainer.classList.add('animate__animated', 'animate__fadeInUp');
  }, 500);
}

// Nächste Frage anzeigen
function showNextQuestion() {
  // Klick-Sound abspielen
  window.audioSystem.playSoundEffect('click');
  
  currentQuestion++;
  
  if (currentQuestion < 5) {
    showQuestion();
  } else {
    showLevelComplete();
  }
}

// Level abgeschlossen
async function showLevelComplete() {
  // Level-Abschluss-Sound abspielen
  window.audioSystem.playSoundEffect('levelUp');
  
  // Levelaufstiegseffekt
  if (window.effectSystem && window.effectSystem.levelUpEffect) {
    // Bildschirmblitz für Levelaufstieg
    const flash = document.createElement('div');
    flash.className = 'level-up-flash';
    document.body.appendChild(flash);
    
    // Nach der Animation entfernen
    setTimeout(() => {
      flash.remove();
    }, 1000);
  }
  
  // Erweiterte Niederlage-Animation für den Gegner
  if (window.battleEffects) {
    window.battleEffects.playEnemyDefeatAnimation();
    // Kurze Pause für die Animation
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Zuerst den besiegten Gegner anzeigen
  await showEnemyDefeat(currentLevel);
  
  // Dann die Cutscene nach dem Level anzeigen
  await showCutscene(epicStory['level' + currentLevel].after, currentLevel, false);
  
  hideAllScreens();
  document.getElementById('levelCompleteScreen').classList.add('visible');
  document.getElementById('completedLevel').textContent = currentLevel;
  document.getElementById('levelScore').textContent = levelScores[currentLevel];
  
  // Sterne anzeigen basierend auf der Punktzahl mit Animation
  const starsContainer = document.getElementById('starsContainer');
  starsContainer.innerHTML = '';
  
  // Konfetti-Effekt für gute Leistung
  if (levelScores[currentLevel] >= 4) {
    createConfetti();
  }
  
  for (let i = 0; i < 5; i++) {
    const starSpan = document.createElement('span');
    starSpan.classList.add('star');
    starSpan.innerHTML = '★';
    starSpan.style.animationDelay = `${i * 0.3}s`;
    
    // Verzögerte Klassen-Hinzufügung für Animation
    if (i < levelScores[currentLevel]) {
      setTimeout(() => {
        starSpan.classList.add('earned');
      }, i * 300);
    }
    starsContainer.appendChild(starSpan);
  }
  
  // Nächstes Level Button aktivieren/deaktivieren
  const nextLevelButton = document.getElementById('nextLevelButton');
  if (currentLevel === 5) {
    nextLevelButton.textContent = 'Zum Abschluss';
  } else {
    nextLevelButton.textContent = 'Nächstes Level';
    
    // Freischalt-Sound abspielen
    if (window.audioSystem) {
      window.audioSystem.playSoundEffect('powerUp');
    }
  }
  
  // Spielsperre setzen, wenn alle Level abgeschlossen sind
  if (Object.values(levelScores).every(score => score > 0)) {
    lockGameFor24Hours();
  }
}

// Konfetti-Effekt erstellen
function createConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti-container';
  document.body.appendChild(confettiContainer);
  
  // Verschiedene Farben für die Konfetti-Partikel
  const colors = ['#3b82f6', '#1e3a8a', '#fbbf24', '#16a34a', '#ef4444', '#8800ff', '#ff8800'];
  
  // 150 Konfetti-Partikel erstellen mit besserer Verteilung
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    // Gleichmäßigere Verteilung über die gesamte Breite
    confetti.style.left = (i % 15) * 7 + Math.random() * 5 + '%';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confettiContainer.appendChild(confetti);
  }
  
  // Konfetti nach 8 Sekunden entfernen
  setTimeout(() => {
    confettiContainer.remove();
  }, 8000);
}

  // Siegesbildschirm anzeigen
  function showVictoryScreen() {
    // Siegesmusik abspielen
    window.audioSystem.playBackgroundMusic('victory');
    window.audioSystem.playSoundEffect('levelUp');
    
    hideAllScreens();
    document.getElementById('victoryScreen').classList.add('visible');
    
    // Gesamtpunktzahl berechnen und anzeigen
    const totalScore = Object.values(levelScores).reduce((a, b) => a + b, 0);
    document.getElementById('totalScore').textContent = totalScore;
    
    // Bewertung basierend auf der Gesamtpunktzahl
    let rating = '';
    if (totalScore >= 20) {
      rating = 'Zulagen-Superheld 🦸‍♂️';
    } else if (totalScore >= 15) {
      rating = 'Renten-Ninja 🥷';
    } else if (totalScore >= 10) {
      rating = 'Vorsorge-Virtuose 🧙‍♂️';
    } else {
      rating = 'Riester-Rookie 🌱';
    }
    document.getElementById('playerRating').textContent = rating;
  }
  
  // Zertifikat generieren
  function generateCertificate() {
      console.log("Generiere Zertifikat");
      
      const canvas = document.getElementById('certificateCanvas');
      if (!canvas) {
        console.error("Canvas-Element für Zertifikat nicht gefunden!");
        alert("Fehler beim Erstellen des Zertifikats. Bitte versuche es erneut.");
        return;
      }
      
      const ctx = canvas.getContext('2d');
      const date = new Date().toLocaleDateString('de-DE');
      const totalScore = Object.values(levelScores).reduce((a, b) => a + b, 0);
      
      // Bewertung basierend auf der Gesamtpunktzahl
      let rating = '';
      if (totalScore >= 20) {
        rating = 'Zulagen-Superheld 🦸‍♂️';
      } else if (totalScore >= 15) {
        rating = 'Renten-Ninja 🥷';
      } else if (totalScore >= 10) {
        rating = 'Vorsorge-Virtuose 🧙‍♂️';
      } else {
        rating = 'Riester-Rookie 🌱';
      }

      try {
        // Hintergrund mit Farbverlauf
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#f0f9ff');
        gradient.addColorStop(1, '#e0f2fe');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dekorative Elemente
        ctx.fillStyle = 'rgba(59, 130, 246, 0.05)';
        for (let i = 0; i < 10; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 50 + 20;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Eleganter Rahmen
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 12;
        ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);
        
        // Innerer Rahmen
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

        // Titel mit Schatten
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillStyle = '#1e3a8a';
        ctx.font = 'bold 48px Segoe UI, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Urkunde', canvas.width / 2, 100);
        
        // Schatten zurücksetzen
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Name mit größerer Schrift
        ctx.font = 'bold 32px Segoe UI, Arial, sans-serif';
        ctx.fillText(`${playerName}`, canvas.width / 2, 170);
        
        // Dekorative Linie
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(canvas.width/2 - 150, 185);
        ctx.lineTo(canvas.width/2 + 150, 185);
        ctx.stroke();
        
        // Titel und Text
        ctx.fillStyle = '#1e3a8a';
        ctx.font = '22px Segoe UI, Arial, sans-serif';
        ctx.fillText('hat das Quiz der Riester-Helden mit Bravour gemeistert 🎓', canvas.width / 2, 230);
        ctx.fillText('und darf sich ab sofort stolz', canvas.width / 2, 260);
        
        // Bewertung hervorheben
        ctx.font = 'bold 28px Segoe UI, Arial, sans-serif';
        ctx.fillStyle = '#2563eb';
        ctx.fillText(`"${rating}"`, canvas.width / 2, 300);
        
        // Zurück zu normalem Text
        ctx.fillStyle = '#1e3a8a';
        ctx.font = '22px Segoe UI, Arial, sans-serif';
        ctx.fillText('nennen.', canvas.width / 2, 330);

        // Punkte in einem schönen Rahmen
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(canvas.width/2 - 150, 350, 300, 60);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.strokeRect(canvas.width/2 - 150, 350, 300, 60);
        
        ctx.fillStyle = '#1e3a8a';
        ctx.font = 'bold 20px Segoe UI, Arial, sans-serif';
        ctx.fillText(`Gesamtpunktzahl: ${totalScore} von 25 Punkten`, canvas.width / 2, 385);

        // Datum und Signatur
        ctx.font = '18px Segoe UI, Arial, sans-serif';
        ctx.fillText(`Ausgestellt am ${date}`, canvas.width / 2, 440);
        
        // Avatar-Bild
        let avatarSeed;
        switch(selectedAvatar) {
          case 'Zulagen-Zorro': avatarSeed = 'superhero'; break;
          case 'Renten-Ranger': avatarSeed = 'detective'; break;
          case 'Finanz-Fuchs': avatarSeed = 'scientist'; break;
          default: avatarSeed = 'default';
        }
        
        // Siegel/Stempel-Effekt
        ctx.beginPath();
        ctx.arc(canvas.width/2, 500, 50, 0, Math.PI * 2);
        ctx.fillStyle = '#dbeafe';
        ctx.fill();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.font = 'bold 16px Segoe UI, Arial, sans-serif';
        ctx.fillStyle = '#1e3a8a';
        ctx.fillText('RIESTER', canvas.width/2, 490);
        ctx.fillText('HELDEN 💰', canvas.width/2, 510);

        // Button aktivieren
        canvas.style.display = 'block';
        const downloadLink = document.getElementById('downloadLink');
        if (downloadLink) {
          try {
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.style.display = 'inline-block';
            downloadLink.classList.add('animate__animated', 'animate__bounceIn');
          } catch (err) {
            console.error("Fehler beim Erstellen des Download-Links:", err);
            alert("Das Zertifikat wurde erstellt, kann aber nicht heruntergeladen werden.");
          }
        } else {
          console.error("Download-Link nicht gefunden!");
        }
      } catch (err) {
        console.error("Fehler beim Erstellen des Zertifikats:", err);
        alert("Es ist ein Fehler beim Erstellen des Zertifikats aufgetreten. Bitte versuche es später erneut.");
      }
    }
  
  // Spiel zurücksetzen
  function resetGame() {
    playerName = "";
    selectedAvatar = "";
    currentLevel = 1;
    currentQuestion = 0;
    levelScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    selectedAnswer = null;
  }
  
  // Spielsperre für 24 Stunden
  function lockGameFor24Hours() {
    const lockTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    localStorage.setItem('quizLockTime', lockTime);
  }