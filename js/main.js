// CONSTANTES DEL JUEGO - ACTUALIZADAS
const ATTACK_TYPES = {
    ball: { min: 10, max: 20, tp: 0, icon: '⚽', name: "Pelota" },
    sword: { min: 15, max: 30, tp: 0, icon: '🗡️', name: "Espada" },
    gun: { min: 35, max: 55, tp: 20, icon: '🔫', name: "Pistola" },
    doubleSword: { min: 45, max: 70, tp: 30, icon: '⚔️', name: "Doble Espada" },
    doubleGun: { min: 40, max: 100, tp: 40, icon: '🔫🔫', name: "Doble Pistola" }
};

const SKILLS = {
    boring: { tp: 10, icon: '😴', name: "Nivel Bodrio" },
    heal: { tp: 15, icon: '❤️', name: "Curación Épica" },
    upgrade: { tp: 'MAX', icon: '🛠️', name: "Mejorar Arma" },
    coin: { tp: 15, icon: '🪙', name: "Moneda de Suerte" },
    summon: { tp: 30, icon: '👥', name: "Invocar Aliado" },
    fireboots: { tp: 25, icon: '🔥', name: "Botas de Fuego" },
    greenmode: { tp: 20, icon: '💚', name: "Modo Verde" },
    randomizer: { tp: 25, icon: '🎲', name: "Randomizador" },
    doubleGun: { tp: 40, icon: '🔫🔫', name: "Doble Pistola" }
};

const ITEMS = {
    dogResidue: { uses: 5, maxUses: 5, icon: '💩', name: "Residuo de Perro" },
    allyPotion: { uses: 5, maxUses: 5, icon: '👥', name: "Poción Aliado" },
    healthPotion: { uses: 3, maxUses: 3, icon: '❤️', name: "Poción de Salud" },
    tpPotion: { uses: 3, maxUses: 3, icon: '🔋', name: "Poción de TP" },
    shieldPotion: { uses: 2, maxUses: 2, icon: '🛡️', name: "Poción Escudo" },
    firePotion: { uses: 3, maxUses: 3, icon: '🔥', name: "Poción de Fuego" },
    icePotion: { uses: 2, maxUses: 2, icon: '❄️', name: "Poción de Hielo" },
    adrenalineShot: { uses: 2, maxUses: 2, icon: '💉', name: "Inyección de Adrenalina" }
};

const EFFECT_EMOJIS = {
    positive: ['✨', '🌟', '💪', '🚀', '🔝'],
    negative: ['💀', '☠️', '🤕', '👎', '💢'],
    fire: '🔥',
    ice: '❄️',
    poison: '☠️',
    stun: '💫',
    random: '🎲'
};

const POLLO_LINES = {
    taunts: [
        "¡Pío pío! ¡Vas a perder!",
        "¡Nadie puede vencer a Pollolito!",
        "¡Prepárate para mi ataque épico!",
        "¡Ja ja ja! ¡Eres muy débil!",
        "¡Mis habilidades de programación son superiores!"
    ],
    onAngry: [
        "¡GRRRRR! ¡AHORA ME ENOJÉ DE VERDAD!",
        "¡Nadie hace enojar a Pollolito y sale ileso!",
        "¡MODO FURIOSO ACTIVADO! ¡PÍO PÍO!",
        "¡Error 404: Tu victoria no existe!"
    ],
    onHeal: [
        "¡Curación épica! ¡Nunca me rendiré!",
        "¡Ja ja! ¿Pensaste que era fácil?",
        "¡Pollolito nunca cae!",
        "¡Mi código es imparable!"
    ],
    onHealBlock: [
        "¡Denegado! ¡No curarás hoy!",
        "¡HTTP 403: Curación prohibida!",
        "¡Ja ja! Bloqueé tu curación"
    ],
    onAlly: [
        "¡Un aliado? ¡Eso no es justo!",
        "¡Ja ja! ¡Tu aliado no es rival para mí!",
        "¡Invocar ayuda es de novatos!"
    ],
    onSummonMinions: [
        "¡Mis minions te destruirán!",
        "¡Ja ja! ¡Ahora somos más!",
        "¡Te abrumarán mis seguidores!"
    ],
    onInvincible: [
        "¡Ahora soy invencible! ¡Pío pío!",
        "¡Ja ja! ¡No puedes dañarme ahora!",
        "¡Error 418: Soy una tetera invencible!"
    ],
    onFinalAttack: [
        "¡PREPÁRATE PARA MI ATAQUE DEFINITIVO!",
        "¡JA JA JA! ¡ESTO ES EL FIN!",
        "¡CÓDIGO FINAL: SYSTEM_SHUTDOWN!"
    ],
    onGreenMode: [
        "¡Qué interfaz más fea!",
        "¡El verde es de novatos!",
        "¡Prefiero mi estilo original!"
    ]
};

// Añade esto al principio de main.js
const ASSETS_TO_LOAD = [
    'assets/images/244_sin_titulo_20250626104631.png',
    'assets/images/20250623_162257.jpg',
    'assets/images/image-233-1.png',
    'assets/images/20250703_202025.png',
    'assets/music/Feathers of Fury.mp3',
    'assets/music/Rooster Rampage.mp3',
    'assets/sounds/sound-effect-inflicting-damage.mp3',
    // Añade aquí todos los recursos que necesites cargar
];

function loadAssets() {
    return new Promise((resolve) => {
        let loaded = 0;
        const total = ASSETS_TO_LOAD.length;
        
        if (total === 0) {
            resolve();
            return;
        }

        ASSETS_TO_LOAD.forEach(asset => {
            const img = new Image();
            img.src = asset;
            img.onload = () => {
                loaded++;
                updateLoadingProgress(loaded, total);
                if (loaded === total) resolve();
            };
            img.onerror = () => {
                console.warn(`Error al cargar: ${asset}`);
                loaded++;
                updateLoadingProgress(loaded, total);
                if (loaded === total) resolve();
            };
        });
    });
}

function updateLoadingProgress(loaded, total) {
    const progress = Math.floor((loaded / total) * 100);
    if (elements.loadingProgress) {
        elements.loadingProgress.style.width = `${progress}%`;
    }
}

async function initGame() {
    try {
        await loadAssets();
        
        if (elements.loadingScreen) {
            elements.loadingScreen.style.display = 'none';
        }
        if (elements.gameContainer) {
            elements.gameContainer.style.display = 'block';
        }
        
        startGame();
    } catch (error) {
        console.error("Error en initGame:", error);
    }
}

// Sistema de seguridad para uiBlocked
const UI_BLOCKED_TIMEOUT = 10000; // 10 segundos máximo de bloqueo
let uiBlockedTimer = null;

function startUiBlockedTimer() {
    if (uiBlockedTimer) clearTimeout(uiBlockedTimer);
    uiBlockedTimer = setTimeout(() => {
        if (gameState.uiBlocked) {
            console.warn("UI bloqueada por demasiado tiempo. Reiniciando estado...");
            forceUnlockUI();
        }
    }, UI_BLOCKED_TIMEOUT);
}

function resetUiBlockedTimer() {
    if (uiBlockedTimer) clearTimeout(uiBlockedTimer);
}

function forceUnlockUI() {
    console.warn("Forzando desbloqueo de UI...");
    gameState.uiBlocked = false;
    gameState.precisionGameActive = false;
    resetUiBlockedTimer();

    try {
        if (elements.dialogueBox) elements.dialogueBox.style.display = 'none';
        if (gameState.currentTurn === 'player' && !gameState.player.skipTurn) {
            enableUI();
            showMainMenu();
        }
    } catch (e) {
        console.error("Error en forceUnlockUI:", e);
    }
}

// ESTADO DEL JUEGO - ACTUALIZADO
const gameState = {
    player: {
        hp: 400,
        maxHp: 400,
        tp: 0,
        maxTp: 100,
        attackBonus: 0,
        hasWeapon: true,
        defending: false,
        shield: 0,
        shieldTurns: 0,
        poisoned: 0,
        invincible: 0,
        skipTurn: false,
        damageBoost: 0,
        actionTaken: false,
        comboCount: 0,
        fatigue: 0,
        focused: false,
        randomizerActive: false,
        adrenalineUsed: false
    },
    ally: {
        active: false,
        hp: 100,
        maxHp: 100,
        turns: 0
    },
    enemyMinions: [
        { id: 1, active: false, hp: 8, maxHp: 8, turns: 0 },
        { id: 2, active: false, hp: 8, maxHp: 8, turns: 0 }
    ],
    enemy: {
        hp: 850,
        maxHp: 850,
        asleep: 0,
        defenseDown: false,
        angryMode: false,
        burning: 0,
        invincible: 0,
        healCooldown: 0,
        summonCooldown: 0,
        invincibleCooldown: 0,
        finalAttackUsed: false,
        frozen: 0
    },
    items: {
        dogResidue: { uses: 5, maxUses: 5 },
        allyPotion: { uses: 5, maxUses: 5 },
        healthPotion: { uses: 3, maxUses: 3 },
        tpPotion: { uses: 3, maxUses: 3 },
        shieldPotion: { uses: 2, maxUses: 2 },
        firePotion: { uses: 3, maxUses: 3 },
        icePotion: { uses: 2, maxUses: 2 },
        adrenalineShot: { uses: 2, maxUses: 2 }
    },
    currentTurn: 'player',
    battleLog: [],
    musicEnabled: true,
    uiBlocked: false,
    precisionGameActive: false,
    isMobile: false,
    greenMode: false,
    debug: {
        fps: 0,
        lastFrameTime: 0,
        frameCount: 0,
        lastFpsUpdate: 0
    },
    doubleGunCooldown: 0
};

