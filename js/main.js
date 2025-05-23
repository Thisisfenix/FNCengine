// main.js - Versión completa mejorada

// Elementos del DOM
const elementos = {
    menuPrincipal: document.getElementById('menu-principal'),
    panelActualizacion: document.getElementById('panel-actualizacion'),
    panelLogros: document.getElementById('panel-logros'),
    panelOpciones: document.getElementById('panel-opciones'),
    panelCreditos: document.getElementById('panel-creditos'),
    panelSecretos: document.getElementById('panel-secretos'),
    btnJugar: document.getElementById('btn-jugar'),
    btnSecretos: document.getElementById('btn-secretos'),
    btnActualizacion: document.getElementById('btn-actualizacion'),
    btnLogros: document.getElementById('btn-logros'),
    btnOpciones: document.getElementById('btn-opciones'),
    btnCreditos: document.getElementById('btn-creditos'),
    btnSalir: document.getElementById('btn-salir'),
    btnVolverMenuAct: document.getElementById('btn-volver-menu-act'),
    btnVolverMenuLogros: document.getElementById('btn-volver-menu-logros'),
    btnVolverMenu: document.getElementById('btn-volver-menu'),
    btnCerrarCreditos: document.getElementById('btn-cerrar-creditos'),
    btnCerrarSecretos: document.getElementById('btn-cerrar-secretos'),
    btnGuardarOpciones: document.getElementById('btn-guardar-opciones'),
    btnResetOpciones: document.getElementById('btn-reset-opciones'),
    btnSubmitPassword: document.getElementById('submit-password'),
    colorPicker: document.getElementById('color-picker'),
    selectorTema: document.getElementById('selector-tema'),
    selectorDificultad: document.getElementById('selector-dificultad'),
    selectorControles: document.getElementById('selector-controles'),
    volumenMusica: document.getElementById('volumen-musica'),
    volumenSonido: document.getElementById('volumen-sonido'),
    valorVolumenMusica: document.getElementById('valor-volumen-musica'),
    valorVolumenSonido: document.getElementById('valor-volumen-sonido'),
    updateBanner: document.getElementById('update-banner'),
    fondoOscuro: document.getElementById('fondo-oscuro'),
    bgMusic: document.getElementById('bg-music'),
    bgMusic1: document.getElementById('bg-music-1'),
    bgMusic2: document.getElementById('bg-music-2'),
    soundEffect: document.getElementById('sound-effect'),
    secretSound: document.getElementById('secret-sound'),
    btnPlayMusic: document.getElementById('btn-play-music'),
    btnPauseMusic: document.getElementById('btn-pause-music'),
    btnStopMusic: document.getElementById('btn-stop-music'),
    btnPrevMusic: document.getElementById('btn-prev-music'),
    btnNextMusic: document.getElementById('btn-next-music'),
    autoPlayMusic: document.getElementById('auto-play-music'),
    nombreMusica: document.getElementById('nombre-musica'),
    selectMusic: document.getElementById('select-music'),
    secretsContainer: document.getElementById('secrets-container'),
    toggleAdvancedSettings: document.getElementById('toggle-advanced-settings'),
    advancedSettingsContent: document.getElementById('advanced-settings-content'),
    animationSpeed: document.getElementById('animation-speed'),
    soundEffects: document.getElementById('sound-effects'),
    enableShake: document.getElementById('enable-shake'),
    showHints: document.getElementById('show-hints'),
    resetConfirm: document.getElementById('reset-confirm'),
    inputPassword: document.getElementById('secret-password'),
    achievements: {
        firstLaunch: document.getElementById('achievement-firstLaunch'),
        updateChecker: document.getElementById('achievement-updateChecker'),
        optionsExplorer: document.getElementById('achievement-optionsExplorer'),
        musicLover: document.getElementById('achievement-musicLover'),
        colorChanger: document.getElementById('achievement-colorChanger'),
        secretFinder: document.getElementById('achievement-secretFinder'),
        musicExplorer: document.getElementById('achievement-musicExplorer'),
        clickMaster: document.getElementById('achievement-clickMaster'),
        firstRecipe: document.getElementById('achievement-firstRecipe'),
        fiveRecipes: document.getElementById('achievement-fiveRecipes'),
        tenRecipes: document.getElementById('achievement-tenRecipes'),
        perfectRecipe: document.getElementById('achievement-perfectRecipe'),
        timeChallenge: document.getElementById('achievement-timeChallenge'),
        timeTraveler: document.getElementById('achievement-timeTraveler'),
        masterChef: document.getElementById('achievement-masterChef'),
        speedRunner: document.getElementById('achievement-speedRunner'),
        collector: document.getElementById('achievement-collector'),
        secretMaster: document.getElementById('achievement-secretMaster')
    },
    secretItems: {
        secret1: document.getElementById('secret-1'),
        secret2: document.getElementById('secret-2'),
        secret3: document.getElementById('secret-3'),
        secret4: document.getElementById('secret-4'),
        secret5: document.getElementById('secret-5'),
        secret6: document.getElementById('secret-6'),
        secretPanel: document.getElementById('secret-panel')
    }
};

