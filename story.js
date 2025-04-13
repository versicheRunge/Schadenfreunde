// Story und Gegner für das Riester-Quiz

// Hauptgeschichte des Spiels
const epicStory = {
  intro: {
    title: "Die Legende beginnt",
    content: `<p>In einer Welt, in der finanzielle Unwissenheit die Menschen in den Abgrund treibt, erhebt sich ein Held...</p>
    <p>Du bist auserwählt worden, um gegen die dunklen Mächte der Altersarmut zu kämpfen!</p>
    <p>Doch der Weg wird nicht leicht sein. Mächtige Gegner werden versuchen, dich aufzuhalten.</p>
    <p>Und am Ende wartet der gefürchtete Finanzminister auf dich, der dein Wissen auf die ultimative Probe stellen wird!</p>`
  },
  level1: {
    before: {
      title: "Der erste Schritt",
      content: `<p>Dein Abenteuer beginnt in den Tiefen des Riester-Dschungels.</p>
      <p>Hier lauert der erste Gegner: Dr. Ignoramus!</p>
      <p>Nach seinem tragischen Unfall mit einem Aktenschrank verbreitet er aktiv Fehlinformationen über die Grundlagen der Riester-Rente.</p>
      <p>Besiege ihn mit deinem Wissen und befreie ihn von seiner selbstgewählten Ignoranz!</p>`
    },
    after: {
      title: "Sieg über die Unwissenheit",
      content: `<p>Dr. Ignoramus hält sich den Kopf, während Wissen in sein Gehirn zurückfließt!</p>
      <p>"Es ist so... unangenehm! Wie konntest du meine sorgfältig konstruierten Fehlinformationen durchschauen?" stöhnt er, bevor er in einer Wolke aus Paragraphen verschwindet.</p>
      <p>Du hast die Grundlagen gemeistert, aber größere Herausforderungen warten auf dich...</p>`
    }
  },
  level2: {
    before: {
      title: "Die Zulagen-Höhle",
      content: `<p>Dein Weg führt dich zur mysteriösen Zulagen-Höhle.</p>
      <p>Hier herrscht Paragraphen-Polly, die die Zulagen mit komplizierten Formularen und absurden Vorschriften bewacht.</p>
      <p>"Du brauchst Formular 38B-7, in dreifacher Ausfertigung, beglaubigt von einem Notar, der an einem Dienstag geboren wurde!" kreischt sie dir entgegen.</p>
      <p>Zeige ihr, dass du die Geheimnisse der Zulagen kennst und durch ihren bürokratischen Irrgarten navigieren kannst!</p>`
    },
    after: {
      title: "Meister der Zulagen",
      content: `<p>Paragraphen-Polly starrt ungläubig auf deine perfekt ausgefüllten mentalen Formulare.</p>
      <p>"Unmöglich! Du hast sogar den Kleingedruckten-Knoten entschlüsselt und den Berufseinsteigerbonus gefunden!" stöhnt sie verzweifelt.</p>
      <p>Mit einem letzten Stempel auf ihrer Stirn sinkt sie zu Boden, während ihre Formulare sich in Konfetti verwandeln.</p>
      <p>Die Zulagen gehören nun dir, aber der Weg zum finanziellen Ruhm ist noch weit...</p>`
    }
  },
  level3: {
    before: {
      title: "Der Produkt-Irrgarten",
      content: `<p>Vor dir erstreckt sich ein verwirrender Irrgarten aus verschiedenen Riester-Produkten.</p>
      <p>In der Mitte tobt Captain Chaos, ein gescheiterter Finanzberater mit multipler Persönlichkeitsstörung.</p>
      <p>Jede seiner Persönlichkeiten ist von einem anderen Riester-Produkt besessen und versucht, die anderen zu überschreien.</p>
      <p>"Banksparpläne sind GENIAL! Nein, FONDSSPARPLÄNE! NEIN, RENTENVERSICHERUNGEN! AAAAH!" brüllt er und wirft wild mit Produktbroschüren um sich.</p>
      <p>Nur mit tiefem Produktwissen kannst du ihn bezwingen und seine Persönlichkeiten vereinen!</p>`
    },
    after: {
      title: "Durchblick im Produkt-Dschungel",
      content: `<p>Mit jedem richtigen Wissen über die verschiedenen Produkte wird eine von Captain Chaos' Persönlichkeiten ruhiger!</p>
      <p>"Nein! Du bringst alle meine Persönlichkeiten zum Schweigen mit... fundiertem Wissen!" kreischt er verzweifelt.</p>
      <p>Mit deinem umfassenden Wissen über die Produktvielfalt hast du seine chaotischen Persönlichkeiten harmonisiert.</p>
      <p>Der Weg zum nächsten Level ist frei, aber die schwersten Prüfungen stehen noch bevor...</p>`
    }
  },
  level4: {
    before: {
      title: "Die Steuerfestung",
      content: `<p>Eine düstere Festung ragt vor dir auf - die gefürchtete Steuerfestung!</p>
      <p>Hier herrscht Lady Steuersauger, eine aristokratische Steuerprüferin aus dem 18. Jahrhundert, die durch einen verfluchten Steuerbescheid unsterblich wurde.</p>
      <p>"Deine Steuervorteile gehören MIR! Ich werde deine Freibeträge aussaugen und deine Absetzbarkeit in den Abgrund stürzen!" droht sie mit einem fiesen Grinsen.</p>
      <p>Nur mit dem Licht des Steuerwissens kannst du sie in die Flucht schlagen!</p>`
    },
    after: {
      title: "Herr der Steuervorteile",
      content: `<p>Lady Steuersauger kreischt, als du sie mit deinem strahlenden Steuerwissen blendest!</p>
      <p>"Das Licht! Es brennt! Nachgelagerte Besteuerung... Sonderausgabenabzug... zu viel Wissen!" jammert sie.</p>
      <p>Mit einem letzten aristokratischen Fauchen löst sie sich in einer Wolke aus Steuerformularen auf.</p>
      <p>Du hast die vorletzte Prüfung bestanden. Nun wartet nur noch der Endgegner auf dich...</p>`
    }
  },
  level5: {
    before: {
      title: "Der Thron des Riestermeisters",
      content: `<p>Endlich stehst du vor dem imposanten Thron des Riestermeisters!</p>
      <p>Seine Haut besteht aus Policen, sein Blut aus Tinte, und sein Herz ist ein Taschenrechner, der nur Renditen berechnen kann. Er ist der ultimative Hüter des Riester-Wissens.</p>
      <p>"Ich bin nicht nur der Meister der Riester-Rente, ich BIN die Riester-Rente! Spüre die Macht der nachgelagerten Besteuerung!" donnert seine Stimme durch den Thronsaal.</p>
      <p>Der finale Kampf um die Riester-Meisterschaft beginnt!</p>`
    },
    after: {
      title: "Triumph des Riester-Helden",
      content: `<p>Der Riestermeister sinkt ungläubig auf seinen Thron zurück, während sein Taschenrechner-Herz wild blinkt.</p>
      <p>"Unglaublich! Du kennst die Riester-Rente besser als ich selbst!" staunt er und lässt seine Policen-Hände sinken.</p>
      <p>Er erhebt sich langsam und überreicht dir feierlich die goldene Zulage der Macht.</p>
      <p>"Du bist würdig. Von nun an sollst du als Riester-Held bekannt sein, Bewahrer des Wissens und Beschützer der Altersvorsorge!"</p>
      <p>Dein Name wird für immer in den Annalen der Finanzgeschichte verewigt sein!</p>`
    }
  },
  finale: {
    title: "Die Legende lebt",
    content: `<p>Dein Ruhm verbreitet sich im ganzen Land!</p>
    <p>Überall erzählen die Menschen von deinen Heldentaten gegen die Mächte der finanziellen Unwissenheit.</p>
    <p>Dein Wissen über die Riester-Rente ist legendär geworden.</p>
    <p>Mögest du dein Wissen nutzen, um auch anderen auf dem Weg zur perfekten Altersvorsorge zu helfen!</p>`
  }
};

