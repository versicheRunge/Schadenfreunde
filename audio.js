/**
 * Erweitertes Audio-System für Riester-Helden Quiz
 * Verwaltet Hintergrundmusik, Soundeffekte und dramatische Sounds für das Spiel
 * Mit sanften Übergängen und dynamischer Anpassung
 */

// Audio-Kontext und Hauptlautstärke
let audioContext;
let masterGainNode;
let isMuted = false;

// Audio-Elemente
const backgroundMusic = {};
const soundEffects = {};
const dramaticSounds = {};

// Aktuelle Hintergrundmusik und Übergangszeit
let currentMusic = null;
let transitionTime = 1000; // ms

// Initialisierung des Audio-Systems
function initAudio() {
  if (audioContext) {
    return; // Audio-System bereits initialisiert
  }

  try {
    // AudioContext erstellen
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Master-Lautstärke-Knoten erstellen
    masterGainNode = audioContext.createGain();
    masterGainNode.gain.value = 0.7; // 70% Lautstärke
    masterGainNode.connect(audioContext.destination);
    
    // Hintergrundmusik laden
    loadBackgroundMusic();
    
    // Soundeffekte laden
    loadSoundEffects();
    
    // Dramatische Sounds laden
    loadDramaticSounds();
    
    // Event-Listener für User-Interaktion hinzufügen
    document.addEventListener('click', function() {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
    });
    
    console.log('Erweitertes Audio-System initialisiert');
  } catch (error) {
    console.error('Audio-System konnte nicht initialisiert werden:', error);
    // Fallback für Browser ohne Web Audio API
    audioContext = null;
    masterGainNode = null;
  }
}

// Hintergrundmusik laden
function loadBackgroundMusic() {
  // URLs zu den Musikdateien
  const musicURLs = {
    menu: 'https://assets.mixkit.co/music/preview/mixkit-game-show-intro-942.mp3',
    battle: 'https://assets.mixkit.co/music/preview/mixkit-games-worldbeat-466.mp3',
    victory: 'https://assets.mixkit.co/music/preview/mixkit-achievement-bell-600.mp3',
    boss: 'https://assets.mixkit.co/music/preview/mixkit-driving-ambition-32.mp3',
    cutscene: 'https://assets.mixkit.co/music/preview/mixkit-mystery-suspense-tension-046-2482.mp3',
    finale: 'https://assets.mixkit.co/music/preview/mixkit-epic-orchestra-transition-2290.mp3'
  };
  
  // Musik-Elemente erstellen
  for (const [key, url] of Object.entries(musicURLs)) {
    backgroundMusic[key] = new Audio(url);
    backgroundMusic[key].loop = true;
    backgroundMusic[key].volume = 0.4;
    backgroundMusic[key].preload = 'auto';
  }
}

// Soundeffekte laden
function loadSoundEffects() {
  // URLs zu den Soundeffekt-Dateien
  const effectURLs = {
    click: 'https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-3124.mp3',
    correct: 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3',
    wrong: 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3',
    levelUp: 'https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3',
    damage: 'https://assets.mixkit.co/sfx/preview/mixkit-arcade-retro-game-over-213.mp3',
    bossAppear: 'https://assets.mixkit.co/sfx/preview/mixkit-cinematic-transition-swoosh-heartbeat-trailer-488.mp3',
    explosion: 'https://assets.mixkit.co/sfx/preview/mixkit-explosion-impact-1703.mp3',
    powerUp: 'https://assets.mixkit.co/sfx/preview/mixkit-magical-coin-win-1936.mp3',
    victory: 'https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'
  };
  
  // Soundeffekt-Elemente erstellen
  for (const [key, url] of Object.entries(effectURLs)) {
    const audio = new Audio();
    audio.addEventListener('error', () => {
      console.warn(`Soundeffekt ${key} konnte nicht geladen werden:`, url);
    });
    audio.src = url;
    audio.volume = 0.6;
    audio.preload = 'auto';
    soundEffects[key] = audio;
  }
}

