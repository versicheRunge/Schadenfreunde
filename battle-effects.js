/**
 * Erweiterte Kampf-Effekte für das Riester-Helden Quiz
 * Enthält Blitz-Effekte, Funken, visuelle Verschlechterung der Gegner und animierte Hintergründe
 */

// Gegner-Schadenszustände
let enemyDamageState = 0;
let enemyMaxHealth = 5; // 5 Fragen pro Level

// Initialisierung der Kampf-Effekte
function initBattleEffects() {
  console.log('Kampf-Effekte initialisiert');
  
  // Event-Listener für Treffer-Effekte
  document.addEventListener('enemyDamaged', handleEnemyDamage);
  
  // Hintergrund-Effekte basierend auf Level
  setupLevelBackgrounds();
  
  // Markieren, dass das System initialisiert wurde
  if (window.battleEffects) {
    window.battleEffects.initialized = true;
  }
}

// Blitz-Effekt auf Gegner erzeugen
function createLightningEffect(target) {
  if (!target) return;
  
  // Position des Gegners ermitteln
  const rect = target.getBoundingClientRect();
  
  // Blitz-Element erstellen
  const lightning = document.createElement('div');
  lightning.className = 'lightning-effect';
  lightning.style.position = 'absolute';
  lightning.style.top = `${rect.top}px`;
  lightning.style.left = `${rect.left}px`;
  lightning.style.width = `${rect.width}px`;
  lightning.style.height = `${rect.height}px`;
  
  // Zum Dokument hinzufügen
  document.body.appendChild(lightning);
  
  // Nach der Animation entfernen
  setTimeout(() => {
    lightning.remove();
  }, 500);
  
  // Sound abspielen
  if (window.audioSystem && typeof window.audioSystem.playSoundEffect === 'function') {
    window.audioSystem.playSoundEffect('damage', 0.7);
  }
}

// Funken-Effekt erzeugen
function createSparkEffect(target, count = 15) {
  if (!target) return;
  
  // Position des Gegners ermitteln
  const rect = target.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Funken erstellen
  for (let i = 0; i < count; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    
    // Zufällige Position innerhalb des Ziels
    const x = centerX + (Math.random() - 0.5) * rect.width * 0.8;
    const y = centerY + (Math.random() - 0.5) * rect.height * 0.8;
    
    // Zufällige Flugrichtung
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    // Stil setzen
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty('--tx', `${tx}px`);
    spark.style.setProperty('--ty', `${ty}px`);
    
    // Zum Dokument hinzufügen
    document.body.appendChild(spark);
    
    // Nach der Animation entfernen
    setTimeout(() => {
      spark.remove();
    }, 600);
  }
}

// Gegner-Schadenszustand aktualisieren
function updateEnemyDamageState(enemyImage) {
  if (!enemyImage) return;
  
  // Alle vorherigen Zustände entfernen
  for (let i = 1; i <= 5; i++) {
    enemyImage.classList.remove(`enemy-damage-state-${i}`);
  }
  
  // Neuen Zustand setzen
  if (enemyDamageState > 0) {
    enemyImage.classList.add(`enemy-damage-state-${enemyDamageState}`);
  }
}

// Event-Handler für Gegner-Schaden
function handleEnemyDamage(event) {
  const enemyImage = document.getElementById('currentEnemyImage');
  if (!enemyImage) {
    console.warn('Gegner-Bild nicht gefunden für Schadenseffekt');
    return;
  }
  
  // Schadenszustand erhöhen
  enemyDamageState = Math.min(enemyDamageState + 1, enemyMaxHealth);
  
  // Blitz- und Funken-Effekt erzeugen
  createLightningEffect(enemyImage);
  createSparkEffect(enemyImage);
  
  // Gegner-Aussehen aktualisieren
  updateEnemyDamageState(enemyImage);
  
  // Sound abspielen
  if (window.audioSystem && typeof window.audioSystem.playSoundEffect === 'function') {
    window.audioSystem.playSoundEffect('damage', 0.7);
  } else {
    console.warn('Audio-System nicht verfügbar für Schadenseffekt');
  }
  
  // Bildschirmerschütterung
  if (window.effectSystem && typeof window.effectSystem.shakeScreen === 'function') {
    window.effectSystem.shakeScreen(5 + enemyDamageState, 300);
  } else {
    console.warn('Effekt-System nicht verfügbar für Bildschirmerschütterung');
  }
}