// Gegner für jedes Level
const enemies = {
  1: {
    name: "Dr. Ignoramus",
    image: "https://api.dicebear.com/6.x/bottts/svg?seed=goblin&backgroundColor=b6e3f4",
    description: "Ehemaliger Universitätsprofessor, der nach einem tragischen Unfall mit einem Aktenschrank sein gesamtes Finanzwissen verlor. Jetzt verbreitet er aktiv Fehlinformationen, um sich besser zu fühlen.",
    taunt: "Riester-Rente? Haha! Das ist doch nur ein Mythos wie Bigfoot oder eine effiziente Steuererklärung!",
    defeatMessage: "Meine Ignoranz... sie löst sich auf! Ich spüre, wie Wissen in mein Gehirn zurückfließt... es ist so... unangenehm!"
  },
  2: {
    name: "Paragraphen-Polly",
    image: "https://api.dicebear.com/6.x/bottts/svg?seed=troll&backgroundColor=ffcccb",
    description: "Eine ehemalige Behördenmitarbeiterin, die nach 47 Jahren im Dienst mit den Formularen verschmolzen ist. Sie ernährt sich ausschließlich von Tinte und den Tränen verzweifelter Antragsteller.",
    taunt: "Du brauchst Formular 38B-7, in dreifacher Ausfertigung, beglaubigt von einem Notar, der an einem Dienstag geboren wurde!",
    defeatMessage: "Unmöglich! Du hast den Kleingedruckten-Knoten entschlüsselt! Meine bürokratische Macht schwindet... ich werde... effizient!"
  },
  3: {
    name: "Captain Chaos",
    image: "https://api.dicebear.com/6.x/bottts/svg?seed=hydra&backgroundColor=d1f4d9",
    description: "Ein gescheiterter Finanzberater mit multipler Persönlichkeitsstörung. Jede seiner Persönlichkeiten ist von einem anderen Riester-Produkt besessen und versucht, die anderen zu überschreien.",
    taunt: "Banksparpläne sind GENIAL! Nein, FONDSSPARPLÄNE! NEIN, RENTENVERSICHERUNGEN! AAAAH! *wirft Produktbroschüren*",
    defeatMessage: "Du... du hast alle meine Persönlichkeiten zum Schweigen gebracht mit... *schluckt*... fundiertem Wissen! Meine Verwirrung löst sich auf!"
  },
  4: {
    name: "Lady Steuersauger",
    image: "https://api.dicebear.com/6.x/bottts/svg?seed=vampire&backgroundColor=e0d1f4",
    description: "Eine aristokratische Steuerprüferin aus dem 18. Jahrhundert, die durch einen verfluchten Steuerbescheid unsterblich wurde. Sie ernährt sich von ungemeldeten Kapitalerträgen und der Angst vor Betriebsprüfungen.",
    taunt: "Deine Steuervorteile gehören MIR! Ich werde deine Freibeträge aussaugen und deine Absetzbarkeit in den Abgrund stürzen!",
    defeatMessage: "Aaaaargh! Zu viel Transparenz! Zu viel Steuerwissen! Ich schmelze... ich werde... STEUEREHRLICH!"
  },
  5: {
    name: "Der Riestermeister",
    image: "images/terror-thomas.png",
    description: "Ein legendärer Finanzguru, der so viele Altersvorsorgeprodukte verkauft hat, dass er selbst zu einem wurde. Seine Haut besteht aus Policen, sein Blut aus Tinte, und sein Herz ist ein Taschenrechner, der nur Renditen berechnen kann.",
    taunt: "Ich bin nicht nur der Meister der Riester-Rente, ich BIN die Riester-Rente! Spüre die Macht der nachgelagerten Besteuerung!",
    defeatMessage: "Unglaublich! Du kennst die Riester-Rente besser als ich selbst! Ich verneige mich vor deinem finanziellen Genie und übergebe dir die goldene Zulage der Macht!"
  }
};