// Dramatische Sounds laden
function loadDramaticSounds() {
  // URLs zu den dramatischen Sound-Dateien
  const dramaticURLs = {
    reveal: 'https://assets.mixkit.co/sfx/preview/mixkit-cinematic-mystery-reveal-966.mp3',
    tension: 'https://assets.mixkit.co/sfx/preview/mixkit-cinematic-transition-swoosh-heartbeat-trailer-488.mp3',
    impact: 'https://assets.mixkit.co/sfx/preview/mixkit-cinematic-dramatic-hit-impact-1291.mp3',
    success: 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
    danger: 'https://assets.mixkit.co/sfx/preview/mixkit-cinematic-transition-reverse-suspense-640.mp3',
    goblin: 'https://assets.mixkit.co/sfx/preview/mixkit-monster-pain-growl-1955.mp3',
    troll: 'https://assets.mixkit.co/sfx/preview/mixkit-monster-grunt-1966.mp3',
    hydra: 'https://assets.mixkit.co/sfx/preview/mixkit-monster-growl-1962.mp3',
    vampire: 'https://assets.mixkit.co/sfx/preview/mixkit-horror-wild-creature-scream-897.mp3',
    boss: 'https://assets.mixkit.co/sfx/preview/mixkit-monster-beast-roar-1972.mp3'
  };
  
  // Dramatische Sound-Elemente erstellen
  for (const [key, url] of Object.entries(dramaticURLs)) {
    dramaticSounds[key] = new Audio(url);
    dramaticSounds[key].volume = 0.7;
    dramaticSounds[key].preload = 'auto';
  }
}

// Hintergrundmusik mit Übergang abspielen
function playBackgroundMusic(type, fadeTime = transitionTime) {
  // Wenn keine Änderung, nichts tun
  if (currentMusic === type) return;
  
  // Neue Hintergrundmusik
  const newMusic = backgroundMusic[type];
  if (!newMusic) return;
  
  // Aktuelle Musik mit Übergang ausblenden
  if (currentMusic) {
    const oldMusic = backgroundMusic[currentMusic];
    fadeAudio(oldMusic, oldMusic.volume, 0, fadeTime, () => {
      oldMusic.pause();
      oldMusic.currentTime = 0;
    });
  }
  
  // Neue Musik starten und einblenden
  newMusic.currentTime = 0;
  newMusic.volume = 0;
  newMusic.play().catch(error => {
    console.warn('Hintergrundmusik konnte nicht abgespielt werden:', error);
  });
  
  // Lautstärke erhöhen
  fadeAudio(newMusic, 0, 0.4, fadeTime);
  
  // Aktuelle Musik aktualisieren
  currentMusic = type;
}

// Alle Hintergrundmusik stoppen
function stopAllBackgroundMusic(fadeTime = transitionTime) {
  for (const [key, music] of Object.entries(backgroundMusic)) {
    if (!music.paused) {
      fadeAudio(music, music.volume, 0, fadeTime, () => {
        music.pause();
        music.currentTime = 0;
      });
    }
  }
  currentMusic = null;
}

// Soundeffekt abspielen
function playSoundEffect(type, volume = 0.6) {
  if (soundEffects[type]) {
    // Soundeffekt zurücksetzen und abspielen
    const sound = soundEffects[type];
    sound.currentTime = 0;
    sound.volume = volume;
    sound.play().catch(error => {
      console.warn('Soundeffekt konnte nicht abgespielt werden:', error);
    });
  }
}

// Dramatischen Sound abspielen
function playDramaticSound(type, volume = 0.7) {
  if (dramaticSounds[type]) {
    // Dramatischen Sound zurücksetzen und abspielen
    const sound = dramaticSounds[type];
    sound.currentTime = 0;
    sound.volume = volume;
    sound.play().catch(error => {
      console.warn('Dramatischer Sound konnte nicht abgespielt werden:', error);
    });
    
    return sound; // Sound-Element zurückgeben für weitere Kontrolle
  }
  return null;
}

// Gegner-Sound basierend auf Level abspielen
function playEnemySound(level) {
  const enemySounds = {
    1: 'goblin',
    2: 'troll',
    3: 'hydra',
    4: 'vampire',
    5: 'boss'
  };
  
  if (enemySounds[level]) {
    playDramaticSound(enemySounds[level]);
  }
}