// ELEMENTOS DEL DOM
const elements = {
    player: document.getElementById('player'),
    ally: document.getElementById('ally'),
    enemy: document.getElementById('enemy'),
    enemyMinion1: document.getElementById('enemy-minion1'),
    enemyMinion2: document.getElementById('enemy-minion2'),
    playerHealthFill: document.getElementById('player-health-fill'),
    playerHealthText: document.getElementById('player-health-text'),
    playerTpFill: document.getElementById('player-tp-fill'),
    playerTpText: document.getElementById('player-tp-text'),
    allyHealthFill: document.getElementById('ally-health-fill'),
    allyHealthText: document.getElementById('ally-health-text'),
    enemyHealthFill: document.getElementById('enemy-health-fill'),
    enemyHealthText: document.getElementById('enemy-health-text'),
    dialogueBox: document.getElementById('dialogue-box'),
    battleUI: document.getElementById('battle-ui'),
    actionBox: document.getElementById('action-box'),
    attackMenu: document.getElementById('attack-menu'),
    skillMenu: document.getElementById('skill-menu'),
    itemMenu: document.getElementById('item-menu'),
    precisionGame: document.getElementById('precision-game'),
    precisionBar: document.getElementById('precision-bar'),
    precisionTarget: document.getElementById('precision-target'),
    precisionIndicator: document.getElementById('precision-indicator'),
    precisionInstructions: document.getElementById('precision-instructions'),
    tpDisplay: document.getElementById('tp-value'),
    endScreen: document.getElementById('end-screen'),
    bgMusic: document.getElementById('bg-music'),
    angryMusic: document.getElementById('angry-music'),
    attackSound: document.getElementById('attack-sound'),
    defendSound: document.getElementById('defend-sound'),
    healSound: document.getElementById('heal-sound'),
    coinSound: document.getElementById('coin-sound'),
    summonSound: document.getElementById('summon-sound'),
    errorSound: document.getElementById('error-sound'),
    gunSound: document.getElementById('gun-sound'),
    fireSound: document.getElementById('fire-sound'),
    minionSound: document.getElementById('minion-sound'),
    itemSound: document.getElementById('item-sound'),
    poisonSound: document.getElementById('poison-sound'),
    invincibleSound: document.getElementById('invincible-sound'),
    finalSound: document.getElementById('final-sound'),
    iceSound: document.getElementById('ice-sound'),
    greenSound: document.getElementById('green-sound'),
    musicToggle: document.getElementById('music-toggle'),
    debugInfo: document.getElementById('debug-info')
};

// Verificar que todos los elementos necesarios existan
Object.keys(elements).forEach(key => {
    if (!elements[key]) {
        console.error(`Elemento no encontrado: ${key}`);
    }
});

// ================= FUNCIONES DEL JUEGO =================

function showEffectEmoji(emoji, target = 'player', duration = 1000) {
    try {
        const effect = document.createElement('div');
        effect.className = 'battle-effect emoji-effect';
        effect.textContent = emoji;
        effect.style.animationDuration = `${duration}ms`;

        if (target === 'player') {
            effect.style.right = '25%';
            effect.style.bottom = '40%';
        } else {
            effect.style.left = '25%';
            effect.style.bottom = '40%';
        }

        const container = document.getElementById('game-container');
        if (container) {
            container.appendChild(effect);
            setTimeout(() => {
                if (effect.parentNode) {
                    effect.remove();
                }
            }, duration);
        }
    } catch (error) {
        console.error("Error en showEffectEmoji:", error);
    }
}

// FUNCIONES DE INTERFAZ
function showDialogue(text, duration = 3000) {
    try {
        if (gameState.uiBlocked && !gameState.precisionGameActive) return;

        gameState.uiBlocked = true;
        startUiBlockedTimer();
        if (elements.dialogueBox) {
            elements.dialogueBox.textContent = text;
            elements.dialogueBox.style.display = 'block';
        }

        if (duration > 0) {
            setTimeout(() => {
                if (elements.dialogueBox && elements.dialogueBox.textContent === text) {
                    hideDialogue();
                }
            }, duration);
        }
    } catch (error) {
        console.error("Error en showDialogue:", error);
        forceUnlockUI();
    }
}

function hideDialogue() {
    try {
        if (elements.dialogueBox) {
            elements.dialogueBox.style.display = 'none';
        }
        gameState.uiBlocked = false;
        resetUiBlockedTimer();

        if (gameState.currentTurn === 'player' && !gameState.player.skipTurn && !gameState.precisionGameActive) {
            enableUI();
        }
    } catch (error) {
        console.error("Error en hideDialogue:", error);
        forceUnlockUI();
    }
}

function updateHealthBars() {
    try {
        if (elements.playerHealthFill) {
            elements.playerHealthFill.style.width = `${(gameState.player.hp / gameState.player.maxHp) * 100}%`;
        }
        if (elements.playerTpFill) {
            elements.playerTpFill.style.width = `${Math.floor(gameState.player.tp / gameState.player.maxTp * 100)}%`;
        }
        if (elements.enemyHealthFill) {
            elements.enemyHealthFill.style.width = `${(gameState.enemy.hp / gameState.enemy.maxHp) * 100}%`;
        }

        if (elements.playerHealthText) {
            elements.playerHealthText.textContent = `${gameState.player.hp}/${gameState.player.maxHp}`;
        }
        if (elements.playerTpText) {
            elements.playerTpText.textContent = `${Math.floor(gameState.player.tp)}/${gameState.player.maxTp}`;
        }
        if (elements.enemyHealthText) {
            elements.enemyHealthText.textContent = `${gameState.enemy.hp}/${gameState.enemy.maxHp}`;
        }
        if (elements.tpDisplay) {
            elements.tpDisplay.textContent = Math.floor(gameState.player.tp);
        }

        if (gameState.ally.active) {
            if (elements.allyHealthFill) {
                elements.allyHealthFill.style.width = `${(gameState.ally.hp / gameState.ally.maxHp) * 100}%`;
            }
            if (elements.allyHealthText) {
                elements.allyHealthText.textContent = `${gameState.ally.hp}/${gameState.ally.maxHp}`;
            }
        }

        gameState.enemyMinions.forEach(minion => {
            if (minion.active) {
                const healthFill = document.getElementById(`enemy-minion${minion.id}-health-fill`);
                if (healthFill) {
                    healthFill.style.width = `${(minion.hp / minion.maxHp) * 100}%`;
                }
            }
        });

        if (elements.playerHealthFill) {
            if (gameState.player.hp / gameState.player.maxHp < 0.3) {
                elements.playerHealthFill.style.background = gameState.greenMode ? '#4CAF50' : '#ff3864';
            } else {
                elements.playerHealthFill.style.background = gameState.greenMode ?
                    'linear-gradient(to right, #4CAF50, #8BC34A)' :
                    'linear-gradient(to right, #ff3864, #ff6b8b)';
            }
        }

        if (elements.enemyHealthFill) {
            if (gameState.enemy.hp / gameState.enemy.maxHp < 0.3) {
                elements.enemyHealthFill.style.background = '#ff3864';
            } else {
                elements.enemyHealthFill.style.background = 'linear-gradient(to right, #ff3864, #ff6b8b)';
            }
        }
    } catch (error) {
        console.error("Error en updateHealthBars:", error);
    }
}

function showAttackEffect(source, value, target = 'enemy') {
    try {
        const effect = document.createElement('div');
        effect.className = 'battle-effect';
        effect.textContent = `-${value}`;

        if (source === 'player') {
            effect.style.right = '25%';
            effect.style.bottom = '40%';
            effect.style.color = gameState.greenMode ? '#4CAF50' : '#7b68ee';
            if (elements.player) {
                elements.player.classList.add('shake');
                setTimeout(() => {
                    if (elements.player) {
                        elements.player.classList.remove('shake');
                    }
                }, 500);
            }
        } else if (target === 'ally') {
            effect.style.left = '35%';
            effect.style.bottom = '40%';
            effect.style.color = '#ff6b8b';
            if (elements.ally) {
                elements.ally.classList.add('shake');
                setTimeout(() => {
                    if (elements.ally) {
                        elements.ally.classList.remove('shake');
                    }
                }, 500);
            }
        } else if (target.startsWith('enemy-minion')) {
            effect.style.right = (target === 'enemy-minion1' ? '25%' : '35%');
            effect.style.bottom = '25%';
            effect.style.color = '#ff6b8b';
            const minionElement = document.getElementById(target);
            if (minionElement) {
                minionElement.classList.add('shake');
                setTimeout(() => {
                    minionElement.classList.remove('shake');
                }, 500);
            }
        } else {
            effect.style.left = '25%';
            effect.style.bottom = '40%';
            effect.style.color = '#ff6b8b';
            if (elements.enemy) {
                elements.enemy.classList.add('shake');
                setTimeout(() => {
                    if (elements.enemy) {
                        elements.enemy.classList.remove('shake');
                    }
                }, 500);
            }
        }

        const container = document.getElementById('game-container');
        if (container) {
            container.appendChild(effect);
            setTimeout(() => {
                if (effect.parentNode) {
                    effect.remove();
                }
            }, 1000);
        }
    } catch (error) {
        console.error("Error en showAttackEffect:", error);
    }
}

function showHealEffect() {
    try {
        const effect = document.createElement('div');
        effect.className = 'heal-effect';
        effect.textContent = '❤️';
        effect.style.right = '20%';
        effect.style.bottom = '30%';
        
        const container = document.getElementById('game-container');
        if (container) {
            container.appendChild(effect);
            setTimeout(() => {
                if (effect.parentNode) {
                    effect.remove();
                }
            }, 1000);
        }
    } catch (error) {
        console.error("Error en showHealEffect:", error);
    }
}

