/**
 * Visuelle Effekte für das Riester-Helden Quiz
 * Enthält Partikeleffekte, Bildschirmerschütterungen und andere visuelle Verbesserungen
 */

// Globale Variablen für Effekte
let activeParticles = [];
let activeShakes = [];
let activeBgEffects = {};

// Initialisierung des Effekt-Systems
function initEffects() {
  console.log('Effekt-System initialisiert');
  
  // Event-Listener für Animationsframes
  window.requestAnimationFrame(updateEffects);
  
  // Markieren, dass das System initialisiert wurde
  if (window.effectSystem) {
    window.effectSystem.initialized = true;
  }
}

// Update-Funktion für alle aktiven Effekte
function updateEffects(timestamp) {
  // Partikel aktualisieren und zeichnen
  updateParticles(timestamp);
  
  // Bildschirmerschütterungen aktualisieren
  updateShakes(timestamp);
  
  // Nächsten Frame anfordern
  window.requestAnimationFrame(updateEffects);
}

// ===== PARTIKELEFFEKTE =====

// Partikel erstellen
function createParticle(x, y, type = 'default') {
  const particle = document.createElement('div');
  particle.className = 'particle';
  document.body.appendChild(particle);
  
  // Partikel-Eigenschaften basierend auf Typ
  let config = {
    lifetime: 1000 + Math.random() * 1000, // 1-2 Sekunden
    speed: 1 + Math.random() * 3,
    angle: Math.random() * Math.PI * 2, // Zufälliger Winkel
    size: 5 + Math.random() * 10,
    color: '#3b82f6',
    gravity: 0.05,
    fadeOut: true
  };
  
  // Spezielle Partikel-Typen
  switch(type) {
    case 'correct':
      config.color = '#10b981'; // Grün
      config.size = 8 + Math.random() * 12;
      config.speed = 2 + Math.random() * 4;
      break;
    case 'wrong':
      config.color = '#ef4444'; // Rot
      config.size = 8 + Math.random() * 12;
      config.speed = 2 + Math.random() * 3;
      config.gravity = 0.1;
      break;
    case 'victory':
      config.color = '#fbbf24'; // Gold
      config.size = 10 + Math.random() * 15;
      config.speed = 3 + Math.random() * 5;
      config.gravity = -0.05; // Nach oben steigend
      config.lifetime = 2000 + Math.random() * 2000; // Länger sichtbar
      break;
    case 'boss':
      config.color = '#7f1d1d'; // Dunkelrot
      config.size = 15 + Math.random() * 20;
      config.speed = 1 + Math.random() * 2;
      config.gravity = 0.02;
      config.lifetime = 3000 + Math.random() * 1000;
      break;
  }
  
  // Partikel-Stil setzen
  particle.style.position = 'absolute';
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  particle.style.width = `${config.size}px`;
  particle.style.height = `${config.size}px`;
  particle.style.backgroundColor = config.color;
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '9999';
  particle.style.opacity = '0.8';
  
  // Partikel zum Array hinzufügen
  activeParticles.push({
    element: particle,
    x: x,
    y: y,
    vx: Math.cos(config.angle) * config.speed,
    vy: Math.sin(config.angle) * config.speed,
    gravity: config.gravity,
    lifetime: config.lifetime,
    birth: Date.now(),
    fadeOut: config.fadeOut
  });
  
  return particle;
}

// Partikeleffekt an einer Position erzeugen
function createParticleEffect(x, y, type = 'default', count = 20) {
  for (let i = 0; i < count; i++) {
    createParticle(x, y, type);
  }
}

// Partikel aktualisieren
function updateParticles(timestamp) {
  const now = Date.now();
  
  // Alle aktiven Partikel durchgehen
  for (let i = activeParticles.length - 1; i >= 0; i--) {
    const p = activeParticles[i];
    
    // Lebensdauer prüfen
    const age = now - p.birth;
    if (age > p.lifetime) {
      // Partikel entfernen
      p.element.remove();
      activeParticles.splice(i, 1);
      continue;
    }
    
    // Partikel bewegen
    p.vy += p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    
    // Position aktualisieren
    p.element.style.left = `${p.x}px`;
    p.element.style.top = `${p.y}px`;
    
    // Ausblenden gegen Ende der Lebensdauer
    if (p.fadeOut) {
      const opacity = 1 - (age / p.lifetime);
      p.element.style.opacity = opacity.toString();
    }
  }
}

// ===== BILDSCHIRMERSCHÜTTERUNGEN =====

// Bildschirmerschütterung starten
function shakeScreen(intensity = 5, duration = 500) {
  const container = document.querySelector('.container');
  if (!container) return;
  
  // Erschütterungskonfiguration
  const shake = {
    element: container,
    intensity: intensity,
    duration: duration,
    start: Date.now(),
    originalTransform: container.style.transform || ''
  };
  
  // Zur Liste aktiver Erschütterungen hinzufügen
  activeShakes.push(shake);
}

// Erschütterungen aktualisieren
function updateShakes(timestamp) {
  const now = Date.now();
  
  // Alle aktiven Erschütterungen durchgehen
  for (let i = activeShakes.length - 1; i >= 0; i--) {
    const shake = activeShakes[i];
    
    // Dauer prüfen
    const elapsed = now - shake.start;
    if (elapsed > shake.duration) {
      // Erschütterung beenden und ursprüngliche Position wiederherstellen
      shake.element.style.transform = shake.originalTransform;
      activeShakes.splice(i, 1);
      continue;
    }
    
    // Intensität mit der Zeit verringern
    const progress = elapsed / shake.duration;
    const currentIntensity = shake.intensity * (1 - progress);
    
    // Zufällige Verschiebung berechnen
    const dx = (Math.random() * 2 - 1) * currentIntensity;
    const dy = (Math.random() * 2 - 1) * currentIntensity;
    
    // Transformation anwenden
    shake.element.style.transform = `translate(${dx}px, ${dy}px) ${shake.originalTransform}`;
  }
}

// ===== HINTERGRUNDEFFEKTE =====

// Dynamischen Hintergrund für ein Element erstellen
function createDynamicBackground(elementId, type = 'default') {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Vorhandenen Effekt entfernen, falls vorhanden
  if (activeBgEffects[elementId]) {
    element.classList.remove(activeBgEffects[elementId]);
  }
  
  // Effektklasse basierend auf Typ
  let effectClass = '';
  switch(type) {
    case 'battle':
      effectClass = 'bg-effect-battle';
      break;
    case 'victory':
      effectClass = 'bg-effect-victory';
      break;
    case 'boss':
      effectClass = 'bg-effect-boss';
      break;
    default:
      effectClass = 'bg-effect-default';
  }
  
  // Effekt anwenden
  element.classList.add(effectClass);
  activeBgEffects[elementId] = effectClass;
}

// Hintergrundeffekt entfernen
function removeDynamicBackground(elementId) {
  const element = document.getElementById(elementId);
  if (!element || !activeBgEffects[elementId]) return;
  
  // Effekt entfernen
  element.classList.remove(activeBgEffects[elementId]);
  delete activeBgEffects[elementId];
}

// ===== SPEZIELLE EFFEKTE =====

// Effekt für richtige Antwort
function correctAnswerEffect(element) {
  if (!element) return;
  
  // Position des Elements ermitteln
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  // Partikeleffekt erzeugen
  createParticleEffect(x, y, 'correct', 30);
  
  // Leichte Erschütterung
  shakeScreen(3, 300);
  
  // Sound abspielen
  if (window.audioSystem && typeof window.audioSystem.playSoundEffect === 'function') {
    window.audioSystem.playSoundEffect('correct');
  }
}

// Effekt für falsche Antwort
function wrongAnswerEffect(element) {
  if (!element) return;
  
  // Position des Elements ermitteln
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  // Partikeleffekt erzeugen
  createParticleEffect(x, y, 'wrong', 20);
  
  // Stärkere Erschütterung
  shakeScreen(8, 400);
  
  // Sound abspielen
  if (window.audioSystem && typeof window.audioSystem.playSoundEffect === 'function') {
    window.audioSystem.playSoundEffect('wrong');
  }
}

