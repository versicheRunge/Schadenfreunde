/**
 * Text-Animationen für das Riester-Quiz
 * Implementiert Schreibmaschineneffekt und verbesserte Textdarstellung
 */

class TextAnimations {
  constructor() {
    this.typingSpeed = 30; // Millisekunden pro Zeichen (schneller für bessere Benutzererfahrung)
    this.init();
    console.log('TextAnimations initialisiert');
  }

  init() {
    // Event-Listener für neue Fragen
    document.addEventListener('newQuestion', (event) => {
      if (event.detail && event.detail.question) {
        this.animateQuestion(event.detail.question);
      }
    });

    // Event-Listener für Weisheitssprüche
    document.addEventListener('showWisdom', (event) => {
      if (event.detail && event.detail.wisdom) {
        this.animateWisdom(event.detail.wisdom);
      }
    });
    
    // Event-Listener für Cutscene-Texte
    document.addEventListener('cutsceneShown', (event) => {
      if (event.detail && event.detail.content) {
        this.animateCutsceneText(event.detail.content);
      }
    });
    
    // Event-Listener für Gegner-Dialoge
    document.addEventListener('enemyShown', (event) => {
      if (event.detail && event.detail.taunt) {
        this.animateEnemyText(event.detail.taunt);
      }
    });
  }

  animateQuestion(questionText) {
    const questionElement = document.querySelector('#questionText');
    if (!questionElement) return;

    // Styling für bessere Lesbarkeit
    questionElement.className = 'question-text typewriter';
    questionElement.style.opacity = '0';
    
    // Text vorbereiten
    questionElement.textContent = '';
    
    // Einblendanimation
    requestAnimationFrame(() => {
      questionElement.style.transition = 'opacity 0.5s ease-in-out';
      questionElement.style.opacity = '1';
      
      // Schreibmaschineneffekt starten - mit optimierter Darstellung
      setTimeout(() => {
        this.typeText(questionElement, questionText);
      }, 300); // Kurze Verzögerung für besseren visuellen Effekt
    });
  }

  animateWisdom(wisdomText) {
    const wisdomElement = document.querySelector('#wisdomText');
    if (!wisdomElement) {
      // Weisheits-Container erstellen, falls nicht vorhanden
      const container = document.createElement('div');
      container.id = 'wisdomContainer';
      container.className = 'wisdom-container';
      
      const wisdomBox = document.createElement('div');
      wisdomBox.id = 'wisdomText';
      wisdomBox.className = 'wisdom-text typewriter';
      
      container.appendChild(wisdomBox);
      document.querySelector('#quizScreen').appendChild(container);
    }

    const element = document.querySelector('#wisdomText');
    if (!element) return;

    // Styling und Animation vorbereiten
    element.style.opacity = '0';
    element.textContent = '';
    
    // Einblendanimation mit Schreibmaschineneffekt
    requestAnimationFrame(() => {
      element.style.transition = 'opacity 0.5s ease-in-out';
      element.style.opacity = '1';
      
      // Schreibmaschineneffekt mit Soundeffekt
      this.typeText(element, wisdomText, true);
    });
  }

