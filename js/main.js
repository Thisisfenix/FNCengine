// main.js - Contiene toda la lógica del menú principal y sincronización con el juego

// Elementos del DOM
const elementos = {
    menuPrincipal: document.getElementById('menu-principal'),
    panelActualizacion: document.getElementById('panel-actualizacion'),
    panelLogros: document.getElementById('panel-logros'),
    panelOpciones: document.getElementById('panel-opciones'),
    panelCreditos: document.getElementById('panel-creditos'),
    btnJugar: document.getElementById('btn-jugar'),
    btnActualizacion: document.getElementById('btn-actualizacion'),
    btnLogros: document.getElementById('btn-logros'),
    btnOpciones: document.getElementById('btn-opciones'),
    btnCreditos: document.getElementById('btn-creditos'),
    btnSalir: document.getElementById('btn-salir'),
    btnVolverMenuAct: document.getElementById('btn-volver-menu-act'),
    btnVolverMenuLogros: document.getElementById('btn-volver-menu-logros'),
    btnVolverMenu: document.getElementById('btn-volver-menu'),
    btnCerrarCreditos: document.getElementById('btn-cerrar-creditos'),
    btnGuardarOpciones: document.getElementById('btn-guardar-opciones'),
    btnResetOpciones: document.getElementById('btn-reset-opciones'),
    colorPicker: document.getElementById('color-picker'),
    selectorTema: document.getElementById('selector-tema'),
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
    achievements: {
        firstLaunch: document.getElementById('achievement-first_launch'),
        updateChecker: document.getElementById('achievement-update_checker'),
        optionsExplorer: document.getElementById('achievement-options_explorer'),
        musicLover: document.getElementById('achievement-music_lover'),
        colorChanger: document.getElementById('achievement-color_changer'),
        secretFinder: document.getElementById('achievement-secret_finder'),
        musicExplorer: document.getElementById('achievement-music_explorer'),
        clickMaster: document.getElementById('achievement-click_master'),
        firstRecipe: document.getElementById('achievement-first_recipe'),
        fiveRecipes: document.getElementById('achievement-five_recipes'),
        tenRecipes: document.getElementById('achievement-ten_recipes'),
        perfectRecipe: document.getElementById('achievement-perfect_recipe'),
        timeChallenge: document.getElementById('achievement-time_challenge'),
        timeTraveler: document.getElementById('achievement-time_traveler')
    },
    secretItems: {
        secret1: document.getElementById('secret-1'),
        secret2: document.getElementById('secret-2'),
        secret3: document.getElementById('secret-3'),
        secret4: document.getElementById('secret-4'),
        secret5: document.getElementById('secret-5'),
        secret6: document.getElementById('secret-6')
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

// Inicializar controles de música
function initMusicControls() {
    // Configurar eventos de los botones de música
    elementos.btnPlayMusic.addEventListener('click', () => {
        musicTracks[currentMusicIndex].element.play();
        elementos.nombreMusica.textContent = musicTracks[currentMusicIndex].name;
        playSoundEffect();
        unlockAchievement('music_lover');
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

    // Configuración avanzada de música
    elementos.toggleAdvancedSettings.addEventListener('click', () => {
        elementos.advancedSettingsContent.classList.toggle('collapsed');
        elementos.toggleAdvancedSettings.classList.toggle('collapsed');

        // Ajustar la altura máxima del contenido
        if (!elementos.advancedSettingsContent.classList.contains('collapsed')) {
            elementos.advancedSettingsContent.style.maxHeight = elementos.advancedSettingsContent.scrollHeight + 'px';
        }
    });

    // Reproducción automática si está habilitada
    if (localStorage.getItem('autoPlayMusic')) {
        elementos.autoPlayMusic.checked = true;
        document.addEventListener('click', function primeraInteraccion() {
            if (elementos.autoPlayMusic.checked) {
                musicTracks[currentMusicIndex].element.play().catch(e => console.log("Auto-play bloqueado:", e));
            }
            document.removeEventListener('click', primeraInteraccion);
        }, { once: true });
    }

    // Configurar el volumen inicial para todas las pistas
    const volMusica = localStorage.getItem('volumenMusica') || 50;
    musicTracks.forEach(track => {
        track.element.volume = volMusica / 100;
    });
}

// Cambiar música (siguiente/anterior)
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

// Verificar si el jugador ha escuchado todas las canciones
function checkMusicExplorerAchievement() {
    if (localStorage.getItem('achievement_music_explorer')) return;

    const allHeard = musicTracks.every((track, index) => {
        return localStorage.getItem(`music_heard_${index}`) ||
            (currentMusicIndex === index && !track.element.paused);
    });

    if (allHeard) {
        unlockAchievement('music_explorer');
    } else {
        localStorage.setItem(`music_heard_${currentMusicIndex}`, 'true');
    }
}

// Reproducir efecto de sonido
function playSoundEffect() {
    const soundSetting = localStorage.getItem('soundEffects') || 'full';
    if (soundSetting === 'none') return;

    elementos.soundEffect.currentTime = 0;
    elementos.soundEffect.volume = elementos.volumenSonido.value / 100;

    if (soundSetting === 'full' || (soundSetting === 'minimal' && Math.random() > 0.7)) {
        elementos.soundEffect.play().catch(e => console.log("Error al reproducir sonido:", e));
    }
}

// Reproducir efecto de secreto desbloqueado
function playSecretSound() {
    elementos.secretSound.currentTime = 0;
    elementos.secretSound.volume = elementos.volumenSonido.value / 100;
    elementos.secretSound.play().catch(e => console.log("Error al reproducir sonido de secreto:", e));
}

// Mostrar panel
function mostrarPanel(panel) {
    elementos.fondoOscuro.classList.add('active');
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';
    playSoundEffect();
}

// Ocultar paneles
function ocultarPaneles() {
    document.querySelectorAll('.popup-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    elementos.fondoOscuro.classList.remove('active');
    document.body.style.overflow = '';
    playSoundEffect();
}

// Volver al menú con efecto de sacudida
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

// Desbloquear logro
function unlockAchievement(achievementId) {
    const achievement = elementos.achievements[achievementId];
    if (!achievement || localStorage.getItem(`achievement_${achievementId}`)) return;

    localStorage.setItem(`achievement_${achievementId}`, 'true');
    achievement.classList.remove('achievement-locked');
    achievement.querySelector('.achievement-progress-bar').style.width = '100%';

    const title = achievement.querySelector('.achievement-title').textContent;
    const desc = achievement.querySelector('.achievement-desc').textContent;

    // Mostrar notificación solo si no son pistas
    if (localStorage.getItem('showHints') !== 'false') {
        alert(`¡Logro desbloqueado!\n${title}\n${desc}`);
    }

    // Guardar en el sistema de logros generales
    saveAchievement(achievementId);
}

// Desbloquear secreto
function unlockSecret(secretId) {
    const secret = elementos.secretItems[secretId];
    if (!secret || localStorage.getItem(`secret_${secretId}`)) return;

    localStorage.setItem(`secret_${secretId}`, 'true');
    secret.classList.add('unlocked');

    const title = secret.querySelector('h5').textContent;
    playSecretSound();
    unlockAchievement('secret_finder');

    // Mostrar notificación especial para el Konami Code
    if (secretId === 'secret4') {
        setTimeout(() => {
            alert(`¡SECRETO DESBLOQUEADO!\n\n${title}\n\nHas descubierto el código Konami en el juego. ¡Bien hecho!`);
        }, 500);
    }

    // Guardar en el sistema de secretos generales
    saveSecret(secretId);
}

// Cargar preferencias
function cargarPreferencias() {
    const colorGuardado = localStorage.getItem('colorMenu');
    if (colorGuardado) {
        elementos.colorPicker.value = colorGuardado;
        document.documentElement.style.setProperty('--color-menu', colorGuardado);
        document.documentElement.style.setProperty('--color-menu-hover',
            ajustarBrillo(colorGuardado, 20));
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

    // Cargar configuración avanzada
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

    // Cargar logros y secretos desde el sistema general
    loadAchievements();
    loadSecrets();

    // Cargar contador de clics
    clickCount = parseInt(localStorage.getItem('clickCount') || 0);
    updateClickMasterAchievement();

    // Cargar horas visitadas
    const savedHours = localStorage.getItem('visitedHours');
    if (savedHours) {
        visitedHours = new Set(JSON.parse(savedHours));
        updateTimeTravelerAchievement();
    }
}

// Ajustar brillo de color
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

// Aplicar tema
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

// Detectar código Konami
function setupKonamiCode() {
    document.addEventListener('keydown', (e) => {
        secretCodes.currentInput.push(e.key);

        // Mantener solo el número necesario de teclas
        if (secretCodes.currentInput.length > secretCodes.konami.length) {
            secretCodes.currentInput.shift();
        }

        // Verificar si coincide con el código Konami
        if (secretCodes.currentInput.length === secretCodes.konami.length) {
            const isKonami = secretCodes.currentInput.every((val, index) => val === secretCodes.konami[index]);

            if (isKonami) {
                unlockSecret('secret4');
            }
        }
    });
}

// Actualizar logro de clics
function updateClickMasterAchievement() {
    if (localStorage.getItem('achievement_click_master')) return;

    const achievement = elementos.achievements.clickMaster;
    const progress = Math.min(100, (clickCount / 100) * 100);

    achievement.querySelector('.achievement-progress-bar').style.width = `${progress}%`;

    if (clickCount >= 100) {
        unlockAchievement('click_master');
    }
}

// Actualizar logro de viajero del tiempo
function updateTimeTravelerAchievement() {
    if (localStorage.getItem('achievement_time_traveler')) return;

    const now = new Date();
    const currentHour = now.getHours();

    // Registrar la hora actual si no está registrada
    if (!visitedHours.has(currentHour)) {
        visitedHours.add(currentHour);
        localStorage.setItem('visitedHours', JSON.stringify(Array.from(visitedHours)));
    }

    const achievement = elementos.achievements.timeTraveler;
    const progress = Math.min(100, (visitedHours.size / 24) * 100);

    achievement.querySelector('.achievement-progress-bar').style.width = `${progress}%`;

    if (visitedHours.size >= 5) {
        unlockAchievement('time_traveler');
    }
}

// Configurar eventos
function configurarEventos() {
    // Contador de clics para logros
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

        // Verificar si es 3:33 AM para desbloquear secreto
        const now = new Date();
        if (now.getHours() === 3 && now.getMinutes() === 33) {
            unlockSecret('secret2');
        }

        // Registrar hora actual para logro de viajero del tiempo
        updateTimeTravelerAchievement();

        // Verificar si se mantiene presionado para secreto del menú oculto
        let pressTimer = setTimeout(() => {
            unlockSecret('secret6');
        }, 10000);

        elementos.btnJugar.addEventListener('mouseup', () => clearTimeout(pressTimer));
        elementos.btnJugar.addEventListener('mouseleave', () => clearTimeout(pressTimer));

        // Redirigir a game.html
        window.location.href = 'game.html';
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
    elementos.fondoOscuro.addEventListener('click', volverAlMenu);

    elementos.colorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        document.documentElement.style.setProperty('--color-menu', color);
        document.documentElement.style.setProperty('--color-menu-hover', ajustarBrillo(color, 20));
        localStorage.setItem('colorMenu', color);
        unlockAchievement('color_changer');

        // Contador de cambios de color para secreto
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
        localStorage.setItem('autoPlayMusic', elementos.autoPlayMusic.checked);
        localStorage.setItem('animationSpeed', elementos.animationSpeed.value);
        localStorage.setItem('soundEffects', elementos.soundEffects.value);
        localStorage.setItem('enableShake', elementos.enableShake.checked);
        localStorage.setItem('showHints', elementos.showHints.checked);
        localStorage.setItem('resetConfirm', elementos.resetConfirm.checked);

        // Aplicar cambios inmediatos
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
            // Restablecer valores predeterminados
            elementos.colorPicker.value = '#f39c12';
            elementos.selectorTema.value = 'automatico';
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

            // Aplicar cambios
            document.documentElement.style.setProperty('--color-menu', '#f39c12');
            document.documentElement.style.setProperty('--color-menu-hover', '#e67e22');
            document.documentElement.style.setProperty('--transicion-rapida', 'all 1s ease');
            aplicarTema('automatico');

            // Actualizar volumen de música
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

    // Desbloquear primer secreto después de 5 minutos de juego
    setTimeout(() => {
        unlockSecret('secret1');
    }, 300000);

    // Desbloquear quinto secreto al visitar todos los paneles
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

// Sistema de logros y secretos (sincronización con game.html)
function loadAchievements() {
    const achievements = JSON.parse(localStorage.getItem('fnc-achievements') || '{}');

    // Actualizar cada logro en la interfaz
    for (const [key, unlocked] of Object.entries(achievements)) {
        const achievementElement = document.getElementById(`achievement-${key}`);
        if (achievementElement) {
            if (unlocked) {
                achievementElement.classList.remove('achievement-locked');
                // Actualizar progreso si es necesario
                const progressBar = achievementElement.querySelector('.achievement-progress-bar');
                if (progressBar) {
                    progressBar.style.width = '100%';
                }
            }
        }
    }
}

function loadSecrets() {
    const secrets = JSON.parse(localStorage.getItem('fnc-secrets') || '[]');

    // Marcar secretos desbloqueados
    secrets.forEach(secretId => {
        const secretElement = document.getElementById(`secret-${secretId}`);
        if (secretElement) {
            secretElement.classList.add('unlocked');
        }
    });
}

function saveAchievement(key) {
    const achievements = JSON.parse(localStorage.getItem('fnc-achievements') || '{}');
    achievements[key] = true;
    localStorage.setItem('fnc-achievements', JSON.stringify(achievements));
}

function saveSecret(secretId) {
    const secrets = JSON.parse(localStorage.getItem('fnc-secrets') || '[]');
    if (!secrets.includes(parseInt(secretId))) {
        secrets.push(parseInt(secretId));
        localStorage.setItem('fnc-secrets', JSON.stringify(secrets));
    }
}

// Inicializar el juego
function inicializarJuego() {
    initMusicControls();
    configurarEventos();
    cargarPreferencias();
    setupKonamiCode();

    // Registrar hora actual para logro de viajero del tiempo
    const now = new Date();
    visitedHours.add(now.getHours());
    localStorage.setItem('visitedHours', JSON.stringify(Array.from(visitedHours)));
    updateTimeTravelerAchievement();

    // Desbloquear logro de primer lanzamiento si es necesario
    if (!localStorage.getItem('achievement_first_launch')) {
        localStorage.setItem('achievement_first_launch', 'true');
        unlockAchievement('first_launch');
    }

    // Ocultar banner de actualización después de 10 segundos
    setTimeout(() => {
        if (!localStorage.getItem('bannerOculto')) {
            elementos.updateBanner.style.opacity = '0';
            setTimeout(() => {
                elementos.updateBanner.style.display = 'none';
            }, 500);
        }
    }, 10000);
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarJuego);