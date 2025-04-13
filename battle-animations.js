/**
 * Battle-Animations für das Riester-Quiz
 * Steuert die Kampfanimationen, Avatar-Bewegungen und visuellen Effekte
 */

class BattleAnimations {
  constructor() {
    this.player = null;
    this.enemy = null;
    this.battleContainer = null;
    
    // Warten bis DOM geladen ist, bevor wir initialisieren
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      // DOM ist bereits geladen
      this.init();
    }
  }

  init() {
    // Battle-Container erstellen
    this.createBattleContainer();
    
    // Avatare initialisieren
    this.initializeAvatars();
    
    // Event-Listener hinzufügen
    this.setupEventListeners();
  }

  createBattleContainer() {
    this.battleContainer = document.createElement('div');
    this.battleContainer.className = 'battle-container';
    const quizScreen = document.querySelector('#quizScreen');
    if (quizScreen) {
      quizScreen.appendChild(this.battleContainer);
    } else {
      console.warn('Quiz-Screen nicht gefunden, Battle-Container wird verzögert erstellt');
      // Container später erstellen, wenn quizScreen verfügbar ist
      setTimeout(() => this.createBattleContainer(), 500);
    }
  }

  initializeAvatars() {
    // Spieler-Avatar erstellen
    this.player = document.createElement('div');
    this.player.className = 'avatar player';
    this.player.innerHTML = `<img src="/images/player-avatar.png" alt="Spieler">`;
    this.battleContainer.appendChild(this.player);

    // Gegner-Avatar erstellen
    this.enemy = document.createElement('div');
    this.enemy.className = 'avatar enemy';
    this.enemy.id = 'currentEnemyImage';
    this.battleContainer.appendChild(this.enemy);
  }

  setupEventListeners() {
    // Event-Listener für Kampfaktionen
    document.addEventListener('correctAnswer', () => this.playAttackAnimation());
    document.addEventListener('wrongAnswer', () => this.playDamageAnimation());
    document.addEventListener('levelComplete', () => this.playVictoryAnimation());
  }

  updateEnemyAvatar(level) {
    const enemyImages = {
      1: '/images/unwissenheits-goblin.png',
      2: '/images/buerokratie-troll.png',
      3: '/images/produktvielfalt-hydra.png',
      4: '/images/steuer-vampir.png',
      5: '/images/terror-tru.png'
    };

    const enemyImg = this.enemy.querySelector('img') || document.createElement('img');
    enemyImg.src = enemyImages[level] || enemyImages[1];
    enemyImg.alt = `Level ${level} Gegner`;
    
    if (!this.enemy.contains(enemyImg)) {
      this.enemy.appendChild(enemyImg);
    }

    // Einblend-Animation
    this.enemy.style.opacity = '0';
    requestAnimationFrame(() => {
      this.enemy.style.transition = 'opacity 1s ease-in-out';
      this.enemy.style.opacity = '1';
    });
  }

  playAttackAnimation() {
    // Spieler-Angriff
    this.player.classList.add('attack');
    if (window.audioSystem && typeof window.audioSystem.playSoundEffect === 'function') {
      window.audioSystem.playSoundEffect('damage');
    }

    // Gegner wird getroffen
    setTimeout(() => {
      this.enemy.classList.add('hit');
      this.createLightningEffect();
      this.createSparkEffect();
    }, 250);

    // Animationen zurücksetzen
    setTimeout(() => {
      this.player.classList.remove('attack');
      this.enemy.classList.remove('hit');
    }, 750);
  }

  playDamageAnimation() {
    // Gegner-Angriff
    this.enemy.classList.add('attack');
    if (window.audioSystem && typeof window.audioSystem.playSoundEffect === 'function') {
      window.audioSystem.playSoundEffect('wrong');
    }

    // Spieler wird getroffen
    setTimeout(() => {
      this.player.classList.add('hit');
      this.createLightningEffect(true);
    }, 250);

    // Animationen zurücksetzen
    setTimeout(() => {
      this.enemy.classList.remove('attack');
      this.player.classList.remove('hit');
    }, 750);
  }

  playVictoryAnimation() {
    this.player.style.animation = 'victory 1s ease-in-out infinite';
    this.enemy.style.animation = 'defeat 1.5s ease-in-out forwards';
    
    if (window.audioSystem && typeof window.audioSystem.playSoundEffect === 'function') {
      window.audioSystem.playSoundEffect('victory');
    }

    // Sieges-Partikeleffekt
    this.createVictoryParticles();
  }

  createLightningEffect(isPlayer = false) {
    const target = isPlayer ? this.player : this.enemy;
    const lightning = document.createElement('div');
    lightning.className = 'lightning';
    target.appendChild(lightning);

    setTimeout(() => lightning.remove(), 500);
  }

  createSparkEffect() {
    const sparks = 15;
    const container = document.createElement('div');
    container.className = 'spark-container';
    this.enemy.appendChild(container);

    for (let i = 0; i < sparks; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      const angle = (Math.random() * 360) + 'deg';
      const distance = (Math.random() * 100 + 50) + 'px';
      spark.style.transform = `rotate(${angle}) translateX(${distance})`;
      container.appendChild(spark);
    }

    setTimeout(() => container.remove(), 1000);
  }

  createVictoryParticles() {
    const particles = 30;
    const container = document.createElement('div');
    container.className = 'victory-particles';
    this.battleContainer.appendChild(container);

    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.className = 'victory-particle';
      container.appendChild(particle);
    }

    setTimeout(() => container.remove(), 2000);
  }
}

// Battle-Animations-System initialisieren und global verfügbar machen
window.battleAnimations = new BattleAnimations();