// Variables de estado
let currentMusicIndex = 0;
const musicTracks = [
    { element: elementos.bgMusic, name: "Lo-fi Cooking" },
    { element: elementos.bgMusic1, name: "Kitchen Groove" },
    { element: elementos.bgMusic2, name: "Midnight Snack" }
];
const secretCodes = {
    konami: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    currentInput: []
};
let clickCount = 0;
let visitedHours = new Set();
let achievementsData = {};

// Inicializar controles de música
function initMusicControls() {
    elementos.btnPlayMusic.addEventListener('click', () => {
        musicTracks[currentMusicIndex].element.play();
        elementos.nombreMusica.textContent = musicTracks[currentMusicIndex].name;
        playSoundEffect();
        unlockAchievement('musicLover');
        checkMusicExplorerAchievement();
    });

    elementos.btnPauseMusic.addEventListener('click', () => {
        musicTracks[currentMusicIndex].element.pause();
        playSoundEffect();
    });

    elementos.btnStopMusic.addEventListener('click', () => {
        musicTracks[currentMusicIndex].element.pause();
        musicTracks[currentMusicIndex].element.currentTime = 0;
        playSoundEffect();
    });

    elementos.btnPrevMusic.addEventListener('click', () => {
        changeMusic(-1);
        playSoundEffect();
    });

    elementos.btnNextMusic.addEventListener('click', () => {
        changeMusic(1);
        playSoundEffect();
    });

    elementos.selectMusic.addEventListener('change', (e) => {
        const newIndex = parseInt(e.target.value);
        if (newIndex !== currentMusicIndex) {
            musicTracks[currentMusicIndex].element.pause();
            currentMusicIndex = newIndex;
            if (!musicTracks[currentMusicIndex].element.paused) {
                musicTracks[currentMusicIndex].element.play();
            }
            elementos.nombreMusica.textContent = musicTracks[currentMusicIndex].name;
            checkMusicExplorerAchievement();
        }
    });

    elementos.volumenMusica.addEventListener('input', (e) => {
        const volumen = e.target.value / 100;
        musicTracks.forEach(track => {
            track.element.volume = volumen;
        });
        elementos.valorVolumenMusica.textContent = e.target.value;
    });

    elementos.toggleAdvancedSettings.addEventListener('click', () => {
        elementos.advancedSettingsContent.classList.toggle('collapsed');
        elementos.toggleAdvancedSettings.classList.toggle('collapsed');

        if (!elementos.advancedSettingsContent.classList.contains('collapsed')) {
            elementos.advancedSettingsContent.style.maxHeight = elementos.advancedSettingsContent.scrollHeight + 'px';
        }
    });

    if (localStorage.getItem('autoPlayMusic')) {
        elementos.autoPlayMusic.checked = true;
        document.addEventListener('click', function primeraInteraccion() {
            if (elementos.autoPlayMusic.checked) {
                musicTracks[currentMusicIndex].element.play().catch(e => console.log("Auto-play bloqueado:", e));
            }
            document.removeEventListener('click', primeraInteraccion);
        }, { once: true });
    }

    const volMusica = localStorage.getItem('volumenMusica') || 50;
    musicTracks.forEach(track => {
        track.element.volume = volMusica / 100;
    });
}

function changeMusic(direction) {
    musicTracks[currentMusicIndex].element.pause();

    currentMusicIndex += direction;
    if (currentMusicIndex >= musicTracks.length) currentMusicIndex = 0;
    if (currentMusicIndex < 0) currentMusicIndex = musicTracks.length - 1;

    elementos.selectMusic.value = currentMusicIndex;
    elementos.nombreMusica.textContent = musicTracks[currentMusicIndex].name;

    if (!musicTracks[currentMusicIndex].element.paused) {
        musicTracks[currentMusicIndex].element.play();
    }

    checkMusicExplorerAchievement();
}

function checkMusicExplorerAchievement() {
    if (achievementsData.musicExplorer) return;

    const allHeard = musicTracks.every((track, index) => {
        return localStorage.getItem(`music_heard_${index}`) ||
            (currentMusicIndex === index && !track.element.paused);
    });

    if (allHeard) {
        unlockAchievement('musicExplorer');
    } else {
        localStorage.setItem(`music_heard_${currentMusicIndex}`, 'true');
    }
}

function playSoundEffect() {
    const soundSetting = localStorage.getItem('soundEffects') || 'full';
    if (soundSetting === 'none') return;

    elementos.soundEffect.currentTime = 0;
    elementos.soundEffect.volume = elementos.volumenSonido.value / 100;

    if (soundSetting === 'full' || (soundSetting === 'minimal' && Math.random() > 0.7)) {
        elementos.soundEffect.play().catch(e => console.log("Error al reproducir sonido:", e));
    }
}

function playSecretSound() {
    elementos.secretSound.currentTime = 0;
    elementos.secretSound.volume = elementos.volumenSonido.value / 100;
    elementos.secretSound.play().catch(e => console.log("Error al reproducir sonido de secreto:", e));
}

function mostrarPanel(panel) {
    elementos.fondoOscuro.classList.add('active');
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';
    playSoundEffect();
}

