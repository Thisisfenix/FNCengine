// CONSTANTES DEL JUEGO
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

// ESTADO DEL JUEGO
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

// ELEMENTOS DEL DOM (se inicializarán en game-ui.js)
const elements = {};

// FUNCIONES DEL JUEGO - LÓGICA PRINCIPAL

function getRandomLine(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function updateTemporaryEffects() {
    try {
        if (gameState.player.shieldTurns > 0) {
            gameState.player.shieldTurns--;
            if (gameState.player.shieldTurns === 0) {
                gameState.player.shield = 0;
                window.showDialogue("¡Tu escudo desaparece!");
            }
        }

        if (gameState.player.invincible > 0) {
            gameState.player.invincible--;
            if (gameState.player.invincible === 0) {
                window.showDialogue("¡Tu invencibilidad ha terminado!");
            }
        }

        if (gameState.player.poisoned > 0) {
            gameState.player.poisoned--;
            const poisonDamage = 5;
            gameState.player.hp -= poisonDamage;
            if (gameState.player.hp < 0) gameState.player.hp = 0;

            window.showDialogue("¡Sufres daño por veneno! -" + poisonDamage + " HP");
            window.showAttackEffect('player', poisonDamage);
            window.updateHealthBars();

            if (gameState.player.hp <= 0) {
                setTimeout(() => window.showGameOver(false), 2000);
                return;
            }
        }

        if (gameState.player.damageBoost > 0) {
            gameState.player.damageBoost--;
            if (gameState.player.damageBoost === 0) {
                window.showDialogue("¡Tu aumento de daño ha terminado!");
            }
        }

        if (gameState.player.focused) {
            gameState.player.focused = false;
            window.showDialogue("¡Pierdes la concentración!");
        }

        if (gameState.player.randomizerActive) {
            gameState.player.randomizerActive = false;
            window.showDialogue("¡El efecto randomizador ha terminado!");
        }

        if (gameState.ally.active) {
            gameState.ally.turns--;
            if (gameState.ally.turns <= 0) {
                gameState.ally.active = false;
                if (elements.ally) elements.ally.style.display = 'none';
                const allyStatus = document.getElementById('ally-status');
                if (allyStatus) allyStatus.style.display = 'none';
                window.showDialogue("¡Tu aliado se ha ido!");
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

            window.showDialogue("¡Pollolito sufre quemaduras! -" + burnDamage + " HP");
            window.showAttackEffect('player', burnDamage);
            window.updateHealthBars();

            if (gameState.enemy.hp <= 0) {
                setTimeout(() => window.showGameOver(true), 2000);
                return;
            }
        }

        if (gameState.enemy.frozen > 0) {
            gameState.enemy.frozen--;
            if (gameState.enemy.frozen === 0) {
                window.showDialogue("¡Pollolito se descongela!");
            }
        }

        if (gameState.enemy.asleep > 0) {
            gameState.enemy.asleep--;
            if (gameState.enemy.asleep === 0) {
                window.showDialogue("¡Pollolito se despierta!");
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
            window.showDialogue("Pollolito: " + angryLine);
            setTimeout(() => {
                window.showDialogue("¡Pollolito entra en MODO FURIOSO! Sus ataques son más fuertes.");
                window.forceUnlockUI();
                window.endPlayerTurn();
            }, 3000);
        }, 2000);
    } catch (error) {
        console.error("Error en activateAngryMode:", error);
        window.forceUnlockUI();
        setTimeout(window.startPlayerTurn, 1000);
    }
}

function applyDamage(damage, isCombo, tpCost = 0, message = "", specialEffect = null) {
    try {
        if (gameState.enemy.invincible > 0) {
            window.showDialogue("¡Pollolito es invencible! El ataque no tiene efecto.");
            setTimeout(() => {
                window.forceUnlockUI();
                window.endPlayerTurn();
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

        window.showAttackEffect('player', damage);
        if (message) window.showDialogue(message);
        window.updateHealthBars();

        if (!gameState.enemy.angryMode && gameState.enemy.hp / gameState.enemy.maxHp <= 0.3) {
            activateAngryMode();
            return;
        }

        if (gameState.enemy.hp <= 0) {
            setTimeout(() => {
                window.forceUnlockUI();
                window.showGameOver(true);
            }, 2000);
            return;
        }

        if (Math.random() < 0.4 && damage < 20) {
            setTimeout(() => {
                window.showDialogue("Pollolito: " + getRandomLine(POLLO_LINES.taunts));
                setTimeout(() => {
                    window.forceUnlockUI();
                    window.endPlayerTurn();
                }, 3000);
            }, 2000);
        } else {
            setTimeout(() => {
                window.forceUnlockUI();
                window.endPlayerTurn();
            }, 2000);
        }
    } catch (error) {
        console.error("Error en applyDamage:", error);
        window.forceUnlockUI();
        setTimeout(window.startPlayerTurn, 1000);
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
                window.showDialogue("¡Racha de 3 ataques precisos! +50% de daño");
                setTimeout(() => {
                    window.showDialogue(message);
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
        window.forceUnlockUI();
        setTimeout(window.startPlayerTurn, 1000);
    }
}

// Exportar funciones y estado para otros archivos
window.gameCore = {
    gameState,
    elements,
    ATTACK_TYPES,
    SKILLS,
    ITEMS,
    EFFECT_EMOJIS,
    POLLO_LINES,
    getRandomLine,
    updateTemporaryEffects,
    activateAngryMode,
    applyDamage,
    executePlayerAttack
};