// Gegner-Zustand zurücksetzen
function resetEnemyDamageState() {
  enemyDamageState = 0;
  enemyMaxHealth = window.questionsPerLevel || 5; // Dynamische Anpassung an Quizlänge
  
  const enemyImage = document.getElementById('currentEnemyImage');
  if (enemyImage) {
    // Alle Schadenszustände entfernen
    for (let i = 1; i <= enemyMaxHealth; i++) {
      enemyImage.classList.remove(`enemy-damage-state-${i}`);
    }
    // Ursprünglichen Zustand wiederherstellen
    enemyImage.classList.add('enemy-fresh');
  }
  
  // Event auslösen für andere Systeme
  document.dispatchEvent(new CustomEvent('enemyReset'));
}

// Hintergrund-Effekte basierend auf Level einrichten
function setupLevelBackgrounds() {
  const quizScreen = document.getElementById('quizScreen');
  if (!quizScreen) return;
  
  // Alle vorherigen Hintergründe entfernen
  const oldBackgrounds = document.querySelectorAll('.bg-money, .bg-papers, .bg-smoke');
  oldBackgrounds.forEach(bg => bg.remove());
  
  // Level-spezifische Klassen entfernen
  for (let i = 1; i <= 5; i++) {
    quizScreen.classList.remove(`level-bg-${i}`);
  }
  
  // Aktuelle Level-Klasse hinzufügen
  if (window.currentLevel) {
    quizScreen.classList.add(`level-bg-${window.currentLevel}`);
  }
  
  // Hintergrund-Elemente basierend auf Level erstellen
  if (window.currentLevel) {
    // Geldscheine für Level 1 und 2
    if (window.currentLevel <= 2) {
      const moneyBg = document.createElement('div');
      moneyBg.className = 'bg-money';
      quizScreen.appendChild(moneyBg);
    }
    
    // Papiere für Level 2 und 3
    if (window.currentLevel >= 2 && window.currentLevel <= 3) {
      const papersBg = document.createElement('div');
      papersBg.className = 'bg-papers';
      quizScreen.appendChild(papersBg);
    }
    
    // Rauch für Level 4 und 5
    if (window.currentLevel >= 4) {
      const smokeBg = document.createElement('div');
      smokeBg.className = 'bg-smoke';
      quizScreen.appendChild(smokeBg);
    }
  }
}

// Gegner-Niederlage-Animation
function playEnemyDefeatAnimation() {
  const enemyImage = document.getElementById('currentEnemyImage');
  if (!enemyImage) return;
  
  // Maximalen Schadenszustand setzen
  enemyDamageState = 5;
  updateEnemyDamageState(enemyImage);
  
  // Intensive Blitz- und Funken-Effekte
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      createLightningEffect(enemyImage);
      createSparkEffect(enemyImage, 25);
    }, i * 300);
  }
  
  // Starke Bildschirmerschütterung
  if (window.effectSystem && window.effectSystem.shakeScreen) {
    window.effectSystem.shakeScreen(10, 1000);
  }
  
  // Explosions-Sound
  if (window.audioSystem && typeof window.audioSystem.playSoundEffect === 'function') {
    window.audioSystem.playSoundEffect('explosion');
  }
  
  // Gegner ausblenden
  setTimeout(() => {
    enemyImage.style.transition = 'all 1s ease-out';
    enemyImage.style.opacity = '0';
    enemyImage.style.transform = 'scale(0.5) rotate(10deg)';
  }, 1000);
}