function ocultarPaneles() {
    document.querySelectorAll('.popup-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    elementos.fondoOscuro.classList.remove('active');
    document.body.style.overflow = '';
    playSoundEffect();
}

function volverAlMenu() {
    ocultarPaneles();

    const shakeEnabled = localStorage.getItem('enableShake') !== 'false';
    if (shakeEnabled) {
        elementos.menuPrincipal.style.animation = 'none';
        void elementos.menuPrincipal.offsetWidth;
        elementos.menuPrincipal.style.animation = 'shake 0.5s';
    }

    playSoundEffect();
}

function showAchievementNotification(title, description) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-notification-content">
            <div class="achievement-notification-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <div class="achievement-notification-text">
                <h4>¡Logro desbloqueado!</h4>
                <h5>${title}</h5>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

function unlockAchievement(achievementId) {
    // Si ya está desbloqueado, no hacer nada
    if (achievementsData[achievementId]) return;

    // Marcar como desbloqueado
    achievementsData[achievementId] = true;
    localStorage.setItem('fnc-achievements', JSON.stringify(achievementsData));
    sessionStorage.setItem('fnc-achievements', JSON.stringify(achievementsData));
    
    // Actualizar la UI
    const achievement = elementos.achievements[achievementId];
    if (achievement) {
        achievement.classList.remove('achievement-locked');
        const progressBar = achievement.querySelector('.achievement-progress-bar');
        if (progressBar) {
            progressBar.style.width = '100%';
        }

        // Mostrar notificación visual
        const title = achievement.querySelector('.achievement-title').textContent;
        const desc = achievement.querySelector('.achievement-desc').textContent;
        
        if (localStorage.getItem('showHints') !== 'false') {
            showAchievementNotification(title, desc);
        }
    }
}

function unlockSecret(secretId) {
    const secret = elementos.secretItems[secretId];
    if (!secret || localStorage.getItem(`secret_${secretId}`)) return;

    localStorage.setItem(`secret_${secretId}`, 'true');
    secret.classList.add('unlocked');

    const title = secret.querySelector('h5')?.textContent || "Secreto Desbloqueado";
    playSecretSound();
    unlockAchievement('secretFinder');

    if (secretId === 'secret4') {
        setTimeout(() => {
            showAchievementNotification("Maestro Konami", "Has descubierto el código Konami en el juego. ¡Bien hecho!");
        }, 500);
    }

    saveSecret(secretId);
}

function cargarPreferencias() {
    const colorGuardado = localStorage.getItem('colorMenu');
    if (colorGuardado) {
        elementos.colorPicker.value = colorGuardado;
        document.documentElement.style.setProperty('--color-menu', colorGuardado);
        document.documentElement.style.setProperty('--color-menu-hover', ajustarBrillo(colorGuardado, 20));
    }

    const temaGuardado = localStorage.getItem('temaPreferido');
    if (temaGuardado) {
        elementos.selectorTema.value = temaGuardado;
        aplicarTema(temaGuardado);
    }

    const volMusica = localStorage.getItem('volumenMusica');
    if (volMusica) {
        elementos.volumenMusica.value = volMusica;
        elementos.valorVolumenMusica.textContent = volMusica;
        musicTracks.forEach(track => {
            track.element.volume = volMusica / 100;
        });
    }

    const volSonido = localStorage.getItem('volumenSonido');
    if (volSonido) {
        elementos.volumenSonido.value = volSonido;
        elementos.valorVolumenSonido.textContent = volSonido;
    }

    const animationSpeed = localStorage.getItem('animationSpeed');
    if (animationSpeed) {
        elementos.animationSpeed.value = animationSpeed;
        document.documentElement.style.setProperty('--transicion-rapida', `all ${animationSpeed}s ease`);
    }

    const soundEffects = localStorage.getItem('soundEffects');
    if (soundEffects) {
        elementos.soundEffects.value = soundEffects;
    }

    const enableShake = localStorage.getItem('enableShake');
    if (enableShake !== null) {
        elementos.enableShake.checked = enableShake === 'true';
    }

    const showHints = localStorage.getItem('showHints');
    if (showHints !== null) {
        elementos.showHints.checked = showHints === 'true';
    }

    const resetConfirm = localStorage.getItem('resetConfirm');
    if (resetConfirm !== null) {
        elementos.resetConfirm.checked = resetConfirm === 'true';
    }

    const dificultad = localStorage.getItem('dificultad') || 'normal';
    elementos.selectorDificultad.value = dificultad;
    
    const controles = localStorage.getItem('controles') || 'teclado';
    elementos.selectorControles.value = controles;

    loadAchievements();
    loadSecrets();

    clickCount = parseInt(localStorage.getItem('clickCount') || 0);
    updateClickMasterAchievement();

    const savedHours = localStorage.getItem('visitedHours');
    if (savedHours) {
        visitedHours = new Set(JSON.parse(savedHours));
        updateTimeTravelerAchievement();
    }
}

function ajustarBrillo(hex, percent) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.min(255, r + r * percent / 100);
    g = Math.min(255, g + g * percent / 100);
    b = Math.min(255, b + b * percent / 100);

    r = Math.round(r).toString(16).padStart(2, '0');
    g = Math.round(g).toString(16).padStart(2, '0');
    b = Math.round(b).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
}

