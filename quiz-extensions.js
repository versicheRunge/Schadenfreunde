/**
 * Erweiterte Funktionen für das Riester-Helden Quiz
 * Enthält zusätzliche Fragen, verbesserte Soundeffekte und visuelle Verbesserungen
 */

// Soundeffekte verbessern
function enhanceSoundEffects() {
  // Sicherstellen, dass das Audio-System existiert
  if (!window.audioSystem) {
    console.error('Audio-System nicht gefunden');
    return;
  }

  // Prüfen, ob das Audio-System bereits erweitert wurde
  if (window.audioSystem.enhanced) {
    console.log('Audio-System wurde bereits erweitert');
    return;
  }

  // Überschreiben der bestehenden Sound-Funktionen
  const originalPlaySoundEffect = window.audioSystem.playSoundEffect;
  window.audioSystem.playSoundEffect = function(type, volume = 0.7) {
    // Original-Funktion aufrufen, falls vorhanden
    if (typeof originalPlaySoundEffect === 'function') {
      originalPlaySoundEffect.call(this, type, volume);
    }
    
    // Spezielle Soundeffekte für verschiedene Ereignisse
    switch(type) {
      case 'correct':
        if (typeof window.audioSystem.playDramaticSound === 'function') {
          window.audioSystem.playDramaticSound('success', volume);
        }
        break;
      case 'wrong':
        if (typeof window.audioSystem.playDramaticSound === 'function') {
          window.audioSystem.playDramaticSound('danger', volume);
        }
        break;
      case 'levelComplete':
        if (typeof window.audioSystem.playDramaticSound === 'function') {
          window.audioSystem.playDramaticSound('victory', volume);
        }
        break;
      case 'enemy':
        if (window.currentLevel && typeof window.audioSystem.playEnemySound === 'function') {
          window.audioSystem.playEnemySound(window.currentLevel);
        }
        break;
    }
  };

  // Markieren, dass das Audio-System erweitert wurde
  window.audioSystem.enhanced = true;
  console.log('Audio-System erfolgreich erweitert');
}

// Quiz verlängern (8 Fragen statt 5 pro Level)
function extendQuizLength() {
  // Anpassen der Anzahl der Fragen in relevanten Funktionen
  const questionsPerLevel = 8; // Neue Anzahl der Fragen pro Level
  window.questionsPerLevel = questionsPerLevel;
  
  // showQuestion Funktion anpassen
  const originalShowQuestion = window.showQuestion;
  window.showQuestion = function() {
    const questionCounter = document.getElementById('questionCounter');
    const progressBar = document.getElementById('progressBar');
    
    // Original-Funktion aufrufen
    originalShowQuestion.call(this);
    
    // Anpassen des Fragen-Zählers und des Fortschrittsbalkens
    if (questionCounter && progressBar) {
      questionCounter.textContent = `Frage ${currentQuestion + 1}/${questionsPerLevel}`;
      const progress = ((currentQuestion) / questionsPerLevel) * 100;
      progressBar.style.width = `${progress}%`;
    }
  };
  
  // Level-Abschluss-Logik anpassen
  const originalShowLevelComplete = window.showLevelComplete;
  window.showLevelComplete = function() {
    if (currentQuestion >= questionsPerLevel - 1) {
      // Level ist wirklich beendet
      originalShowLevelComplete.call(this);
    } else {
      // Weitermachen mit nächster Frage
      showNextQuestion();
    }
  };
  
  // Punktestand-Anzeige aktualisieren
  const originalUpdateScore = window.updateScore;
  window.updateScore = function() {
    if (originalUpdateScore) {
      originalUpdateScore.call(this);
    }
    const scoreElement = document.getElementById('levelScore');
    if (scoreElement) {
      scoreElement.textContent = `${levelScores[currentLevel] || 0} von ${questionsPerLevel}`;
    }
  };
}

// Visuelles Feedback verbessern
function enhanceVisualFeedback() {
  // Konfetti-Funktion für besondere Erfolge
  window.createConfetti = function(count = 100) {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);
    
    const colors = ['#3b82f6', '#1e3a8a', '#fbbf24', '#16a34a', '#ef4444'];
    
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confettiContainer.appendChild(confetti);
      
      // Zufällige Animation
      const duration = 1000 + Math.random() * 2000;
      const rotation = Math.random() * 360;
      const spread = Math.random() * window.innerWidth;
      
      confetti.style.animation = `confetti-fall ${duration}ms linear forwards`;
      confetti.style.transform = `rotate(${rotation}deg) translateX(${spread}px)`;
    }
    
    // Container nach Animation entfernen
    setTimeout(() => {
      confettiContainer.remove();
    }, 3000);
  };
}

// Hauptfunktion zur Integration aller Verbesserungen
function enhanceRiesterQuiz() {
  console.log("🚀 Riester-Helden-Quiz wird aufgepeppt...");
  
  // Soundeffekte verbessern
  console.log("🔊 Soundeffekte werden optimiert...");
  enhanceSoundEffects();
  
  // Quiz länger machen (8 statt 5 Fragen pro Level)
  console.log("📝 Quiz wird verlängert...");
  extendQuizLength();
  
  // Visuelles Feedback verbessern
  console.log("✨ Visuelle Effekte werden aufgehübscht...");
  enhanceVisualFeedback();
  
  console.log("✅ Riester-Helden-Quiz erfolgreich verbessert!");
}

// Starte die Verbesserungen, wenn das Dokument geladen ist
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enhanceRiesterQuiz);
} else {
  enhanceRiesterQuiz();
}

// Exportiere die Funktionen für externen Zugriff
window.riesterHeldenPlus = {
  enhance: enhanceRiesterQuiz
};