// Erweiterte Storytelling-Funktion für Gegner
function showEnemyStory(level) {
  const enemy = window.enemies[level];
  if (!enemy) return;
  
  // Erweiterte Beschreibung für Gegner
  const extendedDescriptions = {
    1: `Der Unwissenheits-Goblin lauert in den dunklen Ecken des Finanzwissens. Er ernährt sich von Halbwissen und Verwirrung und wird stärker, je weniger die Menschen über ihre Altersvorsorge wissen. Seine Schwachstelle: klare, verständliche Informationen!`,
    2: `Der Bürokratie-Troll stammt aus den Bergen der Paragraphen. Mit seinem gewaltigen Stempel und endlosen Formularen hat er schon viele Riester-Sparer in die Verzweiflung getrieben. Nur wer die Zulagen-Geheimnisse kennt, kann ihn bezwingen!`,
    3: `Die Produktvielfalt-Hydra ist ein vielköpfiges Monster aus dem Sumpf der Finanzprodukte. Jeder ihrer Köpfe preist ein anderes Riester-Produkt an und versucht, Sparer zu verwirren. Für jeden abgeschlagenen Kopf wachsen zwei neue nach - es sei denn, man kennt die wahren Unterschiede zwischen den Produkten!`,
    4: `Der Steuer-Vampir lebt in der düsteren Steuerfestung und ernährt sich von der Unwissenheit über steuerliche Vorteile. Tagsüber versteckt er sich in komplizierten Steuerformularen, nachts schleicht er sich an ahnungslose Sparer heran und saugt ihre potenziellen Steuervorteile aus. Nur das Licht des Steuerwissens kann ihn vertreiben!`,
    5: `Terror TRU, der Totale Riester Unterstützer, ist der mächtigste aller Riester-Gegner. Mit seiner goldenen Krone, dem Mikrofon in der Hand und dem feuerspeienden Drachen auf seiner Schulter prüft er, ob du würdig bist, das ultimative Riester-Wissen zu tragen. Nur wer alle Geheimnisse der Riester-Rente kennt, kann ihn bezwingen und zum wahren Riester-Helden aufsteigen!`
  };
  
  // Story-Container erstellen
  const storyContainer = document.createElement('div');
  storyContainer.className = 'enemy-story-container animate__animated animate__fadeIn';
  storyContainer.innerHTML = `
    <h3>${enemy.name}</h3>
    <p class="enemy-description">${extendedDescriptions[level] || enemy.description}</p>
    <p class="enemy-taunt">"${enemy.taunt}"</p>
    <button class="btn enemy-story-continue">Zum Kampf! ⚔️</button>
  `;
  
  // Zum Dokument hinzufügen
  document.body.appendChild(storyContainer);
  
  // Event-Listener für den Weiter-Button
  document.querySelector('.enemy-story-continue').addEventListener('click', function() {
    // Klick-Sound abspielen
    if (window.audioSystem && typeof window.audioSystem.playSoundEffect === 'function') {
      window.audioSystem.playSoundEffect('click');
    }
    
    // Story ausblenden
    storyContainer.classList.remove('animate__fadeIn');
    storyContainer.classList.add('animate__fadeOut');
    
    // Nach der Animation entfernen
    setTimeout(() => {
      storyContainer.remove();
    }, 500);
  });
  
  // Gegner-Sound abspielen
  if (window.audioSystem && typeof window.audioSystem.playEnemySound === 'function') {
    window.audioSystem.playEnemySound(level);
  }
}

// Exportieren der Funktionen
if (!window.battleEffects) {
  window.battleEffects = {
    initialized: false,
    initBattleEffects,
    createLightningEffect,
    createSparkEffect,
    updateEnemyDamageState,
    resetEnemyDamageState,
    setupLevelBackgrounds,
    playEnemyDefeatAnimation,
    showEnemyStory
  };
} else {
  console.log('Battle-Effects-System bereits vorhanden, erweitere es');
  // Erweitern des bestehenden Systems mit zusätzlichen Funktionen
  Object.assign(window.battleEffects, {
    createLightningEffect,
    createSparkEffect,
    updateEnemyDamageState,
    resetEnemyDamageState,
    setupLevelBackgrounds,
    playEnemyDefeatAnimation,
    showEnemyStory
  });
}

// Initialisierung, wenn das Dokument geladen ist
document.addEventListener('DOMContentLoaded', () => {
  // Battle-Effects sofort initialisieren
  if (!window.battleEffects || !window.battleEffects.initialized) {
    console.log('Battle-Effects-System wird initialisiert');
    initBattleEffects();
  }
  
  // Zusätzlich auf Benutzerinteraktion warten, falls AudioContext suspended ist
  document.addEventListener('click', function initOnFirstClick() {
    if (window.audioContext && window.audioContext.state === 'suspended') {
      window.audioContext.resume();
    }
    document.removeEventListener('click', initOnFirstClick);
  }, { once: true });
});