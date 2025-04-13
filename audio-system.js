/**
 * Audio-System für das Riester-Quiz
 * Verwaltet Hintergrundmusik, Soundeffekte und atmosphärische Klänge
 */

class AudioSystem {
  constructor() {
    // Soundpfade für das Spiel
    this.soundPaths = {
      background: {
        menu: './assets/audio/background-menu.mp3',
        battle: './assets/audio/background-battle.mp3',
        victory: './assets/audio/background-victory.mp3',
        boss: './assets/audio/background-boss.mp3'
      },
      effects: {
        click: './assets/audio/effect-click.mp3',
        correct: './assets/audio/effect-correct.mp3',
        wrong: './assets/audio/effect-wrong.mp3',
        damage: './assets/audio/effect-damage.mp3',
        heal: './assets/audio/effect-heal.mp3',
        levelUp: './assets/audio/effect-levelup.mp3',
        typewriter: './assets/audio/effect-typewriter.mp3',
        typewriterReturn: './assets/audio/effect-typewriter-return.mp3',
        buttonBurn: './assets/audio/effect-button-burn.mp3',
        buttonHover: './assets/audio/effect-button-hover.mp3'
      },
      voices: {
        goblin: './assets/audio/voice-goblin.mp3',
        troll: './assets/audio/voice-troll.mp3',
        hydra: './assets/audio/voice-hydra.mp3',
        vampire: './assets/audio/voice-vampire.mp3',
        boss: './assets/audio/voice-boss.mp3'
      }
    };
    
    this.sounds = {
      background: {},
      effects: {},
      voices: {}
    };
    
    // Audio-Objekte erstellen
    this.initSounds();

    this.currentBackground = null;
    this.volume = 0.7;
    this.isMuted = false;

    // Alle Audiodateien vorladen
    this.preloadAudio();
  }

  initSounds() {
    // Für jede Kategorie und jeden Sound-Typ Audio-Objekte erstellen
    for (const category in this.soundPaths) {
      for (const type in this.soundPaths[category]) {
        // Erstelle Audio-Objekt mit lokaler Datei
        const audio = new Audio(this.soundPaths[category][type]);
        
        // Fehlerbehandlung
        audio.addEventListener('error', () => {
          console.warn(`Audiodatei für ${category}.${type} konnte nicht geladen werden.`);
        });
        
        // Audio-Objekt konfigurieren
        audio.preload = 'auto';
        audio.volume = this.volume;
        
        // Audio-Objekt speichern
        this.sounds[category][type] = audio;
      }
    }
  }
  
  preloadAudio() {
    // Alle Audio-Objekte vorladen
    Object.values(this.sounds).forEach(category => {
      Object.values(category).forEach(audio => {
        if (audio instanceof Audio) {
          audio.load();
        }
      });
    });
  }

  playBackground(type) {
    if (this.currentBackground) {
      this.fadeOut(this.currentBackground, () => {
        this.currentBackground.pause();
        this.currentBackground.currentTime = 0;
      });
    }

    const newTrack = this.sounds.background[type];
    if (newTrack) {
      newTrack.loop = true;
      newTrack.volume = 0;
      
      // Mit Fehlerbehandlung abspielen
      newTrack.play().catch(error => {
        console.warn(`Fehler beim Abspielen der Hintergrundmusik ${type}:`, error);
      });
      
      this.fadeIn(newTrack);
      this.currentBackground = newTrack;
    }
  }

  playEffect(type) {
    const effect = this.sounds.effects[type];
    if (effect) {
      effect.currentTime = 0;
      
      // Mit Fehlerbehandlung abspielen
      effect.play().catch(error => {
        console.warn(`Fehler beim Abspielen des Soundeffekts ${type}:`, error);
      });
    }
  }

  playVoice(character) {
    const voice = this.sounds.voices[character];
    if (voice) {
      voice.currentTime = 0;
      
      // Mit Fehlerbehandlung abspielen
      voice.play().catch(error => {
        console.warn(`Fehler beim Abspielen der Stimme ${character}:`, error);
      });
    }
  }

  fadeIn(audio, duration = 1000) {
    let volume = 0;
    const interval = 50;
    const steps = duration / interval;
    const increment = this.volume / steps;

    const fadeInterval = setInterval(() => {
      if (volume < this.volume) {
        volume = Math.min(volume + increment, this.volume);
        audio.volume = volume;
      } else {
        clearInterval(fadeInterval);
      }
    }, interval);
  }

  fadeOut(audio, callback, duration = 1000) {
    let volume = audio.volume;
    const interval = 50;
    const steps = duration / interval;
    const decrement = volume / steps;

    const fadeInterval = setInterval(() => {
      if (volume > 0) {
        volume = Math.max(volume - decrement, 0);
        audio.volume = volume;
      } else {
        clearInterval(fadeInterval);
        if (callback) callback();
      }
    }, interval);
  }

  setVolume(level) {
    this.volume = Math.max(0, Math.min(1, level));
    Object.values(this.sounds).forEach(category => {
      Object.values(category).forEach(audio => {
        audio.volume = this.volume;
      });
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    Object.values(this.sounds).forEach(category => {
      Object.values(category).forEach(audio => {
        audio.muted = this.isMuted;
      });
    });
  }

  stopAll() {
    if (this.currentBackground) {
      this.fadeOut(this.currentBackground, () => {
        this.currentBackground.pause();
        this.currentBackground.currentTime = 0;
      });
    }

    Object.values(this.sounds.effects).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });

    Object.values(this.sounds.voices).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}

// Audio-System initialisieren und global verfügbar machen, aber nur wenn es noch nicht existiert
if (!window.audioSystem) {
  window.audioSystem = new AudioSystem();
  console.log('AudioSystem aus audio-system.js initialisiert');
}

window.audioSystem = new AudioSystem();