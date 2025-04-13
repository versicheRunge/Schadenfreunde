/**
 * Nebeleffekte und Button-Animationen für das Riester-Quiz
 */

class FogEffects {
  constructor() {
    this.init();
  }

  init() {
    // Nebeleffekt-Container erstellen
    this.createFogContainer();
    
    // Button-Effekte initialisieren
    this.initializeButtonEffects();
  }

  createFogContainer() {
    const fogContainer = document.createElement('div');
    fogContainer.className = 'fog-container';
    
    // Drei Nebelschichten für mehr Tiefe
    for (let i = 0; i < 3; i++) {
      const fog = document.createElement('div');
      fog.className = 'fog';
      fog.style.animationDelay = `${i * 2}s`;
      fogContainer.appendChild(fog);
    }

    document.querySelector('#quizScreen').appendChild(fogContainer);
  }

  initializeButtonEffects() {
    // Weiter-Button-Effekte
    document.addEventListener('click', (event) => {
      if (event.target.matches('.next-button')) {
        this.burnButton(event.target);
      }
    });

    // Hover-Soundeffekte
    document.addEventListener('mouseover', (event) => {
      if (event.target.matches('button')) {
        if (window.audioSystem && window.audioSystem.playSoundEffect) {
          window.audioSystem.playSoundEffect('buttonHover');
        }
      }
    });
  }

  showFog() {
    const fogs = document.querySelectorAll('.fog');
    fogs.forEach(fog => fog.classList.add('active'));
  }

  hideFog() {
    const fogs = document.querySelectorAll('.fog');
    fogs.forEach(fog => fog.classList.remove('active'));
  }

  burnButton(button) {
    // Verbrennungseffekt abspielen
    if (window.audioSystem && window.audioSystem.playSoundEffect) {
      window.audioSystem.playSoundEffect('buttonBurn');
    }
    
    button.classList.add('burning');
    
    // Button nach der Animation entfernen
    button.addEventListener('transitionend', () => {
      button.remove();
    }, { once: true });
  }

  // Nebeleffekt für neue Fragen
  onNewQuestion() {
    this.showFog();
    setTimeout(() => this.hideFog(), 1000);
  }
}

// Fog-Effects-System initialisieren und global verfügbar machen
window.fogEffects = new FogEffects();