// Cutscene-Sound basierend auf Level und Typ abspielen
function playCutsceneSound(level, isBefore) {
  // Vor dem Level: Spannung aufbauen
  // Nach dem Level: Erfolg feiern
  if (isBefore) {
    if (level === 5) {
      // Boss-Level bekommt speziellen Sound
      playDramaticSound('danger');
    } else {
      playDramaticSound('tension');
    }
  } else {
    playDramaticSound('success');
  }
}

// Audio-Übergang (Fade-Effekt)
function fadeAudio(audioElement, startVolume, endVolume, duration, callback) {
  if (!audioElement) return;
  
  // Startlautstärke setzen
  audioElement.volume = startVolume;
  
  // Anzahl der Schritte berechnen (60 Schritte pro Sekunde)
  const steps = Math.floor(duration / 16.6);
  const volumeStep = (endVolume - startVolume) / steps;
  
  let currentStep = 0;
  
  // Interval für sanften Übergang
  const interval = setInterval(() => {
    currentStep++;
    
    // Neue Lautstärke berechnen
    const newVolume = startVolume + (volumeStep * currentStep);
    
    // Lautstärke setzen
    audioElement.volume = Math.max(0, Math.min(1, newVolume));
    
    // Übergang beenden
    if (currentStep >= steps) {
      clearInterval(interval);
      audioElement.volume = endVolume;
      if (callback) callback();
    }
  }, 16.6); // ~60fps
  
  return interval;
}

// Lautstärke einstellen
function setVolume(volume) {
  // Wert zwischen 0 und 1 sicherstellen
  volume = Math.max(0, Math.min(1, volume));
  
  // Master-Lautstärke setzen
  if (masterGainNode) {
    masterGainNode.gain.value = volume;
  }
  
  // Lautstärke für alle Audio-Elemente setzen
  for (const music of Object.values(backgroundMusic)) {
    music.volume = volume * 0.4; // Hintergrundmusik etwas leiser
  }
  
  for (const effect of Object.values(soundEffects)) {
    effect.volume = volume * 0.6; // Effekte etwas lauter
  }
  
  for (const dramatic of Object.values(dramaticSounds)) {
    dramatic.volume = volume * 0.7; // Dramatische Sounds noch lauter
  }
}

// Audio stummschalten oder Stummschaltung aufheben
function toggleMute() {
  isMuted = !isMuted;
  
  if (isMuted) {
    // Alles stummschalten
    setVolume(0);
  } else {
    // Lautstärke wiederherstellen
    setVolume(0.7);
  }
  
  return isMuted;
}

// Übergangszeit für Musik-Fades setzen
function setTransitionTime(time) {
  transitionTime = time;
}

// Audio-System initialisieren, wenn das Dokument geladen ist
document.addEventListener('DOMContentLoaded', () => {
  // Audio-System sofort initialisieren
  if (!window.audioSystem || !window.audioSystem.initialized) {
    initAudio();
    console.log('Audio-System aus audio.js initialisiert');
  }
  
  // Zusätzlich auf Benutzerinteraktion warten, um AudioContext zu starten
  document.addEventListener('click', function initOnFirstClick() {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
      console.log('AudioContext resumed nach Benutzerinteraktion');
    }
    document.removeEventListener('click', initOnFirstClick);
  }, { once: true });
});

// Exportieren der Funktionen nur, wenn kein AudioSystem existiert
if (!window.audioSystem) {
  window.audioSystem = {
    initialized: true,
    playBackgroundMusic,
    stopAllBackgroundMusic,
    playSoundEffect,
    playDramaticSound,
    playEnemySound,
    playCutsceneSound,
    setVolume,
    toggleMute,
    setTransitionTime,
    fadeAudio
  };
} else {
  // Erweitern des bestehenden AudioSystems mit zusätzlichen Funktionen
  window.audioSystem.playDramaticSound = playDramaticSound;
  window.audioSystem.playEnemySound = playEnemySound;
  window.audioSystem.playCutsceneSound = playCutsceneSound;
  window.audioSystem.initialized = true;
  console.log('Bestehendes Audio-System erweitert');
}