// Effekt für Levelaufstieg
function levelUpEffect() {
  // Bildschirmweiter Partikeleffekt
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Partikel von unten nach oben
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * width;
    const y = height + 20;
    const particle = createParticle(x, y, 'victory');
    // Partikel nach oben bewegen
    const particleData = activeParticles[activeParticles.length - 1];
    particleData.vy = -5 - Math.random() * 3;
  }
  
  // Mittlere Erschütterung
  shakeScreen(5, 800);
  
  // Sound abspielen
  if (window.audioSystem) {
    if (typeof window.audioSystem.playSoundEffect === 'function') {
      window.audioSystem.playSoundEffect('levelUp');
    }
    if (typeof window.audioSystem.playBackgroundMusic === 'function') {
      window.audioSystem.playBackgroundMusic('victory');
    }
  }
}

// Effekt für Boss-Erscheinen
function bossAppearEffect() {
  // Starke Erschütterung
  shakeScreen(10, 1500);
  
  // Bildschirmweiter Partikeleffekt
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // Partikel vom Zentrum nach außen
  const centerX = width / 2;
  const centerY = height / 2;
  
  for (let i = 0; i < 60; i++) {
    createParticle(centerX, centerY, 'boss');
  }
  
  // Hintergrundeffekt für den Boss-Kampf
  createDynamicBackground('quizScreen', 'boss');
  
  // Sound abspielen
  if (window.audioSystem) {
    if (typeof window.audioSystem.playSoundEffect === 'function') {
      window.audioSystem.playSoundEffect('bossAppear');
    }
    if (typeof window.audioSystem.playBackgroundMusic === 'function') {
      window.audioSystem.playBackgroundMusic('boss');
    }
  }
}

// Effekt für Gegner-Schaden
function enemyDamageEffect(level) {
  // Position des Gegnerbilds ermitteln
  const enemyImage = document.getElementById('currentEnemyImage');
  if (!enemyImage) return;
  
  const rect = enemyImage.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  // Partikeleffekt erzeugen
  createParticleEffect(x, y, 'wrong', 15);
  
  // Erschütterung
  shakeScreen(7, 300);
  
  // Sound abspielen
  if (window.audioSystem && typeof window.audioSystem.playSoundEffect === 'function') {
    window.audioSystem.playSoundEffect('damage');
  }
}

// Effekt für Spielende
function gameCompleteEffect() {
  // Kontinuierlicher Partikelregen
  const width = window.innerWidth;
  const interval = setInterval(() => {
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      createParticle(x, -20, 'victory');
    }
  }, 200);
  
  // Nach 5 Sekunden stoppen
  setTimeout(() => {
    clearInterval(interval);
  }, 5000);
  
  // Hintergrundeffekt
  createDynamicBackground('finalScreen', 'victory');
}

// Exportieren der Funktionen
if (!window.effectSystem) {
  window.effectSystem = {
    initialized: false,
    initEffects,
    createParticleEffect,
    shakeScreen,
    createDynamicBackground,
    removeDynamicBackground,
    correctAnswerEffect,
    wrongAnswerEffect,
    levelUpEffect,
    bossAppearEffect,
    enemyDamageEffect,
    gameCompleteEffect
  };
} else {
  console.log('Effekt-System bereits vorhanden, erweitere es');
  // Erweitern des bestehenden Systems mit zusätzlichen Funktionen
  Object.assign(window.effectSystem, {
    createParticleEffect,
    shakeScreen,
    createDynamicBackground,
    removeDynamicBackground,
    correctAnswerEffect,
    wrongAnswerEffect,
    levelUpEffect,
    bossAppearEffect,
    enemyDamageEffect,
    gameCompleteEffect
  });
}

// Initialisierung, wenn das Dokument geladen ist
document.addEventListener('DOMContentLoaded', () => {
  // Effekt-System sofort initialisieren
  if (!window.effectSystem || !window.effectSystem.initialized) {
    console.log('Effekt-System wird initialisiert');
    initEffects();
  }
  
  // Zusätzlich auf Benutzerinteraktion warten, falls AudioContext suspended ist
  document.addEventListener('click', function initOnFirstClick() {
    if (window.audioContext && window.audioContext.state === 'suspended') {
      window.audioContext.resume();
    }
    document.removeEventListener('click', initOnFirstClick);
  }, { once: true });
});