function aplicarTema(tema) {
    document.body.classList.remove('tema-claro', 'tema-oscuro');

    if (tema === 'light') {
        document.body.classList.add('tema-claro');
    } else if (tema === 'dark') {
        document.body.classList.add('tema-oscuro');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.classList.add('tema-claro');
    } else {
        document.body.classList.add('tema-oscuro');
    }
}

function setupKonamiCode() {
    document.addEventListener('keydown', (e) => {
        secretCodes.currentInput.push(e.key);

        if (secretCodes.currentInput.length > secretCodes.konami.length) {
            secretCodes.currentInput.shift();
        }

        if (secretCodes.currentInput.length === secretCodes.konami.length) {
            const isKonami = secretCodes.currentInput.every((val, index) => val === secretCodes.konami[index]);

            if (isKonami) {
                unlockSecret('secret4');
            }
        }
    });
}

function updateClickMasterAchievement() {
    if (achievementsData.clickMaster) return;

    const achievement = elementos.achievements.clickMaster;
    const progress = Math.min(100, (clickCount / 100) * 100);

    achievement.querySelector('.achievement-progress-bar').style.width = `${progress}%`;

    if (clickCount >= 100) {
        unlockAchievement('clickMaster');
    }
}

function updateTimeTravelerAchievement() {
    if (achievementsData.timeTraveler) return;

    const now = new Date();
    const currentHour = now.getHours();

    if (!visitedHours.has(currentHour)) {
        visitedHours.add(currentHour);
        localStorage.setItem('visitedHours', JSON.stringify(Array.from(visitedHours)));
    }

    const achievement = elementos.achievements.timeTraveler;
    const progress = Math.min(100, (visitedHours.size / 24) * 100);

    achievement.querySelector('.achievement-progress-bar').style.width = `${progress}%`;

    if (visitedHours.size >= 5) {
        unlockAchievement('timeTraveler');
    }
}

function redirigirAJuego() {
    try {
        console.log("Preparando datos para game.html...");
        
        const gameData = {
            colorMenu: localStorage.getItem('colorMenu') || '#f39c12',
            volumenMusica: localStorage.getItem('volumenMusica') || 50,
            volumenSonido: localStorage.getItem('volumenSonido') || 50,
            dificultad: localStorage.getItem('dificultad') || 'normal',
            controles: localStorage.getItem('controles') || 'teclado',
            achievements: achievementsData,
            secrets: JSON.parse(localStorage.getItem('fnc-secrets') || [])
        };

        console.log("Datos a enviar:", gameData);
        
        sessionStorage.setItem('fnc-gameData', JSON.stringify(gameData));
        console.log("Redirigiendo a game.html...");
        
        if (window.location.pathname.endsWith('game.html')) {
            window.location.reload();
        } else {
            window.location.href = 'game.html';
        }
        
    } catch (error) {
        console.error("Error al redirigir:", error);
        alert("Error al cargar el juego. Por favor recarga la página.");
    }
}

function cargarDatosDesdeJuego() {
    const gameData = JSON.parse(sessionStorage.getItem('fnc-gameData') || {});
    
    if (gameData.achievements) {
        // Actualizar los logros locales con los del juego
        const updatedAchievements = {
            ...achievementsData,
            ...gameData.achievements
        };
        
        localStorage.setItem('fnc-achievements', JSON.stringify(updatedAchievements));
        sessionStorage.setItem('fnc-achievements', JSON.stringify(updatedAchievements));
        achievementsData = updatedAchievements;
        
        // Actualizar la UI
        for (const [id, unlocked] of Object.entries(gameData.achievements)) {
            if (unlocked) {
                const achievement = document.getElementById(`achievement-${id}`);
                if (achievement) {
                    achievement.classList.remove('achievement-locked');
                    const progressBar = achievement.querySelector('.achievement-progress-bar');
                    if (progressBar) {
                        progressBar.style.width = '100%';
                    }
                }
            }
        }
    }
    
    if (gameData.secrets) {
        localStorage.setItem('fnc-secrets', JSON.stringify(gameData.secrets));
    }

    if (gameData.dificultad) {
        localStorage.setItem('dificultad', gameData.dificultad);
    }

    if (gameData.controles) {
        localStorage.setItem('controles', gameData.controles);
    }
}