  typeText(element, text, withSound = false) {
    let index = 0;
    
    // Cursor-Element hinzufügen
    const cursorElement = document.createElement('span');
    cursorElement.className = 'typing-cursor';
    cursorElement.textContent = '|';
    cursorElement.style.display = 'inline-block';
    cursorElement.style.marginLeft = '2px';
    cursorElement.style.animation = 'cursor-blink 0.7s infinite';
    element.appendChild(cursorElement);
    
    // Stil für den Cursor hinzufügen, falls noch nicht vorhanden
    if (!document.getElementById('cursor-style')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'cursor-style';
      styleElement.textContent = `
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typing-cursor {
          display: inline-block;
          color: currentColor;
          font-weight: bold;
          margin-left: 2px;
          animation: cursor-blink 0.7s infinite;
        }
      `;
      document.head.appendChild(styleElement);
    }
    const characters = text.split('');
    
    // Text zurücksetzen - aber Cursor behalten
    element.textContent = '';
    element.appendChild(cursorElement);
    
    const typeNextCharacter = () => {
      if (index < characters.length) {
        // Zeichen hinzufügen (vor dem Cursor)
        element.removeChild(cursorElement);
        
        // Prüfen, ob es ein Zeilenumbruch ist
        if (characters[index] === '\n') {
          // Zeilenumbruch einfügen
          const lineBreak = document.createElement('br');
          element.appendChild(lineBreak);
        } else {
          // Normales Zeichen hinzufügen
          const textNode = document.createTextNode(characters[index]);
          element.appendChild(textNode);
        }
        
        // Cursor wieder anhängen
        element.appendChild(cursorElement);
        
        // Schreibmaschineneffekt-Sound abspielen
        if (withSound && window.audioSystem) {
          // Zeilenumbruch-Sound für Punkt, Ausrufezeichen und Fragezeichen
          if (['!', '.', '?'].includes(characters[index]) && window.audioSystem.playSoundEffect) {
            window.audioSystem.playSoundEffect('typewriterReturn');
            // Längere Pause nach Satzzeichen für natürlicheren Effekt
            setTimeout(() => {
              index++;
              setTimeout(typeNextCharacter, this.typingSpeed);
            }, this.typingSpeed * 4);
            return;
          } else if ([',', ';', ':'].includes(characters[index]) && window.audioSystem.playSoundEffect) {
            // Mittlere Pause nach Komma und anderen Satzzeichen
            window.audioSystem.playSoundEffect('typewriter');
            setTimeout(() => {
              index++;
              setTimeout(typeNextCharacter, this.typingSpeed);
            }, this.typingSpeed * 2);
            return;
          } else if (window.audioSystem.playSoundEffect) {
            window.audioSystem.playSoundEffect('typewriter');
          }
        }
        
        // Scroll zum Ende des Elements, um den neuesten Text zu zeigen
        element.scrollTop = element.scrollHeight;
        
        index++;
        setTimeout(typeNextCharacter, this.typingSpeed);
      } else {
        // Animation abgeschlossen
        // Cursor-Blinken für 1 Sekunde fortsetzen und dann entfernen
        setTimeout(() => {
          // Cursor entfernen
          if (element.contains(cursorElement)) {
            element.removeChild(cursorElement);
          }
          
          // Event auslösen, wenn Animation abgeschlossen ist
          document.dispatchEvent(new CustomEvent('typingComplete', {
            detail: { element: element }
          }));
        }, 1000);
        
        // Zeilenumbruch-Sound
        if (withSound && window.audioSystem && window.audioSystem.playSoundEffect) {
          window.audioSystem.playSoundEffect('typewriterReturn');
        }
      }
    };

    typeNextCharacter();
  }

  setTypingSpeed(speed) {
    this.typingSpeed = Math.max(10, Math.min(200, speed));
  }

  clearAnimations() {
    const elements = document.querySelectorAll('.typewriter');
    elements.forEach(element => {
      element.classList.remove('typewriter');
      element.style.opacity = '0';
    });
  }
  
  // Cutscene-Text animieren
  animateCutsceneText(contentHTML) {
    const cutsceneTextElement = document.querySelector('.cutscene-text');
    if (!cutsceneTextElement) return;
    
    // HTML-Inhalt setzen, aber Paragraphen einzeln animieren
    cutsceneTextElement.innerHTML = contentHTML;
    
    // Alle Paragraphen finden
    const paragraphs = cutsceneTextElement.querySelectorAll('p');
    
    // Paragraphen nacheinander animieren
    let delay = 0;
    paragraphs.forEach((paragraph, index) => {
      // Original-Text speichern
      const originalText = paragraph.textContent;
      // Text zurücksetzen
      paragraph.textContent = '';
      // Klasse hinzufügen
      paragraph.classList.add('typewriter-paragraph');
      
      // Visuellen Indikator hinzufügen, dass dieser Paragraph als nächstes animiert wird
      if (index > 0) {
        paragraph.style.opacity = '0.3';
      }
      
      // Mit Verzögerung animieren
      setTimeout(() => {
        // Paragraph auf volle Sichtbarkeit setzen
        paragraph.style.opacity = '1';
        // Text mit Schreibmaschineneffekt anzeigen
        this.typeText(paragraph, originalText, true);
        
        // Event-Listener für das Ende der Animation
        document.addEventListener('typingComplete', function onTypingComplete(e) {
          if (e.detail.element === paragraph) {
            // Event-Listener entfernen, um Speicherlecks zu vermeiden
            document.removeEventListener('typingComplete', onTypingComplete);
          }
        });
      }, delay);
      
      // Verzögerung für nächsten Paragraphen - warten bis der vorherige Paragraph fertig ist
      // plus eine kleine zusätzliche Pause für bessere Lesbarkeit
      delay += originalText.length * this.typingSpeed + 1200;
    });
  }
  
  // Gegner-Text animieren
  animateEnemyText(text) {
    const enemyTauntElement = document.querySelector('.enemy-taunt');
    if (!enemyTauntElement) return;
    
    // Text vorbereiten
    enemyTauntElement.textContent = '';
    enemyTauntElement.classList.add('typewriter');
    
    // Schreibmaschineneffekt starten
    this.typeText(enemyTauntElement, text, true);
  }
}

// Text-Animations-System initialisieren und global verfügbar machen
window.textAnimations = new TextAnimations();