// Funktion zum Anzeigen der Cutscenes
function showCutscene(sceneData, level, isBefore) {
  return new Promise((resolve) => {
    // Cutscene-Container erstellen, falls nicht vorhanden
    let cutsceneContainer = document.getElementById('cutsceneContainer');
    if (!cutsceneContainer) {
      cutsceneContainer = document.createElement('div');
      cutsceneContainer.id = 'cutsceneContainer';
      document.body.appendChild(cutsceneContainer);
    }
    
    // Dramatischen Sound für die Cutscene abspielen
    if (window.audioSystem && typeof window.audioSystem.playCutsceneSound === 'function') {
      window.audioSystem.playCutsceneSound(level, isBefore);
    } else if (window.audioSystem && typeof window.audioSystem.playSoundEffect === 'function') {
      window.audioSystem.playSoundEffect('click');
    }
    
    // Hintergrundmusik anpassen
    if (window.audioSystem && typeof window.audioSystem.playBackgroundMusic === 'function') {
      if (isBefore && level === 5) {
        // Boss-Level bekommt spezielle Musik
        window.audioSystem.playBackgroundMusic('cutscene', 2000);
      } else if (!isBefore && level === 5) {
        // Finale nach dem letzten Level
        window.audioSystem.playBackgroundMusic('finale', 2000);
      } else if (isBefore) {
        // Normale Cutscene vor einem Level
        window.audioSystem.playBackgroundMusic('cutscene', 1500);
      }
    }
    
    // Cutscene-Inhalt erstellen
    cutsceneContainer.innerHTML = `
      <div class="cutscene-content animate__animated animate__fadeIn">
        <h2 class="cutscene-title">${sceneData.title}</h2>
        <div class="cutscene-text"></div>
        <button class="btn cutscene-continue burn-button">Weiter</button>
      </div>
    `;
    
    // Cutscene anzeigen
    cutsceneContainer.style.display = 'flex';
    
    // Bildschirmerschütterung für dramatischen Effekt
    if (window.effectSystem && window.effectSystem.shakeScreen) {
      // Stärkere Erschütterung für Boss-Level
      const intensity = (level === 5) ? 8 : 4;
      window.effectSystem.shakeScreen(intensity, 800);
    }
    
    // Nebeleffekt anzeigen, falls vorhanden
    if (window.fogEffects) {
      window.fogEffects.showFog();
      setTimeout(() => window.fogEffects.hideFog(), 2000);
    }
    
    // Event auslösen für Schreibmaschineneffekt
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent('cutsceneShown', {
        detail: { content: sceneData.content }
      }));
    }, 500);
    
    // Event-Listener für den Weiter-Button
    document.querySelector('.cutscene-continue').addEventListener('click', function() {
      // Klick-Sound abspielen
      if (window.audioSystem) {
        window.audioSystem.playSoundEffect('click');
      }
      
      // Ausblenden mit Animation
      const content = document.querySelector('.cutscene-content');
      content.classList.remove('animate__fadeIn');
      content.classList.add('animate__fadeOut');
      
      // Button-Verbrennungseffekt, falls vorhanden
      if (window.fogEffects) {
        window.fogEffects.burnButton(this);
      }
      
      // Nach der Animation entfernen
      setTimeout(() => {
        cutsceneContainer.style.display = 'none';
        resolve();
      }, 500);
    });
  });
}