function configurarSecretos() {
    if(localStorage.getItem('secret_unlocked')) {
        elementos.btnSecretos.style.display = 'block';
    }

    if(elementos.btnSecretos) {
        elementos.btnSecretos.addEventListener('click', () => {
            mostrarPanel(elementos.panelSecretos);
        });
    }

    if(elementos.btnSubmitPassword) {
        elementos.btnSubmitPassword.addEventListener('click', () => {
            if(elementos.inputPassword.value.toLowerCase() === 'carne') {
                unlockSecret('secretPanel');
                elementos.btnSecretos.style.display = 'block';
                localStorage.setItem('secret_unlocked', 'true');
                playSecretSound();
                showAchievementNotification("Panel de Secretos", "¡Has desbloqueado el panel de secretos!");
                volverAlMenu();
            } else {
                alert('Contraseña incorrecta');
                elementos.inputPassword.value = '';
            }
        });
    }

    if(elementos.inputPassword) {
        elementos.inputPassword.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                elementos.btnSubmitPassword.click();
            }
        });
    }
}

function configurarEventos() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-cocina') ||
            e.target.classList.contains('music-btn') ||
            e.target.classList.contains('close-btn')) {
            clickCount++;
            localStorage.setItem('clickCount', clickCount.toString());
            updateClickMasterAchievement();
        }
    });

    elementos.btnJugar.addEventListener('click', () => {
        playSoundEffect();

        const now = new Date();
        if (now.getHours() === 3 && now.getMinutes() === 33) {
            unlockSecret('secret2');
        }

        updateTimeTravelerAchievement();

        let pressTimer = setTimeout(() => {
            unlockSecret('secret6');
        }, 10000);

        elementos.btnJugar.addEventListener('mouseup', () => clearTimeout(pressTimer));
        elementos.btnJugar.addEventListener('mouseleave', () => clearTimeout(pressTimer));

        redirigirAJuego();
    });

    elementos.btnActualizacion.addEventListener('click', () => {
        mostrarPanel(elementos.panelActualizacion);
        unlockAchievement('updateChecker');
    });

    elementos.btnLogros.addEventListener('click', () => {
        mostrarPanel(elementos.panelLogros);
    });

    elementos.btnOpciones.addEventListener('click', () => {
        mostrarPanel(elementos.panelOpciones);
        unlockAchievement('optionsExplorer');
    });

    elementos.btnCreditos.addEventListener('click', () => {
        mostrarPanel(elementos.panelCreditos);
    });

    elementos.btnSalir.addEventListener('click', () => {
        if (confirm('¿Estás seguro que quieres salir del juego?')) {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '0';
            setTimeout(() => {
                alert('Gracias por jugar Friday Night Cooking. ¡Hasta pronto!');
            }, 500);
        }
        playSoundEffect();
    });

    elementos.btnVolverMenuAct.addEventListener('click', volverAlMenu);
    elementos.btnVolverMenuLogros.addEventListener('click', volverAlMenu);
    elementos.btnVolverMenu.addEventListener('click', volverAlMenu);
    elementos.btnCerrarCreditos.addEventListener('click', volverAlMenu);
    elementos.btnCerrarSecretos?.addEventListener('click', volverAlMenu);
    elementos.fondoOscuro.addEventListener('click', volverAlMenu);

    elementos.colorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        document.documentElement.style.setProperty('--color-menu', color);
        document.documentElement.style.setProperty('--color-menu-hover', ajustarBrillo(color, 20));
        localStorage.setItem('colorMenu', color);
        unlockAchievement('colorChanger');

        let colorChanges = parseInt(localStorage.getItem('colorChanges') || 0);
        colorChanges++;
        localStorage.setItem('colorChanges', colorChanges.toString());

        if (colorChanges >= 5 && !localStorage.getItem('secret_secret3')) {
            unlockSecret('secret3');
        }
    });

    elementos.selectorTema.addEventListener('change', (e) => {
        aplicarTema(e.target.value);
    });

    elementos.volumenSonido.addEventListener('input', (e) => {
        elementos.valorVolumenSonido.textContent = e.target.value;
    });

    elementos.btnGuardarOpciones.addEventListener('click', () => {
        localStorage.setItem('temaPreferido', elementos.selectorTema.value);
        localStorage.setItem('volumenMusica', elementos.volumenMusica.value);
        localStorage.setItem('volumenSonido', elementos.volumenSonido.value);
        localStorage.setItem('dificultad', elementos.selectorDificultad.value);
        localStorage.setItem('controles', elementos.selectorControles.value);
        localStorage.setItem('autoPlayMusic', elementos.autoPlayMusic.checked);
        localStorage.setItem('animationSpeed', elementos.animationSpeed.value);
        localStorage.setItem('soundEffects', elementos.soundEffects.value);
        localStorage.setItem('enableShake', elementos.enableShake.checked);
        localStorage.setItem('showHints', elementos.showHints.checked);
        localStorage.setItem('resetConfirm', elementos.resetConfirm.checked);

        document.documentElement.style.setProperty('--transicion-rapida', `all ${elementos.animationSpeed.value}s ease`);

        const btn = elementos.btnGuardarOpciones;
        btn.textContent = '✓ Guardado';
        btn.style.backgroundColor = '#2ecc71';
        setTimeout(() => {
            btn.textContent = 'Guardar Configuración';
            btn.style.backgroundColor = '';
        }, 1500);
        playSoundEffect();
    });

    elementos.btnResetOpciones.addEventListener('click', () => {
        const shouldReset = localStorage.getItem('resetConfirm') === 'false' ||
            confirm('¿Estás seguro que quieres restablecer todas las configuraciones a los valores predeterminados?');

        if (shouldReset) {
            elementos.colorPicker.value = '#f39c12';
            elementos.selectorTema.value = 'automatico';
            elementos.selectorDificultad.value = 'normal';
            elementos.selectorControles.value = 'teclado';
            elementos.volumenMusica.value = '50';
            elementos.volumenSonido.value = '50';
            elementos.valorVolumenMusica.textContent = '50';
            elementos.valorVolumenSonido.textContent = '50';
            elementos.autoPlayMusic.checked = false;
            elementos.animationSpeed.value = '1';
            elementos.soundEffects.value = 'full';
            elementos.enableShake.checked = true;
            elementos.showHints.checked = true;
            elementos.resetConfirm.checked = true;

            document.documentElement.style.setProperty('--color-menu', '#f39c12');
            document.documentElement.style.setProperty('--color-menu-hover', '#e67e22');
            document.documentElement.style.setProperty('--transicion-rapida', 'all 1s ease');
            aplicarTema('automatico');

            musicTracks.forEach(track => {
                track.element.volume = 0.5;
            });

            playSoundEffect();
            alert('Configuración restablecida a los valores predeterminados.');
        }
    });

    elementos.updateBanner.addEventListener('click', () => {
        elementos.updateBanner.style.display = 'none';
        localStorage.setItem('bannerOculto', 'true');
        mostrarPanel(elementos.panelActualizacion);
    });

    setTimeout(() => {
        if (!localStorage.getItem('bannerOculto')) {
            elementos.updateBanner.style.opacity = '0';
            setTimeout(() => {
                elementos.updateBanner.style.display = 'none';
            }, 500);
        }
    }, 10000);

    setTimeout(() => {
        unlockSecret('secret1');
    }, 300000);

    const panelsVisited = {
        updates: false,
        achievements: false,
        options: false,
        credits: false
    };

    elementos.btnActualizacion.addEventListener('click', () => {
        panelsVisited.updates = true;
        checkAllPanelsVisited();
    });

    elementos.btnLogros.addEventListener('click', () => {
        panelsVisited.achievements = true;
        checkAllPanelsVisited();
    });

    elementos.btnOpciones.addEventListener('click', () => {
        panelsVisited.options = true;
        checkAllPanelsVisited();
    });

    elementos.btnCreditos.addEventListener('click', () => {
        panelsVisited.credits = true;
        checkAllPanelsVisited();
    });

    function checkAllPanelsVisited() {
        if (Object.values(panelsVisited).every(v => v) && !localStorage.getItem('secret_secret5')) {
            unlockSecret('secret5');
        }
    }
}

