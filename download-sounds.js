/**
 * Download-Skript für Riester-Quiz Sounddateien
 * Lädt alle benötigten Sounddateien von externen Quellen herunter
 * und speichert sie im lokalen Sounds-Ordner
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

// Stellen Sie sicher, dass der Sounds-Ordner existiert
const soundsDir = path.join(__dirname, 'sounds');
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
  console.log('Sounds-Ordner erstellt:', soundsDir);
}

// Direkt zugängliche Audioquellen (gleiche wie in audio-system.js)
const soundSources = {
  background: {
    menu: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=game-music-loop-3-144252.mp3', // Game music
    battle: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bbd.mp3?filename=epic-battle-138297.mp3', // Battle music
    victory: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_c6ccf9232f.mp3?filename=success-1-6297.mp3', // Victory fanfare
    boss: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_946cb3b977.mp3?filename=epic-cinematic-gaming-trailer-11022.mp3' // Epic boss music
  },
  effects: {
    click: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8574a7c62.mp3?filename=click-button-140881.mp3', // UI click
    correct: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=success-fanfare-trumpets-6185.mp3', // Correct answer
    wrong: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_d3b28f7ce0.mp3?filename=wrong-answer-126515.mp3', // Wrong answer
    damage: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_270f49b275.mp3?filename=punch-140236.mp3', // Damage sound
    heal: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_d482fbec25.mp3?filename=fairy-magic-wand-6985.mp3', // Heal sound
    levelUp: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_c8c8b7b439.mp3?filename=success-fanfare-trumpets-6185.mp3', // Level up
    typewriter: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=keyboard-typing-3-82480.mp3', // Typewriter key
    typewriterReturn: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=keyboard-typing-return-1-82482.mp3', // Typewriter return
    buttonBurn: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=explosion-6055.mp3', // Button burn
    buttonHover: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8574a7c62.mp3?filename=click-button-140881.mp3' // Button hover
  },
  voices: {
    goblin: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=monster-growl-6985.mp3', // Goblin voice
    troll: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=monster-roar-6985.mp3', // Troll voice
    hydra: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=dragon-roar-6985.mp3', // Hydra voice
    vampire: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=horror-scream-6985.mp3', // Vampire voice
    boss: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=monster-roar-6985.mp3' // Boss voice
  }
};

// Lokale Dateinamen (gleiche wie in audio-system.js)
const localFiles = {
  background: {
    menu: 'background-menu.mp3',
    battle: 'background-battle.mp3',
    victory: 'background-victory.mp3',
    boss: 'background-boss.mp3'
  },
  effects: {
    click: 'effect-click.mp3',
    correct: 'effect-correct.mp3',
    wrong: 'effect-wrong.mp3',
    damage: 'effect-damage.mp3',
    heal: 'effect-heal.mp3',
    levelUp: 'effect-levelup.mp3',
    typewriter: 'effect-typewriter.mp3',
    typewriterReturn: 'effect-typewriter-return.mp3',
    buttonBurn: 'effect-button-burn.mp3',
    buttonHover: 'effect-button-hover.mp3'
  },
  voices: {
    goblin: 'voice-goblin.mp3',
    troll: 'voice-troll.mp3',
    hydra: 'voice-hydra.mp3',
    vampire: 'voice-vampire.mp3',
    boss: 'voice-boss.mp3'
  }
};

/**
 * Lädt eine Datei von einer URL herunter und speichert sie lokal
 * @param {string} url - Die URL der herunterzuladenden Datei
 * @param {string} localPath - Der lokale Pfad zum Speichern der Datei
 * @returns {Promise} - Ein Promise, das nach dem Download aufgelöst wird
 */
function downloadFile(url, localPath) {
  return new Promise((resolve, reject) => {
    console.log(`Lade herunter: ${url} -> ${localPath}`);
    
    const file = fs.createWriteStream(localPath);
    
    // Optionen für die Anfrage, um Weiterleitungen zu folgen
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': '*/*'
      }
    };
    
    const request = https.get(url, options, (response) => {
      // Weiterleitungen verfolgen
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        console.log(`Weiterleitung zu: ${redirectUrl}`);
        
        // Datei schließen und neue Anfrage starten
        file.close();
        downloadFile(redirectUrl, localPath).then(resolve).catch(reject);
        return;
      }
      
      // Überprüfen, ob die Anfrage erfolgreich war
      if (response.statusCode !== 200) {
        reject(new Error(`Fehler beim Herunterladen: ${response.statusCode} ${response.statusMessage}`));
        return;
      }
      
      // Daten in die Datei schreiben
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        // Überprüfen, ob die Datei tatsächlich Inhalt hat
        fs.stat(localPath, (err, stats) => {
          if (err) {
            reject(new Error(`Fehler beim Überprüfen der Datei: ${err.message}`));
            return;
          }
          
          if (stats.size === 0) {
            fs.unlink(localPath, () => {});
            reject(new Error(`Leere Datei heruntergeladen: ${localPath}`));
            return;
          }
          
          console.log(`Download abgeschlossen: ${localPath} (${stats.size} Bytes)`);
          resolve();
        });
      });
    });
    
    request.on('error', (err) => {
      // Bei Fehler die Datei löschen und den Fehler zurückgeben
      file.close();
      fs.unlink(localPath, () => {});
      console.error(`Fehler beim Herunterladen von ${url}:`, err.message);
      reject(err);
    });
    
    // Timeout setzen
    request.setTimeout(30000, () => {
      request.abort();
      file.close();
      fs.unlink(localPath, () => {});
      reject(new Error(`Timeout beim Herunterladen von ${url}`));
    });
  });
}

/**
 * Lädt alle Sounddateien herunter
 */
async function downloadAllSounds() {
  const downloads = [];
  
  // Für jede Kategorie und jeden Sound-Typ
  for (const category in soundSources) {
    for (const type in soundSources[category]) {
      const url = soundSources[category][type];
      const filename = localFiles[category][type];
      const localPath = path.join(soundsDir, filename);
      
      // Nur herunterladen, wenn die Datei noch nicht existiert
      if (!fs.existsSync(localPath)) {
        downloads.push(downloadFile(url, localPath).catch(err => {
          console.error(`Konnte ${filename} nicht herunterladen:`, err.message);
        }));
      } else {
        console.log(`Datei existiert bereits: ${localPath}`);
      }
    }
  }
  
  // Auf alle Downloads warten
  await Promise.all(downloads);
  console.log('Alle Downloads abgeschlossen!');
}

// Starte den Download-Prozess
downloadAllSounds().catch(err => {
  console.error('Fehler beim Herunterladen der Sounddateien:', err);
});