function getRandomLine(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// MANEJO DE TURNOS
function startPlayerTurn() {
    try {
        if (gameState.player.hp <= 0 || gameState.enemy.hp <= 0) return;

        gameState.player.actionTaken = false;
        gameState.player.defending = false;
        gameState.player.defenseBoost = 0;
        gameState.uiBlocked = false;
        gameState.precisionGameActive = false;
        resetUiBlockedTimer();

        if (gameState.player.skipTurn) {
            gameState.player.skipTurn = false;
            showDialogue("¡Estás aturdido! Pierdes este turno.");
            setTimeout(endPlayerTurn, 1500);
            return;
        }

        updateTemporaryEffects();
        updateHealthBars();

        if (!gameState.uiBlocked && !gameState.precisionGameActive) {
            enableUI();
        }

        showMainMenu();
    } catch (error) {
        console.error("Error en startPlayerTurn:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function updateTemporaryEffects() {
    try {
        if (gameState.player.shieldTurns > 0) {
            gameState.player.shieldTurns--;
            if (gameState.player.shieldTurns === 0) {
                gameState.player.shield = 0;
                showDialogue("¡Tu escudo desaparece!");
            }
        }

        if (gameState.player.invincible > 0) {
            gameState.player.invincible--;
            if (gameState.player.invincible === 0) {
                showDialogue("¡Tu invencibilidad ha terminado!");
            }
        }

        if (gameState.player.poisoned > 0) {
            gameState.player.poisoned--;
            const poisonDamage = 5;
            gameState.player.hp -= poisonDamage;
            if (gameState.player.hp < 0) gameState.player.hp = 0;

            showDialogue("¡Sufres daño por veneno! -" + poisonDamage + " HP");
            showAttackEffect('player', poisonDamage);
            updateHealthBars();

            if (gameState.player.hp <= 0) {
                setTimeout(() => showGameOver(false), 2000);
                return;
            }
        }

        if (gameState.player.damageBoost > 0) {
            gameState.player.damageBoost--;
            if (gameState.player.damageBoost === 0) {
                showDialogue("¡Tu aumento de daño ha terminado!");
            }
        }

        if (gameState.player.focused) {
            gameState.player.focused = false;
            showDialogue("¡Pierdes la concentración!");
        }

        if (gameState.player.randomizerActive) {
            gameState.player.randomizerActive = false;
            showDialogue("¡El efecto randomizador ha terminado!");
        }

        if (gameState.ally.active) {
            gameState.ally.turns--;
            if (gameState.ally.turns <= 0) {
                gameState.ally.active = false;
                if (elements.ally) elements.ally.style.display = 'none';
                const allyStatus = document.getElementById('ally-status');
                if (allyStatus) allyStatus.style.display = 'none';
                showDialogue("¡Tu aliado se ha ido!");
            }
        }

        gameState.enemyMinions.forEach(minion => {
            if (minion.active) {
                minion.turns--;
                if (minion.turns <= 0) {
                    minion.active = false;
                    const minionElement = document.getElementById(`enemy-minion${minion.id}`);
                    if (minionElement) minionElement.style.display = 'none';
                    const minionHealth = document.getElementById(`enemy-minion${minion.id}-health`);
                    if (minionHealth) minionHealth.style.display = 'none';
                }
            }
        });

        if (gameState.enemy.burning > 0) {
            gameState.enemy.burning--;
            const burnDamage = 5;
            gameState.enemy.hp -= burnDamage;
            if (gameState.enemy.hp < 0) gameState.enemy.hp = 0;

            showDialogue("¡Pollolito sufre quemaduras! -" + burnDamage + " HP");
            showAttackEffect('player', burnDamage);
            updateHealthBars();

            if (gameState.enemy.hp <= 0) {
                setTimeout(() => showGameOver(true), 2000);
                return;
            }
        }

        if (gameState.enemy.frozen > 0) {
            gameState.enemy.frozen--;
            if (gameState.enemy.frozen === 0) {
                showDialogue("¡Pollolito se descongela!");
            }
        }

        if (gameState.enemy.asleep > 0) {
            gameState.enemy.asleep--;
            if (gameState.enemy.asleep === 0) {
                showDialogue("¡Pollolito se despierta!");
            }
        }

        if (gameState.enemy.healCooldown > 0) gameState.enemy.healCooldown--;
        if (gameState.enemy.summonCooldown > 0) gameState.enemy.summonCooldown--;
        if (gameState.enemy.invincibleCooldown > 0) gameState.enemy.invincibleCooldown--;

        if (gameState.player.defenseBoost < 0) gameState.player.defenseBoost = 0;
        if (gameState.enemy.defenseDown) gameState.enemy.defenseDown = false;
    } catch (error) {
        console.error("Error en updateTemporaryEffects:", error);
    }
}

function endPlayerTurn() {
    try {
        gameState.currentTurn = 'enemy';
        gameState.uiBlocked = false;
        gameState.precisionGameActive = false;
        resetUiBlockedTimer();
        disableUI();
        hideDialogue();
        setTimeout(startEnemyTurn, 1000);
    } catch (error) {
        console.error("Error en endPlayerTurn:", error);
        forceUnlockUI();
        setTimeout(startEnemyTurn, 1000);
    }
}

// ACCIONES DEL JUGADOR
function playerAttack(type) {
    try {
        if (!ATTACK_TYPES[type]) {
            console.error("Tipo de ataque no válido:", type);
            return;
        }

        if (gameState.player.actionTaken) {
            if (elements.errorSound) {
                elements.errorSound.currentTime = 0;
                elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
            }
            showDialogue("¡Ya realizaste una acción este turno!");
            setTimeout(() => hideDialogue(), 2000);
            return;
        }

        const attack = ATTACK_TYPES[type];

        if (attack.tp > 0 && gameState.player.tp < attack.tp) {
            if (elements.errorSound) {
                elements.errorSound.currentTime = 0;
                elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
            }
            showDialogue(`No tienes suficiente TP para usar ${type === 'gun' ? 'la pistola' : 'la doble espada'}.`);
            setTimeout(() => {
                hideDialogue();
                startPlayerTurn();
            }, 2000);
            return;
        }

        if (!gameState.player.hasWeapon && (type === 'sword' || type === 'doubleSword')) {
            if (elements.errorSound) {
                elements.errorSound.currentTime = 0;
                elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
            }
            showDialogue("¡No tienes espada! Usa 'Mejorar Armas' primero.");
            setTimeout(() => {
                hideDialogue();
                startPlayerTurn();
            }, 2000);
            return;
        }

        gameState.player.actionTaken = true;
        disableUI();
        startPrecisionGame(type);
    } catch (error) {
        console.error("Error en playerAttack:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function startPrecisionGame(attackType) {
    try {
        gameState.precisionGameActive = true;
        showDialogue("¡Juego de precisión! Toca cuando el indicador esté en la zona verde.");

        setTimeout(() => {
            hideDialogue();
            if (elements.precisionGame) {
                elements.precisionGame.style.display = 'flex';
            }

            let position = 0;
            let direction = 1;
            let speed = 2 + Math.random() * 0.3;
            let lastTime = performance.now();
            let animationId;

            const animate = (currentTime) => {
                if (!gameState.precisionGameActive) {
                    cancelAnimationFrame(animationId);
                    return;
                }

                const deltaTime = currentTime - lastTime;
                lastTime = currentTime;

                position += direction * speed * (deltaTime / 16);

                if (position >= 100) {
                    position = 100;
                    direction = -1;
                    speed = 2 + Math.random() * 0.3;
                } else if (position <= 0) {
                    position = 0;
                    direction = 1;
                    speed = 2 + Math.random() * 0.3;
                }

                if (elements.precisionIndicator) {
                    elements.precisionIndicator.style.left = `${position}%`;
                }
                animationId = requestAnimationFrame(animate);
            };

            animationId = requestAnimationFrame(animate);

            const handlePrecisionClick = (e) => {
                try {
                    e.preventDefault();
                    if (!gameState.precisionGameActive) return;
                    
                    cancelAnimationFrame(animationId);

                    const indicatorPos = elements.precisionIndicator ? parseFloat(elements.precisionIndicator.style.left) : 0;
                    const targetStart = 35;
                    const targetEnd = 65;

                    let precisionLevel = 0;
                    if (indicatorPos >= targetStart && indicatorPos <= targetEnd) {
                        precisionLevel = 2;
                    } else if (indicatorPos >= targetStart - 15 && indicatorPos <= targetEnd + 15) {
                        precisionLevel = 1;
                    }

                    if (elements.precisionGame) {
                        elements.precisionGame.style.display = 'none';
                        elements.precisionGame.removeEventListener('click', handlePrecisionClick);
                        elements.precisionGame.removeEventListener('touchstart', handlePrecisionClick);
                    }
                    gameState.precisionGameActive = false;
                    executePlayerAttack(attackType, precisionLevel);
                } catch (error) {
                    console.error("Error en handlePrecisionClick:", error);
                    forceUnlockUI();
                }
            };

            if (elements.precisionGame) {
                elements.precisionGame.addEventListener('click', handlePrecisionClick);
                elements.precisionGame.addEventListener('touchstart', handlePrecisionClick);
            }

            setTimeout(() => {
                if (gameState.precisionGameActive) {
                    cancelAnimationFrame(animationId);
                    if (elements.precisionGame) {
                        elements.precisionGame.style.display = 'none';
                        elements.precisionGame.removeEventListener('click', handlePrecisionClick);
                        elements.precisionGame.removeEventListener('touchstart', handlePrecisionClick);
                    }
                    gameState.precisionGameActive = false;
                    showDialogue("¡Demasiado lento! Pierdes tu turno.");
                    setTimeout(endPlayerTurn, 2000);
                }
            }, 5000);
        }, 1000);
    } catch (error) {
        console.error("Error en startPrecisionGame:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function executePlayerAttack(type, precisionLevel) {
    try {
        const attack = ATTACK_TYPES[type];
        let damage = 0;
        let message = "";
        let tpCost = attack.tp;
        let specialEffect = null;

        const damageMultiplier = gameState.player.damageBoost > 0 ? 1.5 : 1;

        if (gameState.player.focused) {
            damage = attack.max * 1.2;
            message = `¡Ataque enfocado! ${Math.floor(damage)} de daño`;
        } else if (gameState.player.randomizerActive) {
            damage = Math.floor(Math.random() * (attack.max * 2 - attack.min + 1) + attack.min);
            message = `¡Ataque randomizado! ${damage} de daño`;
        } else if (type === 'ball' || type === 'sword') {
            damage = precisionLevel === 2 ? attack.max : (precisionLevel === 1 ? Math.floor((attack.min + attack.max) / 2) : attack.min);
            damage = Math.floor(damage * damageMultiplier);
            message = precisionLevel === 2 ? `¡${attack.name} precisa! +${damage} daño` :
                (precisionLevel === 1 ? `${attack.name} decente. +${damage} daño` : `${attack.name} débil. +${damage} daño`);
        } else if (type === 'gun') {
            damage = Math.floor((Math.random() * (attack.max - attack.min + 1) + attack.min) * damageMultiplier);
            message = precisionLevel === 2 ? `¡Disparo certero! ${damage} de daño` :
                (precisionLevel === 1 ? `Disparo decente. ${damage} de daño` : `Disparo fallido. ${damage} de daño`);
        } else if (type === 'doubleSword') {
            damage = Math.floor((Math.random() * (attack.max - attack.min + 1) + attack.min) * damageMultiplier);

            if (Math.random() < 0.5) {
                const effects = ['fire', 'poison', 'stun'];
                const chosenEffect = effects[Math.floor(Math.random() * effects.length)];

                switch (chosenEffect) {
                    case 'fire':
                        gameState.enemy.burning = 2;
                        specialEffect = 'fire';
                        message = `¡Doble espada de fuego! ${damage} de daño + quemaduras`;
                        break;
                    case 'poison':
                        gameState.enemy.defenseDown = true;
                        specialEffect = 'poison';
                        message = `¡Doble espada venenosa! ${damage} de daño + defensa reducida`;
                        break;
                    case 'stun':
                        gameState.enemy.asleep = 2;
                        specialEffect = 'stun';
                        message = `¡Doble espada aturdidora! ${damage} de daño + aturdimiento`;
                        break;
                }
            } else {
                message = precisionLevel === 2 ? `¡Doble espada épica! ${damage} de daño` :
                    (precisionLevel === 1 ? `Doble espada decente. ${damage} de daño` : `Doble espada débil. ${damage} de daño`);
            }
        }

        damage += gameState.player.attackBonus;

        if ((type === 'ball' || type === 'sword') && precisionLevel === 2) {
            gameState.player.comboCount++;
            if (gameState.player.comboCount >= 3) {
                damage = Math.floor(damage * 1.5);
                message = "¡COMBO ÉPICO! " + damage + " de daño!";
                showDialogue("¡Racha de 3 ataques precisos! +50% de daño");
                setTimeout(() => {
                    showDialogue(message);
                    applyDamage(damage, true, tpCost, specialEffect);
                }, 2000);
                return;
            }
        } else if (type === 'ball' || type === 'sword') {
            gameState.player.comboCount = 0;
        }

        applyDamage(damage, false, tpCost, message, specialEffect);
    } catch (error) {
        console.error("Error en executePlayerAttack:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function applyDamage(damage, isCombo, tpCost = 0, message = "", specialEffect = null) {
    try {
        if (gameState.enemy.invincible > 0) {
            showDialogue("¡Pollolito es invencible! El ataque no tiene efecto.");
            setTimeout(() => {
                forceUnlockUI();
                endPlayerTurn();
            }, 2000);
            return;
        }

        if (gameState.enemy.angryMode) {
            damage = Math.floor(damage * 0.9); // Reducción de daño en modo angry
        }

        if (gameState.enemy.defenseDown) {
            damage = Math.floor(damage * 1.2);
        }

        gameState.enemy.hp -= damage;
        if (gameState.enemy.hp < 0) gameState.enemy.hp = 0;

        if (tpCost > 0) {
            gameState.player.tp -= tpCost;
            if (gameState.player.tp < 0) gameState.player.tp = 0;
        }

        if (!isCombo) {
            gameState.player.tp += isCombo ? 25 : 15;
            if (gameState.player.tp > gameState.player.maxTp) {
                gameState.player.tp = gameState.player.maxTp;
            }
        }

        if (specialEffect === 'fire' && elements.fireSound) {
            elements.fireSound.currentTime = 0;
            elements.fireSound.play().catch(e => console.log("Error al reproducir sonido:", e));
        } else if (specialEffect === 'poison' && elements.poisonSound) {
            elements.poisonSound.currentTime = 0;
            elements.poisonSound.play().catch(e => console.log("Error al reproducir sonido:", e));
        }

        showAttackEffect('player', damage);
        if (message) showDialogue(message);
        updateHealthBars();

        if (!gameState.enemy.angryMode && gameState.enemy.hp / gameState.enemy.maxHp <= 0.3) {
            activateAngryMode();
            return;
        }

        if (gameState.enemy.hp <= 0) {
            setTimeout(() => {
                forceUnlockUI();
                showGameOver(true);
            }, 2000);
            return;
        }

        if (Math.random() < 0.4 && damage < 20) {
            setTimeout(() => {
                showDialogue("Pollolito: " + getRandomLine(POLLO_LINES.taunts));
                setTimeout(() => {
                    forceUnlockUI();
                    endPlayerTurn();
                }, 3000);
            }, 2000);
        } else {
            setTimeout(() => {
                forceUnlockUI();
                endPlayerTurn();
            }, 2000);
        }
    } catch (error) {
        console.error("Error en applyDamage:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function activateAngryMode() {
    try {
        gameState.enemy.angryMode = true;
        if (elements.enemy) {
            elements.enemy.classList.add('angry-mode');
        }

        if (gameState.musicEnabled) {
            if (elements.bgMusic) elements.bgMusic.pause();
            if (elements.angryMusic) {
                elements.angryMusic.currentTime = 0;
                elements.angryMusic.play().catch(e => console.log("Auto-play prevented:", e));
            }
        }

        const angryLine = getRandomLine(POLLO_LINES.onAngry);
        setTimeout(() => {
            showDialogue("Pollolito: " + angryLine);
            setTimeout(() => {
                showDialogue("¡Pollolito entra en MODO FURIOSO! Sus ataques son más fuertes.");
                forceUnlockUI();
                endPlayerTurn();
            }, 3000);
        }, 2000);
    } catch (error) {
        console.error("Error en activateAngryMode:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function playerDefend() {
    try {
        if (gameState.player.actionTaken) {
            if (elements.errorSound) {
                elements.errorSound.currentTime = 0;
                elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
            }
            showDialogue("¡Ya realizaste una acción este turno!");
            setTimeout(() => hideDialogue(), 2000);
            return;
        }

        gameState.player.actionTaken = true;
        disableUI();
        if (elements.defendSound) {
            elements.defendSound.currentTime = 0;
            elements.defendSound.play().catch(e => console.log("Error al reproducir sonido:", e));
        }

        gameState.player.defending = true;
        gameState.player.defenseBoost = 0.7;

        gameState.player.tp += 15;
        if (gameState.player.tp > gameState.player.maxTp) {
            gameState.player.tp = gameState.player.maxTp;
        }

        showDialogue("¡Te preparas para defender! (+15 TP, -70% daño)");
        updateHealthBars();

        setTimeout(() => {
            forceUnlockUI();
            endPlayerTurn();
        }, 1500);
    } catch (error) {
        console.error("Error en playerDefend:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

// HABILIDADES
function useSkill(skill) {
    try {
        if (!SKILLS[skill]) {
            console.error("Habilidad no válida:", skill);
            return;
        }

        if (gameState.player.actionTaken) {
            if (elements.errorSound) {
                elements.errorSound.currentTime = 0;
                elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
            }
            showDialogue("¡Ya realizaste una acción este turno!");
            setTimeout(() => hideDialogue(), 2000);
            return;
        }

        const skillInfo = SKILLS[skill];

        if (skillInfo.tp !== 'MAX' && gameState.player.tp < skillInfo.tp) {
            if (elements.errorSound) {
                elements.errorSound.currentTime = 0;
                elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
            }
            showDialogue(`No tienes suficiente TP para usar ${skillInfo.name}. Necesitas ${skillInfo.tp} TP.`);
            setTimeout(() => {
                hideDialogue();
                startPlayerTurn();
            }, 2000);
            return;
        }

        if (skillInfo.tp === 'MAX' && gameState.player.tp < gameState.player.maxTp) {
            if (elements.errorSound) {
                elements.errorSound.currentTime = 0;
                elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
            }
            showDialogue("No tienes el TP al máximo.");
            setTimeout(() => {
                hideDialogue();
                startPlayerTurn();
            }, 2000);
            return;
        }

        gameState.player.actionTaken = true;
        disableUI();

        switch (skill) {
            case 'boring':
                gameState.player.tp -= skillInfo.tp;
                gameState.enemy.asleep = 2;

                showDialogue("¡Nivel bodrio! Pollolito se duerme por 2 turnos.");
                updateHealthBars();

                setTimeout(() => {
                    forceUnlockUI();
                    endPlayerTurn();
                }, 2000);
                break;

            case 'heal':
                if (Math.random() < 0.2) {
                    if (elements.errorSound) {
                        elements.errorSound.currentTime = 0;
                        elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                    }
                    showDialogue("Pollolito: " + getRandomLine(POLLO_LINES.onHealBlock));
                    showDialogue("¡Pollolito niega tu curación!");
                } else {
                    if (elements.healSound) {
                        elements.healSound.currentTime = 0;
                        elements.healSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                    }
                    gameState.player.tp -= skillInfo.tp;
                    const healAmount = 50 - Math.floor(50 * (gameState.player.fatigue * 0.03));
                    gameState.player.hp += healAmount;
                    if (gameState.player.hp > gameState.player.maxHp) {
                        gameState.player.hp = gameState.player.maxHp;
                    }
                    showDialogue("¡Curación épica! +" + healAmount + " HP.");

                    showHealEffect();
                    updateHealthBars();
                }
                setTimeout(() => {
                    forceUnlockUI();
                    endPlayerTurn();
                }, 2000);
                break;

            case 'upgrade':
                gameState.player.tp = 0;
                const roll = Math.random();

                if (roll < 0.4) {
                    if (elements.healSound) {
                        elements.healSound.currentTime = 0;
                        elements.healSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                    }
                    gameState.player.attackBonus += 5;
                    showDialogue("¡Mejora épica! +5 de daño permanente.");
                } else if (roll < 0.7) {
                    if (elements.errorSound) {
                        elements.errorSound.currentTime = 0;
                        elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                    }
                    gameState.player.hasWeapon = false;
                    gameState.player.attackBonus = Math.max(-5, gameState.player.attackBonus - 5);
                    showDialogue("¡Oh no! Pierdes tu arma. -5 de daño.");
                } else {
                    if (elements.errorSound) {
                        elements.errorSound.currentTime = 0;
                        elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                    }
                    showDialogue("Nada ocurre... qué bodrio.");
                }
                setTimeout(() => {
                    forceUnlockUI();
                    endPlayerTurn();
                }, 2000);
                break;

            case 'coin':
                gameState.player.tp -= skillInfo.tp;
                updateHealthBars();

                if (elements.coinSound) {
                    elements.coinSound.currentTime = 0;
                    elements.coinSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                }

                const result = Math.random();

                if (result < 0.5) {
                    gameState.player.damageBoost = 2;
                    showDialogue("¡Moneda de la suerte! +50% de daño por 2 turnos.");
                } else {
                    const damage = 5;
                    gameState.player.hp -= damage;
                    if (gameState.player.hp < 0) gameState.player.hp = 0;
                    showDialogue("¡Mala suerte! La moneda te quita 5 HP.");
                    showAttackEffect('player', damage);
                }

                updateHealthBars();

                if (gameState.player.hp <= 0) {
                    setTimeout(() => {
                        forceUnlockUI();
                        showGameOver(false);
                    }, 2000);
                    return;
                }

                setTimeout(() => {
                    forceUnlockUI();
                    endPlayerTurn();
                }, 2000);
                break;

            case 'summon':
                if (gameState.ally.active) {
                    if (elements.errorSound) {
                        elements.errorSound.currentTime = 0;
                        elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                    }
                    showDialogue("¡Ya tienes un aliado en batalla!");
                    setTimeout(() => {
                        hideDialogue();
                        startPlayerTurn();
                    }, 2000);
                    return;
                }

                if (elements.summonSound) {
                    elements.summonSound.currentTime = 0;
                    elements.summonSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                }
                gameState.player.tp -= skillInfo.tp;
                gameState.ally.active = true;
                gameState.ally.hp = 100;
                gameState.ally.turns = 6;

                if (elements.ally) elements.ally.style.display = 'block';
                const allyStatus = document.getElementById('ally-status');
                if (allyStatus) allyStatus.style.display = 'block';
                if (elements.allyHealthText) elements.allyHealthText.textContent = "100/100";
                updateHealthBars();

                showDialogue("¡Invocas un aliado épico! Te ayudará por 6 turnos.");
                setTimeout(() => {
                    showDialogue("Pollolito: " + getRandomLine(POLLO_LINES.onAlly));
                    setTimeout(() => {
                        forceUnlockUI();
                        endPlayerTurn();
                    }, 2000);
                }, 2000);
                break;

            case 'fireboots':
                if (elements.fireSound) {
                    elements.fireSound.currentTime = 0;
                    elements.fireSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                }
                gameState.player.tp -= skillInfo.tp;
                gameState.enemy.burning = 2;

                showDialogue("¡Botas de fuego! Pollolito arderá por 2 turnos.");
                updateHealthBars();
                setTimeout(() => {
                    forceUnlockUI();
                    endPlayerTurn();
                }, 2000);
                break;

            case 'greenmode':
                if (elements.greenSound) {
                    elements.greenSound.currentTime = 0;
                    elements.greenSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                }
                gameState.player.tp -= skillInfo.tp;
                gameState.greenMode = !gameState.greenMode;

                if (gameState.greenMode) {
                    if (elements.battleUI) elements.battleUI.classList.add('green-mode');
                    if (elements.attackMenu) elements.attackMenu.classList.add('green-mode');
                    if (elements.skillMenu) elements.skillMenu.classList.add('green-mode');
                    if (elements.itemMenu) elements.itemMenu.classList.add('green-mode');
                    document.querySelectorAll('.status-container').forEach(el => el.classList.add('green-mode'));
                    showDialogue("¡Modo Verde activado! Interfaz mejorada.");
                } else {
                    if (elements.battleUI) elements.battleUI.classList.remove('green-mode');
                    if (elements.attackMenu) elements.attackMenu.classList.remove('green-mode');
                    if (elements.skillMenu) elements.skillMenu.classList.remove('green-mode');
                    if (elements.itemMenu) elements.itemMenu.classList.remove('green-mode');
                    document.querySelectorAll('.status-container').forEach(el => el.classList.remove('green-mode'));
                    showDialogue("¡Modo Verde desactivado!");
                }
                setTimeout(() => {
                    forceUnlockUI();
                    endPlayerTurn();
                }, 2000);
                break;

            case 'randomizer':
                gameState.player.tp -= skillInfo.tp;
                const randomEffect = Math.floor(Math.random() * 5);

                switch (randomEffect) {
                    case 0:
                        gameState.player.damageBoost = 3;
                        showEffectEmoji(EFFECT_EMOJIS.positive[0], 'player');
                        showDialogue("¡Randomizador: +50% daño por 3 turnos!");
                        break;
                    case 1:
                        const healAmount = Math.floor(gameState.player.maxHp * 0.5);
                        gameState.player.hp += healAmount;
                        if (gameState.player.hp > gameState.player.maxHp) gameState.player.hp = gameState.player.maxHp;
                        showEffectEmoji(EFFECT_EMOJIS.positive[1], 'player');
                        showDialogue(`¡Randomizador: +${healAmount} HP!`);
                        break;
                    case 2:
                        gameState.player.poisoned = 3;
                        showEffectEmoji(EFFECT_EMOJIS.negative[0], 'player');
                        showDialogue("¡Randomizador: ¡Envenenado por 3 turnos!");
                        break;
                    case 3:
                        gameState.player.fatigue += 20;
                        showEffectEmoji(EFFECT_EMOJIS.negative[1], 'player');
                        showDialogue("¡Randomizador: +20% de fatiga!");
                        break;
                    case 4:
                        gameState.player.damageBoost = 2;
                        gameState.player.skipTurn = true;
                        showEffectEmoji(EFFECT_EMOJIS.random, 'player');
                        showDialogue("¡Randomizador: +30% daño pero pierdes el próximo turno!");
                        break;
                }

                gameState.player.randomizerActive = true;
                updateHealthBars();
                setTimeout(() => endPlayerTurn(), 2000);
                break;

            case 'doubleGun':
                if (gameState.player.tp < skillInfo.tp) {
                    if (elements.errorSound) {
                        elements.errorSound.currentTime = 0;
                        elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                    }
                    showDialogue("No tienes suficiente TP para Doble Pistola (40 TP)");
                    setTimeout(() => { hideDialogue(); startPlayerTurn(); }, 2000);
                    return;
                }

                gameState.player.tp -= skillInfo.tp;
                const gunRoll = Math.random();

                if (gunRoll < 0.5) {
                    const damage = Math.floor(Math.random() * 61) + 40;
                    gameState.enemy.hp -= damage;
                    if (gameState.enemy.hp < 0) gameState.enemy.hp = 0;

                    showEffectEmoji('🔫💥', 'enemy');
                    showAttackEffect('player', damage);
                    showDialogue(`¡Doble Pistola exitosa! ${damage} de daño.`);
                }
                else if (gunRoll < 0.7) {
                    showEffectEmoji('🔫❌', 'player');
                    showDialogue("¡Las pistolas se traban! Pierdes tu turno.");
                    gameState.player.skipTurn = true;
                }
                else {
                    const selfDamage = Math.floor(Math.random() * 31) + 20;
                    gameState.player.hp -= selfDamage;
                    if (gameState.player.hp < 0) gameState.player.hp = 0;

                    showEffectEmoji('💥🔥', 'player');
                    showAttackEffect('player', selfDamage);
                    showDialogue("¡CATÁSTROFE! Una pistola explota y te dañas.");
                }

                updateHealthBars();
                setTimeout(() => {
                    showDialogue("Pollolito: " + getRandomLine(POLLO_LINES.onGreenMode));
                    setTimeout(() => {
                        forceUnlockUI();
                        endPlayerTurn();
                    }, 2000);
                }, 2000);
                break;
        }
    } catch (error) {
        console.error("Error en useSkill:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

// OBJETOS
function useItem(item) {
    try {
        if (!ITEMS[item]) {
            console.error("Objeto no válido:", item);
            return;
        }

        if (gameState.player.actionTaken) {
            if (elements.errorSound) {
                elements.errorSound.currentTime = 0;
                elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
            }
            showDialogue("¡Ya realizaste una acción este turno!");
            setTimeout(() => hideDialogue(), 2000);
            return;
        }

        if (gameState.items[item].uses <= 0) {
            if (elements.errorSound) {
                elements.errorSound.currentTime = 0;
                elements.errorSound.play().catch(e => console.log("Error al reproducir sonido:", e));
            }
            showDialogue("¡No te quedan usos de este objeto!");
            setTimeout(() => {
                hideDialogue();
                startPlayerTurn();
            }, 2000);
            return;
        }

        gameState.player.actionTaken = true;
        disableUI();
        if (elements.itemSound) {
            elements.itemSound.currentTime = 0;
            elements.itemSound.play().catch(e => console.log("Error al reproducir sonido:", e));
        }

        switch (item) {
            case 'dogResidue':
                const results = [
                    { text: "¡Residuo mágico! Curación completa.", heal: gameState.player.maxHp },
                    { text: "¡Buena suerte! Curación del 50%.", heal: Math.floor(gameState.player.maxHp * 0.5) },
                    { text: "Curación decente. 2/4 de vida.", heal: Math.floor(gameState.player.maxHp * 0.5) },
                    { text: "Solo un poco... +1 HP.", heal: 1 }
                ];

                const result = results[Math.floor(Math.random() * results.length)];
                gameState.player.hp += result.heal;
                if (gameState.player.hp > gameState.player.maxHp) gameState.player.hp = gameState.player.maxHp;

                showDialogue(result.text);
                showHealEffect();
                break;

            case 'allyPotion':
                if (!gameState.ally.active) {
                    showDialogue("No tienes aliado para curar.");
                    setTimeout(() => {
                        hideDialogue();
                        startPlayerTurn();
                    }, 2000);
                    return;
                }

                const healAmount = 30;
                gameState.ally.hp += healAmount;
                if (gameState.ally.hp > gameState.ally.maxHp) gameState.ally.hp = gameState.ally.maxHp;

                showDialogue(`¡Poción aliada! +${healAmount} HP a tu aliado.`);
                break;

            case 'healthPotion':
                const healthAmount = 50;
                gameState.player.hp += healthAmount;
                if (gameState.player.hp > gameState.player.maxHp) gameState.player.hp = gameState.player.maxHp;

                showDialogue(`¡Poción de salud! +${healthAmount} HP.`);
                showHealEffect();
                break;

            case 'tpPotion':
                const tpAmount = 30;
                gameState.player.tp += tpAmount;
                if (gameState.player.tp > gameState.player.maxTp) gameState.player.tp = gameState.player.maxTp;

                showDialogue(`¡Poción de TP! +${tpAmount} TP.`);
                break;

            case 'shieldPotion':
                gameState.player.shield = 50;
                gameState.player.shieldTurns = 3;

                showDialogue(`¡Poción de escudo! 50% de reducción por 3 turnos.`);
                if (elements.defendSound) {
                    elements.defendSound.currentTime = 0;
                    elements.defendSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                }
                break;

            case 'firePotion':
                gameState.enemy.burning = 3;

                showDialogue("¡Poción de fuego! Pollolito arderá por 3 turnos.");
                if (elements.fireSound) {
                    elements.fireSound.currentTime = 0;
                    elements.fireSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                }
                break;

            case 'icePotion':
                gameState.enemy.frozen = 1;

                showDialogue("¡Poción de hielo! Pollolito se congela por 1 turno.");
                if (elements.iceSound) {
                    elements.iceSound.currentTime = 0;
                    elements.iceSound.play().catch(e => console.log("Error al reproducir sonido:", e));
                }
                break;

            case 'adrenalineShot':
                gameState.items.adrenalineShot.uses--;
                const adrenalineEffect = Math.floor(Math.random() * 3);

                switch (adrenalineEffect) {
                    case 0:
                        gameState.player.damageBoost = 2;
                        showEffectEmoji('💪', 'player');
                        showDialogue("¡Adrenalina: +30% daño por 2 turnos!");
                        break;
                    case 1:
                        gameState.player.tp = Math.min(gameState.player.tp + 50, gameState.player.maxTp);
                        showEffectEmoji('⚡', 'player');
                        showDialogue("¡Adrenalina: +50 TP instantáneo!");
                        break;
                    case 2:
                        gameState.player.invincible = 1;
                        showEffectEmoji('🛡️', 'player');
                        showDialogue("¡Adrenalina: Invencibilidad por 1 turno!");
                        break;
                }
        }

        gameState.items[item].uses--;
        updateHealthBars();

        setTimeout(() => {
            updateHealthBars();
            setTimeout(() => {
                forceUnlockUI();
                endPlayerTurn();
            }, 1500);
        }, 1000);
    } catch (error) {
        console.error("Error en useItem:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

// ATAQUES DEL ENEMIGO
function startEnemyTurn() {
    try {
        if (gameState.player.hp <= 0 || gameState.enemy.hp <= 0) return;

        // Verificar si Pollolito está dormido
        if (gameState.enemy.asleep > 0) {
            gameState.enemy.asleep--;
            showDialogue(`Pollolito está dormido. Turnos restantes: ${gameState.enemy.asleep + 1}`);

            setTimeout(() => {
                if (gameState.enemy.asleep > 0) {
                    startPlayerTurn();
                } else {
                    showDialogue("¡Pollolito se despierta!");
                    setTimeout(() => {
                        selectEnemyAction();
                    }, 1500);
                }
            }, 2000);
            return;
        }

        if (gameState.enemy.invincible > 0) {
            gameState.enemy.invincible--;
            if (gameState.enemy.invincible === 0) {
                showDialogue("¡La invencibilidad de Pollolito ha terminado!");
            }
        }

        selectEnemyAction();
    } catch (error) {
        console.error("Error en startEnemyTurn:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function selectEnemyAction() {
    try {
        let actions = ['basic', 'allstar', 'kick', 'deny', 'powerAttack'];
        let weights = [0.3, 0.15, 0.15, 0.1, 0.15];

        if (gameState.enemy.healCooldown === 0) {
            actions.push('heal');
            weights.push(0.05);
        }

        if (gameState.enemy.summonCooldown === 0) {
            actions.push('summonMinions');
            weights.push(0.05);
        }

        if (gameState.enemy.invincibleCooldown === 0) {
            actions.push('invincible');
            weights.push(0.05);
        }

        if (!gameState.enemy.finalAttackUsed && gameState.enemy.hp / gameState.enemy.maxHp <= 0.15) {
            actions.push('finalAttack');
            weights.push(0.1);
        }

        if (gameState.enemy.defenseDown) weights[0] += 0.2;
        if (gameState.player.tp > 50) weights[3] += 0.1;
        if (gameState.enemy.angryMode) weights[0] += 0.1;
        if (gameState.ally.active) weights[0] += 0.2;

        if (gameState.enemy.hp / gameState.enemy.maxHp < 0.3 && actions.includes('heal')) {
            const healIndex = actions.indexOf('heal');
            weights[healIndex] += 0.15;
        }

        const roll = Math.random();
        let action;
        let cumulativeWeight = 0;

        for (let i = 0; i < actions.length; i++) {
            cumulativeWeight += weights[i];
            if (roll < cumulativeWeight) {
                action = actions[i];
                break;
            }
        }

        switch (action) {
            case 'basic': enemyBasicAttack(); break;
            case 'allstar': enemyAllStar(); break;
            case 'kick': enemyKick(); break;
            case 'deny': enemyDeny(); break;
            case 'powerAttack': enemyPowerAttack(); break;
            case 'heal': enemyHeal(); break;
            case 'summonMinions': enemySummonMinions(); break;
            case 'invincible': enemyInvincible(); break;
            case 'finalAttack': enemyFinalAttack(); break;
            default: enemyBasicAttack(); break;
        }
    } catch (error) {
        console.error("Error en selectEnemyAction:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function enemyBasicAttack() {
    try {
        let damage = Math.floor(Math.random() * 16) + 15;

        if (gameState.enemy.angryMode) {
            damage = Math.floor(damage * 1.5);
        }

        let target = gameState.ally.active ? 'ally' : 'player';

        let finalDamage = Math.floor(damage * (1 - (gameState.player.shield / 100)));
        if (target === 'player' && gameState.player.defending) {
            finalDamage = Math.floor(finalDamage * (1 - gameState.player.defenseBoost));
        }

        if (target === 'player' && gameState.player.invincible > 0) {
            showDialogue("¡Eres invencible! El ataque no tiene efecto.");
            setTimeout(() => {
                forceUnlockUI();
                startPlayerTurn();
            }, 2000);
            return;
        }

        if (target === 'player') {
            finalDamage = Math.floor(finalDamage * (1 + (gameState.player.fatigue * 0.03)));
        }

        if (target === 'ally') {
            gameState.ally.hp -= finalDamage;
            if (gameState.ally.hp < 0) gameState.ally.hp = 0;
            showAttackEffect('enemy', finalDamage, 'ally');
            showDialogue(`¡Pollolito ataca a tu aliado! ${finalDamage} de daño.`);
        } else {
            gameState.player.hp -= finalDamage;
            if (gameState.player.hp < 0) gameState.player.hp = 0;
            showAttackEffect('enemy', finalDamage);
            showDialogue(`¡Picotazo de Pollolito! ${finalDamage} de daño.`);
        }

        updateHealthBars();

        if (gameState.player.hp <= 0) {
            setTimeout(() => {
                forceUnlockUI();
                showGameOver(false);
            }, 2000);
            return;
        }

        if (gameState.ally.active && gameState.ally.hp <= 0) {
            gameState.ally.active = false;
            if (elements.ally) elements.ally.style.display = 'none';
            const allyStatus = document.getElementById('ally-status');
            if (allyStatus) allyStatus.style.display = 'none';
            setTimeout(() => {
                showDialogue("¡Tu aliado ha sido derrotado!");
                setTimeout(() => {
                    forceUnlockUI();
                    startPlayerTurn();
                }, 2000);
            }, 2000);
            return;
        }

        setTimeout(() => {
            forceUnlockUI();
            startPlayerTurn();
        }, 2000);
    } catch (error) {
        console.error("Error en enemyBasicAttack:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function enemyAllStar() {
    try {
        let damage = 25;

        if (gameState.enemy.angryMode) {
            damage = Math.floor(damage * 1.7);
        }

        showDialogue("¡Pollolito lanza objetos de All Star!");

        setTimeout(() => {
            let target = gameState.ally.active ? 'ally' : 'player';

            let finalDamage = Math.floor(damage * (1 - (gameState.player.shield / 100)));
            if (target === 'player' && gameState.player.defending) {
                finalDamage = Math.floor(finalDamage * (1 - gameState.player.defenseBoost));
            }

            if (target === 'player' && gameState.player.invincible > 0) {
                showDialogue("¡Eres invencible! El ataque no tiene efecto.");
                setTimeout(() => {
                    forceUnlockUI();
                    startPlayerTurn();
                }, 2002);
                return;
            }

            if (target === 'ally') {
                gameState.ally.hp -= finalDamage;
                if (gameState.ally.hp < 0) gameState.ally.hp = 0;
                showAttackEffect('enemy', finalDamage, 'ally');
                showDialogue(`¡Objetos de All Star golpean a tu aliado! ${finalDamage} de daño.`);
            } else {
                gameState.player.hp -= finalDamage;
                if (gameState.player.hp < 0) gameState.player.hp = 0;
                showAttackEffect('enemy', finalDamage);
                showDialogue(`¡Objetos de All Star te golpean! ${finalDamage} de daño.`);
            }

            updateHealthBars();

            if (gameState.player.hp <= 0) {
                setTimeout(() => {
                    forceUnlockUI();
                    showGameOver(false);
                }, 2000);
                return;
            }

            if (gameState.ally.active && gameState.ally.hp <= 0) {
                gameState.ally.active = false;
                if (elements.ally) elements.ally.style.display = 'none';
                const allyStatus = document.getElementById('ally-status');
                if (allyStatus) allyStatus.style.display = 'none';
                setTimeout(() => {
                    showDialogue("¡Tu aliado ha sido derrotado!");
                    setTimeout(() => {
                        forceUnlockUI();
                        startPlayerTurn();
                    }, 2000);
                }, 2000);
                return;
            }

            setTimeout(() => {
                forceUnlockUI();
                startPlayerTurn();
            }, 2000);
        }, 1200);
    } catch (error) {
        console.error("Error en enemyAllStar:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function enemyKick() {
    try {
        if (Math.random() < 0.5) {
            let damage = 60;

            if (gameState.enemy.angryMode) {
                damage = Math.floor(damage * 1.6);
            }

            let target = gameState.ally.active ? 'ally' : 'player';

            let finalDamage = Math.floor(damage * (1 - (gameState.player.shield / 100)));
            if (target === 'player' && gameState.player.defending) {
                finalDamage = Math.floor(finalDamage * (1 - gameState.player.defenseBoost));
            }

            if (target === 'player' && gameState.player.invincible > 0) {
                showDialogue("¡Eres invencible! El ataque no tiene efecto.");
                setTimeout(() => {
                    forceUnlockUI();
                    startPlayerTurn();
                }, 2000);
                return;
            }

            if (target === 'ally') {
                gameState.ally.hp -= finalDamage;
                if (gameState.ally.hp < 0) gameState.ally.hp = 0;
                showAttackEffect('enemy', finalDamage, 'ally');
                showDialogue("¡Patear azulitos a tu aliado! " + finalDamage + " de daño.");
            } else {
                gameState.player.hp -= finalDamage;
                if (gameState.player.hp < 0) gameState.player.hp = 0;
                showAttackEffect('enemy', finalDamage);
                showDialogue("¡Patear azulitos! " + finalDamage + " de daño.");
            }

            updateHealthBars();

            if (gameState.player.hp <= 0) {
                setTimeout(() => {
                    forceUnlockUI();
                    showGameOver(false);
                }, 2000);
                return;
            }

            if (gameState.ally.active && gameState.ally.hp <= 0) {
                gameState.ally.active = false;
                if (elements.ally) elements.ally.style.display = 'none';
                const allyStatus = document.getElementById('ally-status');
                if (allyStatus) allyStatus.style.display = 'none';
                setTimeout(() => {
                    showDialogue("¡Tu aliado ha sido derrotado!");
                    setTimeout(() => {
                        forceUnlockUI();
                        startPlayerTurn();
                    }, 2000);
                }, 2000);
                return;
            }
        } else {
            gameState.enemy.defenseDown = true;
            showDialogue("¡Pollolito falla el patear azulitos! Su defensa baja.");
            if (elements.enemy) {
                elements.enemy.classList.add('shake');
                setTimeout(() => {
                    elements.enemy.classList.remove('shake');
                }, 500);
            }
        }

        setTimeout(() => {
            forceUnlockUI();
            startPlayerTurn();
        }, 2000);
    } catch (error) {
        console.error("Error en enemyKick:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function enemyDeny() {
    try {
        showDialogue("Pollolito se prepara para negar tu próximo épico...");
        setTimeout(() => {
            hideDialogue();
            forceUnlockUI();
            startPlayerTurn();
        }, 2000);
    } catch (error) {
        console.error("Error en enemyDeny:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function enemyPowerAttack() {
    try {
        let damage = Math.floor(Math.random() * 21) + 30;

        if (gameState.enemy.angryMode) {
            damage = Math.floor(damage * 1.8);
        }

        showDialogue("¡Pollolito prepara un ataque potente!");

        setTimeout(() => {
            if (gameState.player.defending) {
                damage = Math.floor(damage * 0.3);
                gameState.enemy.defenseDown = true;
                showDialogue("¡Defendiste bien! Pollolito pierde defensa.");
            }

            let finalDamage = Math.floor(damage * (1 - (gameState.player.shield / 100)));

            if (gameState.player.invincible > 0) {
                showDialogue("¡Eres invencible! El ataque no tiene efecto.");
                setTimeout(() => {
                    forceUnlockUI();
                    startPlayerTurn();
                }, 2000);
                return;
            }

            gameState.player.hp -= finalDamage;
            if (gameState.player.hp < 0) gameState.player.hp = 0;

            showAttackEffect('enemy', finalDamage);
            showDialogue(`¡Ataque potente de Pollolito! ${finalDamage} de daño.`);
            updateHealthBars();

            if (gameState.player.hp <= 0) {
                setTimeout(() => {
                    forceUnlockUI();
                    showGameOver(false);
                }, 2000);
                return;
            }

            setTimeout(() => {
                forceUnlockUI();
                startPlayerTurn();
            }, 2000);
        }, 1500);
    } catch (error) {
        console.error("Error en enemyPowerAttack:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function enemyHeal() {
    try {
        if (gameState.enemy.healCooldown > 0) {
            enemyBasicAttack();
            return;
        }

        const healAmount = Math.floor(gameState.enemy.maxHp * (0.15 + Math.random() * 0.1));
        gameState.enemy.hp += healAmount;
        if (gameState.enemy.hp > gameState.enemy.maxHp) gameState.enemy.hp = gameState.enemy.maxHp;

        gameState.enemy.healCooldown = 4;

        showDialogue("¡Pollolito usa curación épica! +" + healAmount + " HP.");
        showDialogue("Pollolito: " + getRandomLine(POLLO_LINES.onHeal));

        if (elements.healSound) {
            elements.healSound.currentTime = 0;
            elements.healSound.play().catch(e => console.log("Error al reproducir sonido:", e));
        }
        updateHealthBars();

        setTimeout(() => {
            forceUnlockUI();
            startPlayerTurn();
        }, 2000);
    } catch (error) {
        console.error("Error en enemyHeal:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function enemySummonMinions() {
    try {
        if (gameState.enemy.summonCooldown > 0) {
            enemyBasicAttack();
            return;
        }

        gameState.enemy.summonCooldown = 5;

        let summoned = 0;
        gameState.enemyMinions.forEach(minion => {
            if (!minion.active && summoned < 2) {
                minion.active = true;
                minion.hp = 8;
                minion.turns = 3;
                summoned++;

                const minionElement = document.getElementById(`enemy-minion${minion.id}`);
                const healthElement = document.getElementById(`enemy-minion${minion.id}-health`);
                const healthFillElement = document.getElementById(`enemy-minion${minion.id}-health-fill`);
                
                if (minionElement) minionElement.style.display = 'block';
                if (healthElement) healthElement.style.display = 'block';
                if (healthFillElement) healthFillElement.style.width = '100%';
            }
        });

        showDialogue("¡Pollolito invoca minions kamikaze!");
        showDialogue("Pollolito: " + getRandomLine(POLLO_LINES.onSummonMinions));
        if (elements.minionSound) {
            elements.minionSound.currentTime = 0;
            elements.minionSound.play().catch(e => console.log("Error al reproducir sonido:", e));
        }

        setTimeout(() => {
            let totalDamage = 0;
            gameState.enemyMinions.forEach(minion => {
                if (minion.active) {
                    const damage = 3;
                    gameState.player.hp -= damage;
                    totalDamage += damage;
                    showAttackEffect('enemy', damage);
                }
            });

            if (totalDamage > 0) {
                showDialogue(`¡Los minions de Pollolito atacan! ${totalDamage} de daño total.`);
                updateHealthBars();

                if (gameState.player.hp <= 0) {
                    setTimeout(() => {
                        forceUnlockUI();
                        showGameOver(false);
                    }, 2000);
                    return;
                }
            }

            setTimeout(() => {
                forceUnlockUI();
                startPlayerTurn();
            }, 2000);
        }, 2000);
    } catch (error) {
        console.error("Error en enemySummonMinions:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function enemyInvincible() {
    try {
        if (gameState.enemy.invincibleCooldown > 0) {
            enemyBasicAttack();
            return;
        }

        gameState.enemy.invincible = 1;
        gameState.enemy.invincibleCooldown = 6;

        showDialogue("¡Pollolito se vuelve invencible por 1 turno!");
        showDialogue("Pollolito: " + getRandomLine(POLLO_LINES.onInvincible));
        if (elements.invincibleSound) {
            elements.invincibleSound.currentTime = 0;
            elements.invincibleSound.play().catch(e => console.log("Error al reproducir sonido:", e));
        }

        setTimeout(() => {
            forceUnlockUI();
            startPlayerTurn();
        }, 2000);
    } catch (error) {
        console.error("Error en enemyInvincible:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

function enemyFinalAttack() {
    try {
        gameState.enemy.finalAttackUsed = true;

        showDialogue("¡Pollolito prepara su ATAQUE DEFINITIVO!");
        showDialogue("Pollolito: " + getRandomLine(POLLO_LINES.onFinalAttack));

        if (elements.finalSound) {
            elements.finalSound.currentTime = 0;
            elements.finalSound.play().catch(e => console.log("Error al reproducir sonido:", e));
        }

        setTimeout(() => {
            let damage = 100;

            if (gameState.player.defending) {
                damage = Math.floor(damage * 0.3);
            }

            damage = Math.floor(damage * (1 - (gameState.player.shield / 100)));

            if (gameState.player.invincible > 0) {
                showDialogue("¡Eres invencible! El ataque no tiene efecto.");
                setTimeout(() => {
                    forceUnlockUI();
                    startPlayerTurn();
                }, 2000);
                return;
            }

            gameState.player.hp -= damage;
            if (gameState.player.hp < 0) gameState.player.hp = 0;

            showAttackEffect('enemy', damage);
            showDialogue(`¡ATAQUE DEFINITIVO DE POLLOLITO! ${damage} de daño.`);
            updateHealthBars();

            if (gameState.player.hp <= 0) {
                setTimeout(() => {
                    forceUnlockUI();
                    showGameOver(false);
                }, 2000);
                return;
            }

            setTimeout(() => {
                forceUnlockUI();
                startPlayerTurn();
            }, 2000);
        }, 2000);
    } catch (error) {
        console.error("Error en enemyFinalAttack:", error);
        forceUnlockUI();
        setTimeout(startPlayerTurn, 1000);
    }
}

// FIN DEL JUEGO
function showGameOver(playerWon) {
    try {
        disableUI();
        if (elements.endScreen) {
            elements.endScreen.style.display = 'flex';

            if (playerWon) {
                elements.endScreen.innerHTML = `
                    <h1>¡VICTORIA ÉPICA!</h1>
                    <p>Has derrotado a Pollolito. ¡Eres un verdadero programador épico!</p>
                    <button onclick="location.reload()">Jugar de nuevo</button>
                `;
            } else {
                elements.endScreen.innerHTML = `
                    <h1>¡DERROTA BODRIA!</h1>
                    <p>Pollolito te ha derrotado. ¡Necesitas más práctica en programación!</p>
                    <button onclick="location.reload()">Reintentar</button>
                `;
            }
        }
    } catch (error) {
        console.error("Error en showGameOver:", error);
        location.reload();
    }
}

// FUNCIONES DE UI
function enableUI() {
    try {
        resetUiBlockedTimer();
        document.querySelectorAll('.action-button, .submenu-button').forEach(button => {
            button.disabled = false;
        });
    } catch (error) {
        console.error("Error en enableUI:", error);
        forceUnlockUI();
    }
}

function disableUI() {
    try {
        document.querySelectorAll('.action-button, .submenu-button').forEach(button => {
            button.disabled = true;
        });
    } catch (error) {
        console.error("Error en disableUI:", error);
    }
}

function showMainMenu() {
    try {
        if (elements.attackMenu) elements.attackMenu.style.display = 'none';
        if (elements.skillMenu) elements.skillMenu.style.display = 'none';
        if (elements.itemMenu) elements.itemMenu.style.display = 'none';
        if (elements.battleUI) elements.battleUI.style.display = 'block';
    } catch (error) {
        console.error("Error en showMainMenu:", error);
    }
}

function showAttackMenu() {
    try {
        if (elements.attackMenu) elements.attackMenu.style.display = 'flex';
        if (elements.skillMenu) elements.skillMenu.style.display = 'none';
        if (elements.itemMenu) elements.itemMenu.style.display = 'none';
        if (elements.battleUI) elements.battleUI.style.display = 'none';
    } catch (error) {
        console.error("Error en showAttackMenu:", error);
    }
}

function showSkillMenu() {
    try {
        if (elements.attackMenu) elements.attackMenu.style.display = 'none';
        if (elements.skillMenu) elements.skillMenu.style.display = 'flex';
        if (elements.itemMenu) elements.itemMenu.style.display = 'none';
        if (elements.battleUI) elements.battleUI.style.display = 'none';
    } catch (error) {
        console.error("Error en showSkillMenu:", error);
    }
}

function showItemMenu() {
    try {
        if (elements.attackMenu) elements.attackMenu.style.display = 'none';
        if (elements.skillMenu) elements.skillMenu.style.display = 'none';
        if (elements.itemMenu) elements.itemMenu.style.display = 'flex';
        if (elements.battleUI) elements.battleUI.style.display = 'none';
    } catch (error) {
        console.error("Error en showItemMenu:", error);
    }
}

function backToMainMenu() {
    try {
        showMainMenu();
    } catch (error) {
        console.error("Error en backToMainMenu:", error);
    }
}

// FUNCIÓN DE MÚSICA
function toggleMusic(enable) {
    try {
        gameState.musicEnabled = enable !== undefined ? enable : !gameState.musicEnabled;
        if (elements.musicToggle) {
            elements.musicToggle.textContent = `Música: ${gameState.musicEnabled ? 'ON' : 'OFF'}`;
        }

        if (gameState.musicEnabled) {
            if (gameState.enemy.angryMode) {
                if (elements.bgMusic) elements.bgMusic.pause();
                if (elements.angryMusic) {
                    elements.angryMusic.currentTime = 0;
                    elements.angryMusic.play().catch(e => console.log("Auto-play prevented:", e));
                }
            } else {
                if (elements.angryMusic) elements.angryMusic.pause();
                if (elements.bgMusic) {
                    elements.bgMusic.play().catch(e => console.log("Auto-play prevented:", e));
                }
            }
        } else {
            if (elements.bgMusic) elements.bgMusic.pause();
            if (elements.angryMusic) elements.angryMusic.pause();
        }
    } catch (error) {
        console.error("Error en toggleMusic:", error);
    }
}

// DEBUG Y MONITOREO
function updateDebugInfo() {
    try {
        const now = performance.now();
        gameState.debug.frameCount++;

        if (now >= gameState.debug.lastFpsUpdate + 1000) {
            gameState.debug.fps = Math.round((gameState.debug.frameCount * 1000) / (now - gameState.debug.lastFpsUpdate));
            gameState.debug.frameCount = 0;
            gameState.debug.lastFpsUpdate = now;

            if (elements.debugInfo) {
                elements.debugInfo.textContent = `Build 0.2 | FPS: ${gameState.debug.fps}`;
            }
        }

        requestAnimationFrame(updateDebugInfo);
    } catch (error) {
        console.error("Error en updateDebugInfo:", error);
    }
}

// INICIALIZACIÓN DEL JUEGO
function initGame() {
    try {
        // Simular carga de recursos
        let progress = 0;
        const loadingInterval = setInterval(() => {
            progress += 5;
            if (elements.loadingProgress) {
                elements.loadingProgress.style.width = `${progress}%`;
            }
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                if (elements.loadingScreen) {
                    elements.loadingScreen.style.display = 'none';
                }
                if (elements.gameContainer) {
                    elements.gameContainer.style.display = 'block';
                }
                startGame();
            }
        }, 100);
    } catch (error) {
        console.error("Error en initGame:", error);
    }
}

function startGame() {
    // El resto de tu código de inicialización del juego
    if (elements.musicToggle) {
        elements.musicToggle.addEventListener('click', () => toggleMusic());
    }

    toggleMusic(true);
    updateHealthBars();

    gameState.debug.lastFrameTime = performance.now();
    gameState.debug.lastFpsUpdate = gameState.debug.lastFrameTime;
    updateDebugInfo();

    showDialogue("¡Pollolito aparece! ¡Prepárate para una batalla ÉPICA!");
    setTimeout(() => {
        showDialogue("Pollolito: " + getRandomLine(POLLO_LINES.taunts));
        setTimeout(() => {
            hideDialogue();
            startPlayerTurn();
        }, 3000);
    }, 2000);
}

// DETECCIÓN DE DISPOSITIVO
window.addEventListener('DOMContentLoaded', () => {
    try {
        gameState.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (gameState.isMobile) {
            const checkOrientation = () => {
                const warning = document.getElementById('mobile-warning');
                if (warning) {
                    if (window.innerHeight > window.innerWidth) {
                        warning.style.display = 'flex';
                    } else {
                        warning.style.display = 'none';
                        initGame();
                    }
                }
            };

            checkOrientation();
            window.addEventListener('resize', checkOrientation);
        } else {
            initGame();
        }
    } catch (error) {
        console.error("Error en DOMContentLoaded:", error);
        forceUnlockUI();
        setTimeout(initGame, 1000);
    }
});

// EXPORTAR FUNCIONES PARA gamepad.js
window.gameFunctions = {
    showMainMenu,
    showAttackMenu,
    showSkillMenu,
    showItemMenu,
    backToMainMenu,
    playerAttack,
    useSkill,
    useItem,
    playerDefend,
    gameState,
    elements
};