function loadAchievements() {
    // Cargar de localStorage (datos persistentes)
    const savedAchievements = JSON.parse(localStorage.getItem('fnc-achievements') || '{}');
    
    // Cargar de sessionStorage (datos recientes de game.html)
    const sessionAchievements = JSON.parse(sessionStorage.getItem('fnc-achievements') || '{}');
    
    // Combinar ambos conjuntos de datos
    achievementsData = {
        ...savedAchievements,
        ...sessionAchievements
    };

    // Actualizar la UI para cada logro
    for (const [id, unlocked] of Object.entries(achievementsData)) {
        if (unlocked) {
            const achievement = document.getElementById(`achievement-${id}`);
            if (achievement) {
                achievement.classList.remove('achievement-locked');
                const progressBar = achievement.querySelector('.achievement-progress-bar');
                if (progressBar) {
                    progressBar.style.width = '100%';
                }
            }
        }
    }
    
    // Guardar el estado combinado
    localStorage.setItem('fnc-achievements', JSON.stringify(achievementsData));
}

function loadSecrets() {
    const secrets = JSON.parse(localStorage.getItem('fnc-secrets') || []);

    secrets.forEach(secretId => {
        const secretElement = document.getElementById(`secret-${secretId}`);
        if (secretElement) {
            secretElement.classList.add('unlocked');
        }
    });
}

