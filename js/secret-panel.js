// secret-panel.js - Versión Mejorada con Verificación de Acceso
document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const secretPanel = document.getElementById('secret-panel');
    const secretOverlay = document.getElementById('secret-overlay');
    const secretInput = document.getElementById('secret-code');
    const submitBtn = document.getElementById('submit-secret');
    const secretPanelToggle = document.getElementById('secret-panel-toggle');
    const bgMusic = document.getElementById('bg-music');
    const dialogueBox = document.getElementById('dialogue-box');
    
    // Crear elementos de efectos
    const redirectEffect = document.createElement('div');
    redirectEffect.className = 'redirect-effect';
    document.body.appendChild(redirectEffect);
    
    const terminalEffect = document.createElement('div');
    terminalEffect.className = 'terminal-effect';
    document.body.appendChild(terminalEffect);
    
    const screenCrack = document.createElement('div');
    screenCrack.className = 'screen-crack';
    document.body.appendChild(screenCrack);
    
    const dataCorruption = document.createElement('div');
    dataCorruption.className = 'data-corruption';
    document.body.appendChild(dataCorruption);

    // Elementos para el gesto S
    const gestureIndicator = document.createElement('div');
    gestureIndicator.className = 'gesture-indicator';
    gestureIndicator.textContent = 'Draw "S" to open';
    document.body.appendChild(gestureIndicator);
    
    const gestureEffect = document.createElement('div');
    gestureEffect.className = 'gesture-effect';
    document.body.appendChild(gestureEffect);

    // Código secreto
    const SECRET_CODE = "ABELITOGAMER";
    
    // Configuración móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|iEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        secretPanelToggle.style.display = 'flex';
        gestureIndicator.style.display = 'block';
        
        // Eventos para el reconocimiento de gestos
        document.addEventListener('touchstart', handleTouchStart, {passive: true});
        document.addEventListener('touchmove', handleTouchMove, {passive: true});
        document.addEventListener('touchend', handleTouchEnd, {passive: true});
    }

    // Variables para el reconocimiento de gestos
    let touchPath = [];
    let isDrawingS = false;
    let gestureStartTime = 0;
    const gestureThreshold = 800; // ms máximo para dibujar la S

    // Manejo del gesto S
    function handleTouchStart(e) {
        touchPath = [];
        isDrawingS = false;
        gestureStartTime = Date.now();
        touchPath.push({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now()
        });
    }

    function handleTouchMove(e) {
        if (touchPath.length === 0) return;
        
        touchPath.push({
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            time: Date.now()
        });
        
        // Detectar si se está dibujando una S
        if (touchPath.length > 20 && !isDrawingS) {
            const dx = touchPath[touchPath.length-1].x - touchPath[0].x;
            const dy = touchPath[touchPath.length-1].y - touchPath[0].y;
            
            // Debe ser un movimiento principalmente vertical
            if (Math.abs(dy) > Math.abs(dx) * 2) {
                checkForSShape();
            }
        }
    }

    function handleTouchEnd() {
        if (isDrawingS) {
            // Mostrar efecto visual
            const lastPoint = touchPath[touchPath.length-1];
            gestureEffect.style.left = (lastPoint.x - 50) + 'px';
            gestureEffect.style.top = (lastPoint.y - 50) + 'px';
            gestureEffect.style.display = 'block';
            
            // Mostrar panel
            togglePanel(true);
            
            // Resetear después de la animación
            setTimeout(() => {
                gestureEffect.style.display = 'none';
            }, 1500);
        }
        touchPath = [];
        isDrawingS = false;
    }

    function checkForSShape() {
        // Tiempo máximo para dibujar la S
        if (Date.now() - gestureStartTime > gestureThreshold) return;
        
        // Dividir el trazo en 3 partes
        const third = Math.floor(touchPath.length / 3);
        const firstPart = touchPath.slice(0, third);
        const secondPart = touchPath.slice(third, third*2);
        const thirdPart = touchPath.slice(third*2);
        
        // Analizar dirección de cada parte
        const firstDir = getDirectionChange(firstPart);
        const secondDir = getDirectionChange(secondPart);
        const thirdDir = getDirectionChange(thirdPart);
        
        // Debe seguir un patrón de curva en S: derecha -> izquierda -> derecha
        if (firstDir.x > 0 && secondDir.x < 0 && thirdDir.x > 0 && 
            Math.abs(firstDir.y) > Math.abs(firstDir.x) && 
            Math.abs(thirdDir.y) > Math.abs(thirdDir.x)) {
            isDrawingS = true;
        }
    }

    function getDirectionChange(points) {
        if (points.length < 2) return {x: 0, y: 0};
        
        const start = points[0];
        const end = points[points.length-1];
        
        return {
            x: end.x - start.x,
            y: end.y - start.y
        };
    }

    // Función para mover elementos aleatoriamente
    function randomizeElements() {
        const elementsToMove = document.querySelectorAll('.action-button, .submenu-button, .status-container, .battle-character, img, h1, h2, p');
        
        elementsToMove.forEach(el => {
            const randomX = (Math.random() * 60 - 30) + 'px';
            const randomY = (Math.random() * 60 - 30) + 'px';
            el.style.transform = `translate(${randomX}, ${randomY})`;
            
            const rotation = Math.random() * 45 - 22.5;
            el.style.transform += ` rotate(${rotation}deg)`;
            
            const scale = 0.7 + Math.random() * 0.6;
            el.style.transform += ` scale(${scale})`;
            
            const hue = Math.floor(Math.random() * 360);
            const saturation = 70 + Math.floor(Math.random() * 60);
            const brightness = 0.8 + Math.random() * 0.7;
            el.style.filter = `hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${brightness})`;
            
            if (Math.random() > 0.7) {
                el.classList.add('glitched');
                setTimeout(() => el.classList.remove('glitched'), 500);
            }
        });
    }

    // Función para mostrar mensajes de terminal
    function showTerminalMessage(message, delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                const line = document.createElement('p');
                line.className = 'terminal-line';
                line.textContent = message;
                terminalEffect.appendChild(line);
                
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                    line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                }, 10);
                
                resolve();
            }, delay);
        });
    }

    // Función para activar efectos mejorados
    async function activateEffects() {
        // Mostrar corrupción de datos
        dataCorruption.style.display = 'block';
        
        // Oscurecer pantalla con efecto de fallo
        secretOverlay.style.display = 'block';
        secretOverlay.style.backgroundColor = 'rgba(80, 0, 0, 0.9)';
        
        // Distorsionar sonido
        if (bgMusic) {
            bgMusic.playbackRate = 0.2;
            bgMusic.detune = -3600;
            bgMusic.volume = 0.05;
            
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaElementSource(bgMusic);
            const distortion = audioContext.createWaveShaper();
            
            distortion.curve = makeDistortionCurve(400);
            distortion.oversample = '4x';
            
            source.connect(distortion);
            distortion.connect(audioContext.destination);
        }
        
        // Efecto glitch en todo el documento
        document.body.classList.add('glitched');
        
        // Mostrar pantalla rota
        screenCrack.style.display = 'block';
        
        // Mostrar mensajes de error en terminal
        terminalEffect.style.display = 'block';
        
        await showTerminalMessage('> Initializing security breach protocol...', 0);
        await showTerminalMessage('> WARNING: SYSTEM INTEGRITY COMPROMISED', 800);
        await showTerminalMessage('> CRITICAL ERROR: DATA CORRUPTION DETECTED', 1600);
        await showTerminalMessage('> Attempting to stabilize system... FAILED', 2400);
        await showTerminalMessage('> Engaging emergency protocols...', 3200);
        await showTerminalMessage('> Welcome to the hidden layer...', 4000);
        
        // Mover elementos aleatoriamente
        let randomizeInterval = setInterval(() => {
            randomizeElements();
            clearInterval(randomizeInterval);
            randomizeInterval = setInterval(randomizeElements, 200 + Math.random() * 400);
        }, 300);
        
        // Agitar toda la pantalla
        document.body.classList.add('shake');
        
        // Efecto de parpadeo
        let flickerInterval = setInterval(() => {
            document.body.style.opacity = Math.random() > 0.3 ? '1' : '0.7';
        }, 100);
        
        // Mostrar mensaje final antes de redirigir
        setTimeout(async () => {
            clearInterval(randomizeInterval);
            clearInterval(flickerInterval);
            document.body.style.opacity = '1';
            
            await showTerminalMessage('> Access granted. Redirecting...', 0);
            
            // Marcar acceso como concedido en localStorage
            localStorage.setItem('secretAccessGranted', 'true');
            
            // Efecto de explosión visual
            const explosion = document.createElement('div');
            explosion.style.position = 'fixed';
            explosion.style.top = '0';
            explosion.style.left = '0';
            explosion.style.width = '100%';
            explosion.style.height = '100%';
            explosion.style.background = 'radial-gradient(circle, white 0%, #9d8aff 30%, #5a4fcf 60%, black 90%)';
            explosion.style.zIndex = '10004';
            explosion.style.opacity = '0';
            explosion.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            document.body.appendChild(explosion);
            
            setTimeout(() => {
                explosion.style.opacity = '1';
                setTimeout(() => {
                    triggerRedirect();
                }, 800);
            }, 1000);
            
        }, 6000);
    }

    // Función para crear curva de distorsión de audio
    function makeDistortionCurve(amount) {
        const k = typeof amount === 'number' ? amount : 50;
        const n_samples = 44100;
        const curve = new Float32Array(n_samples);
        const deg = Math.PI / 180;
        
        for (let i = 0; i < n_samples; i++) {
            const x = i * 2 / n_samples - 1;
            curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
        }
        return curve;
    }

    // Función para redireccionar
    function triggerRedirect() {
        redirectEffect.style.display = 'block';
        
        let opacity = 0;
        const fadeInterval = setInterval(() => {
            opacity += 0.03;
            redirectEffect.style.opacity = opacity;
            
            redirectEffect.style.background = `linear-gradient(
                ${opacity * 360}deg,
                #0a0a1a 0%,
                #1a0a2a ${opacity * 50}%,
                #0a0a1a 100%
            )`;
            
            if (opacity >= 1) {
                clearInterval(fadeInterval);
                
                setTimeout(() => {
                    window.location.href = 'files.html';
                }, 500);
            }
        }, 30);
    }

    // Verificar código con mejores efectos
    function checkSecretCode() {
        if (secretInput.value.trim().toUpperCase() === SECRET_CODE) {
            // Efecto de aceptación
            secretPanel.classList.add('glitched');
            secretInput.style.borderColor = '#0f0';
            secretInput.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.7)';
            
            // Efecto de partículas
            for (let i = 0; i < 30; i++) {
                createParticle(
                    submitBtn.getBoundingClientRect().left + submitBtn.offsetWidth / 2,
                    submitBtn.getBoundingClientRect().top + submitBtn.offsetHeight / 2,
                    '#7b68ee'
                );
            }
            
            setTimeout(() => {
                secretPanel.classList.remove('glitched');
                togglePanel(false);
                activateEffects();
            }, 1200);
        } else {
            // Efecto de error
            secretPanel.classList.add('shake');
            secretInput.style.borderColor = '#f00';
            secretInput.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.7)';
            secretInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            
            // Efecto de partículas rojas
            for (let i = 0; i < 15; i++) {
                createParticle(
                    submitBtn.getBoundingClientRect().left + submitBtn.offsetWidth / 2,
                    submitBtn.getBoundingClientRect().top + submitBtn.offsetHeight / 2,
                    '#f00'
                );
            }
            
            setTimeout(() => {
                secretPanel.classList.remove('shake');
                secretInput.style.borderColor = '';
                secretInput.style.boxShadow = '';
                secretInput.style.backgroundColor = '';
            }, 1000);
            
            // Mostrar mensaje de error aleatorio
            const fakeErrors = [
                "ERROR 0x7B: ACCESS DENIED",
                "INTRUSION DETECTED",
                "SECURITY VIOLATION",
                "AUTHENTICATION FAILURE 0x1A3F",
                "INVALID CREDENTIALS",
                "SYSTEM LOCKOUT INITIATED",
                "UNAUTHORIZED ACCESS ATTEMPT",
                "SECURITY PROTOCOL ENGAGED",
                "BREACH ATTEMPT LOGGED",
                "CRYPTOGRAPHIC SEQUENCE INVALID"
            ];
            
            const randomError = fakeErrors[Math.floor(Math.random() * fakeErrors.length)];
            showDialogue(`> ${randomError}`);
        }
    }

    // Función para crear partículas de efecto
    function createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        particle.style.opacity = '0.8';
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 3;
        const life = 800 + Math.random() * 400;
        
        const animate = () => {
            const currentLeft = parseFloat(particle.style.left);
            const currentTop = parseFloat(particle.style.top);
            const currentOpacity = parseFloat(particle.style.opacity);
            
            particle.style.left = `${currentLeft + Math.cos(angle) * velocity}px`;
            particle.style.top = `${currentTop + Math.sin(angle) * velocity}px`;
            particle.style.opacity = `${currentOpacity - 0.01}`;
            
            if (currentOpacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        setTimeout(() => {
            animate();
        }, Math.random() * 100);
        
        setTimeout(() => {
            particle.remove();
        }, life);
    }

    // Mostrar/ocultar panel
    function togglePanel(show) {
        if (show) {
            secretOverlay.style.display = 'block';
            secretPanel.style.display = 'block';
            
            secretPanel.style.opacity = '0';
            secretPanel.style.transform = 'translate(-50%, -60%) scale(0.9)';
            setTimeout(() => {
                secretPanel.style.opacity = '1';
                secretPanel.style.transform = 'translate(-50%, -50%) scale(1)';
                secretPanel.style.transition = 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }, 10);
            
            secretInput.value = '';
            secretInput.focus();
        } else {
            secretPanel.style.opacity = '0';
            secretPanel.style.transform = 'translate(-50%, -40%) scale(0.9)';
            secretPanel.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            
            setTimeout(() => {
                secretOverlay.style.display = 'none';
                secretPanel.style.display = 'none';
                document.body.classList.remove('glitched');
                
                document.querySelectorAll('.action-button, .submenu-button, .status-container, .battle-character, img, h1, h2, p').forEach(el => {
                    el.style.transform = '';
                    el.style.filter = '';
                });
                
                if (bgMusic) {
                    bgMusic.playbackRate = 1;
                    bgMusic.detune = 0;
                    bgMusic.volume = 1;
                }
            }, 200);
        }
    }

    // Mostrar diálogo
    function showDialogue(message) {
        if (!dialogueBox) return;
        
        dialogueBox.textContent = message;
        dialogueBox.style.display = 'block';
        dialogueBox.style.opacity = '0';
        dialogueBox.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            dialogueBox.style.opacity = '1';
            dialogueBox.style.transform = 'translateY(0)';
            dialogueBox.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        }, 10);
        
        setTimeout(() => {
            dialogueBox.style.opacity = '0';
            dialogueBox.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                dialogueBox.style.display = 'none';
            }, 300);
        }, 3000);
    }

    // Event listeners
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        checkSecretCode();
    });
    
    secretInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkSecretCode();
        }
    });
    
    secretOverlay.addEventListener('click', (e) => {
        if (e.target === secretOverlay) {
            togglePanel(false);
        }
    });
    
    // Event listeners para móvil
    secretPanelToggle.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        secretPanelToggle.classList.add('active');
    });
    
    secretPanelToggle.addEventListener('touchend', (e) => {
        e.stopPropagation();
        secretPanelToggle.classList.remove('active');
        togglePanel(true);
    });

    // Activación por teclado (solo desktop)
    if (!isMobile) {
        let keySequence = [];
        const secretCombo = ['Control', 'Alt', 'c'];
        
        document.addEventListener('keydown', (e) => {
            keySequence.push(e.key);
            if (keySequence.length > secretCombo.length) {
                keySequence.shift();
            }
            
            if (keySequence.join(',') === secretCombo.join(',')) {
                togglePanel(true);
                keySequence = [];
            }
            
            if (e.key === 'Escape') {
                togglePanel(false);
                keySequence = [];
            }
        });
    }
});