// Funktion zum Anzeigen des Gegners
function showEnemy(level) {
  return new Promise((resolve) => {
    const enemy = enemies[level];
    
    // Enemy-Container erstellen, falls nicht vorhanden
    let enemyContainer = document.getElementById('enemyContainer');
    if (!enemyContainer) {
      enemyContainer = document.createElement('div');
      enemyContainer.id = 'enemyContainer';
      document.body.appendChild(enemyContainer);
    }
    
    // Kampfmusik starten
    if (level === 5) {
      // Boss-Musik für Level 5
      window.audioSystem.playBackgroundMusic('boss', 2000);
    } else {
      // Normale Kampfmusik
      window.audioSystem.playBackgroundMusic('battle', 1500);
    }
    
    // Gegner-Sound abspielen
    if (window.audioSystem && window.audioSystem.playEnemySound) {
      window.audioSystem.playEnemySound(level);
    } else if (window.audioSystem) {
      window.audioSystem.playSoundEffect('damage');
    }
    
    // Enemy-Inhalt erstellen
    enemyContainer.innerHTML = `
      <div class="enemy-content animate__animated animate__zoomIn">
        <div class="enemy-image">
          <img src="${enemy.image}" alt="${enemy.name}">
        </div>
        <h3 class="enemy-name">${enemy.name}</h3>
        <p class="enemy-description">${enemy.description}</p>
        <div class="enemy-taunt">${enemy.taunt}</div>
        <button class="btn enemy-continue burn-button">Zum Kampf!</button>
      </div>
    `;
    
    // Enemy anzeigen
    enemyContainer.style.display = 'flex';
    
    // Bildschirmerschütterung für dramatischen Effekt
    if (window.effectSystem && window.effectSystem.shakeScreen) {
      // Stärkere Erschütterung für Boss-Level
      const intensity = (level === 5) ? 10 : 6;
      window.effectSystem.shakeScreen(intensity, 1000);
      
      // Boss-Erscheinungseffekt für Level 5
      if (level === 5 && window.effectSystem.bossAppearEffect) {
        window.effectSystem.bossAppearEffect();
      }
    }
    
    // Nebeleffekt anzeigen, falls vorhanden
    if (window.fogEffects) {
      window.fogEffects.showFog();
      setTimeout(() => window.fogEffects.hideFog(), 2000);
    }
    
    // Event-Listener für den Weiter-Button
    document.querySelector('.enemy-continue').addEventListener('click', function() {
      // Klick-Sound abspielen
      if (window.audioSystem) {
        window.audioSystem.playSoundEffect('click');
      }
      
      // Button-Verbrennungseffekt, falls vorhanden
      if (window.fogEffects) {
        window.fogEffects.burnButton(this);
      }
      
      // Ausblenden mit Animation
      const content = document.querySelector('.enemy-content');
      content.classList.remove('animate__zoomIn');
      content.classList.add('animate__zoomOut');
      
      // Nach der Animation entfernen
      setTimeout(() => {
        enemyContainer.style.display = 'none';
        resolve();
      }, 500);
    });
  });
}