function saveAchievement(key) {
    achievementsData[key] = true;
    localStorage.setItem('fnc-achievements', JSON.stringify(achievementsData));
    sessionStorage.setItem('fnc-achievements', JSON.stringify(achievementsData));
}

function saveSecret(secretId) {
    const secrets = JSON.parse(localStorage.getItem('fnc-secrets') || []);
    if (!secrets.includes(parseInt(secretId))) {
        secrets.push(parseInt(secretId));
        localStorage.setItem('fnc-secrets', JSON.stringify(secrets));
    }
}

function inicializarJuego() {
    initMusicControls();
    configurarEventos();
    configurarSecretos();
    cargarPreferencias();
    setupKonamiCode();
    
    // Primero cargar los logros locales
    loadAchievements();
    
    // Luego sincronizar con los datos del juego
    cargarDatosDesdeJuego();

    const now = new Date();
    visitedHours.add(now.getHours());
    localStorage.setItem('visitedHours', JSON.stringify(Array.from(visitedHours)));
    updateTimeTravelerAchievement();

    if (!achievementsData.firstLaunch) {
        unlockAchievement('firstLaunch');
    }

    setTimeout(() => {
        if (!localStorage.getItem('bannerOculto')) {
            elementos.updateBanner.style.opacity = '0';
            setTimeout(() => {
                elementos.updateBanner.style.display = 'none';
            }, 500);
        }
    }, 10000);
}

document.addEventListener('DOMContentLoaded', inicializarJuego);