// Funktion zum Anzeigen der Niederlage des Gegners
function showEnemyDefeat(level) {
  return new Promise((resolve) => {
    const enemy = enemies[level];
    
    // Enemy-Defeat-Container erstellen, falls nicht vorhanden
    let enemyDefeatContainer = document.getElementById('enemyDefeatContainer');
    if (!enemyDefeatContainer) {
      enemyDefeatContainer = document.createElement('div');
      enemyDefeatContainer.id = 'enemyDefeatContainer';
      document.body.appendChild(enemyDefeatContainer);
    }
    
    // Siegesmusik und -sound abspielen
    window.audioSystem.playBackgroundMusic('victory', 1000);
    window.audioSystem.playSoundEffect('victory', 0.7);
    
    // Siegeseffekte anzeigen
    if (window.effectSystem) {
      // Level-Aufstiegseffekt
      if (window.effectSystem.levelUpEffect) {
        window.effectSystem.levelUpEffect();
      }
      
      // Bildschirmerschütterung für dramatischen Effekt
      if (window.effectSystem.shakeScreen) {
        window.effectSystem.shakeScreen(5, 800);
      }
    }
    
    // Enemy-Defeat-Inhalt erstellen
    enemyDefeatContainer.innerHTML = `
      <div class="enemy-defeat-content animate__animated animate__fadeIn">
        <div class="enemy-image defeated">
          <img src="${enemy.image}" alt="${enemy.name}">
        </div>
        <h3 class="enemy-name">Gegner besiegt!</h3>
        <div class="enemy-defeat-message">${enemy.defeatMessage}</div>
        <button class="btn enemy-defeat-continue">Weiter</button>
      </div>
    `;
    
    // Enemy-Defeat anzeigen
    enemyDefeatContainer.style.display = 'flex';
    
    // Partikeleffekt um den besiegten Gegner
    if (window.effectSystem && window.effectSystem.createParticleEffect) {
      // Position des Gegnerbilds ermitteln
      setTimeout(() => {
        const enemyImg = enemyDefeatContainer.querySelector('.enemy-image img');
        if (enemyImg) {
          const rect = enemyImg.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          
          // Siegespartikel erzeugen
          window.effectSystem.createParticleEffect(x, y, 'victory', 40);
        }
      }, 100);
    }
    
    // Event-Listener für den Weiter-Button
    document.querySelector('.enemy-defeat-continue').addEventListener('click', function() {
      // Klick-Sound abspielen
      window.audioSystem.playSoundEffect('click');
      
      // Ausblenden mit Animation
      const content = document.querySelector('.enemy-defeat-content');
      content.classList.remove('animate__fadeIn');
      content.classList.add('animate__fadeOut');
      
      // Nach der Animation entfernen
      setTimeout(() => {
        enemyDefeatContainer.style.display = 'none';
        resolve();
      }, 500);
    });
  });
}

// Exportieren der Funktionen und Daten
window.epicStory = epicStory;
window.enemies = enemies;
window.showCutscene = showCutscene;
window.showEnemy = showEnemy;
window.showEnemyDefeat = showEnemyDefeat;

window.epicStory = epicStory;
window.showCutscene = showCutscene;