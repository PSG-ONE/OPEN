// Efecto Matrix Rain
class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.matrixContainer = document.querySelector('.matrix-rain');
        this.matrixContainer.appendChild(this.canvas);
        
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = new Array(this.columns).fill(1);
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        this.init();
    }
}

// Efecto de typing para el comando
class TypingEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
        this.start();
    }
    
    start() {
        this.type();
    }
    
    type() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Efectos de glitch aleatorios
class GlitchEffects {
    constructor() {
        this.glitchElements = document.querySelectorAll('.glitch');
        this.startRandomGlitches();
    }
    
    startRandomGlitches() {
        setInterval(() => {
            this.glitchElements.forEach(element => {
                if (Math.random() > 0.7) {
                    this.triggerGlitch(element);
                }
            });
        }, 3000);
    }
    
    triggerGlitch(element) {
        element.style.transform = 'skew(2deg)';
        element.style.filter = 'hue-rotate(90deg)';
        
        setTimeout(() => {
            element.style.transform = 'skew(0deg)';
            element.style.filter = 'hue-rotate(0deg)';
        }, 200);
    }
}

// Efectos de terminal
class TerminalEffects {
    constructor() {
        this.terminal = document.querySelector('.terminal-window');
        this.addTerminalEffects();
    }
    
    addTerminalEffects() {
        // Efecto de parpadeo del cursor
        this.addCursorBlink();
        
        // Efecto de scanlines
        this.addScanlines();
        
        // Efecto de hover
        this.addHoverEffects();
    }
    
    addCursorBlink() {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        
        const commandElement = document.querySelector('.command');
        commandElement.appendChild(cursor);
    }
    
    addScanlines() {
        const scanlines = document.createElement('div');
        scanlines.className = 'scanlines';
        scanlines.innerHTML = '<div></div><div></div><div></div><div></div><div></div>';
        this.terminal.appendChild(scanlines);
    }
    
    addHoverEffects() {
        this.terminal.addEventListener('mouseenter', () => {
            this.terminal.style.transform = 'scale(1.02)';
        });
        
        this.terminal.addEventListener('mouseleave', () => {
            this.terminal.style.transform = 'scale(1)';
        });
    }
}

// Efectos de sonido simulados (visuales)
class SoundEffects {
    constructor() {
        this.addAudioVisualizers();
    }
    
    addAudioVisualizers() {
        const visualizer = document.createElement('div');
        visualizer.className = 'audio-visualizer';
        visualizer.innerHTML = `
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        `;
        
        document.body.appendChild(visualizer);
        this.animateBars();
    }
    
    animateBars() {
        const bars = document.querySelectorAll('.audio-visualizer .bar');
        bars.forEach((bar, index) => {
            setInterval(() => {
                const height = Math.random() * 100;
                bar.style.height = `${height}px`;
            }, 100 + (index * 50));
        });
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar Matrix Rain
    const matrixRain = new MatrixRain();
    
    // Iniciar efectos de glitch
    const glitchEffects = new GlitchEffects();
    
    // Iniciar efectos de terminal
    const terminalEffects = new TerminalEffects();
    
    // Iniciar efectos de sonido
    const soundEffects = new SoundEffects();
    
    // Efecto de typing para el comando
    const commandElement = document.querySelector('.command');
    const originalText = commandElement.textContent;
    commandElement.textContent = '';
    
    setTimeout(() => {
        new TypingEffect(commandElement, originalText, 80);
    }, 1000);
    
    // Efecto de aparición gradual del contenido
    const outputElements = document.querySelectorAll('.output > div');
    outputElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 2000 + (index * 300));
    });
    
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', () => {
        matrixRain.resize();
    });
    
    // Efecto de click en elementos importantes
    const importantElements = document.querySelectorAll('.warning-box, .action-required');
    importantElements.forEach(element => {
        element.addEventListener('click', () => {
            element.style.transform = 'scale(0.95)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Efecto de alerta de emergencia
    setTimeout(() => {
        showEmergencyAlert();
    }, 5000);
});

// Función para mostrar alerta de emergencia
function showEmergencyAlert() {
    const alert = document.createElement('div');
    alert.className = 'emergency-alert';
    alert.innerHTML = `
        <div class="alert-content">
            <h3>🚨 ALERTA DE MISIÓN 🚨</h3>
            <p>El sistema confirma: NO PODEMOS DESCANSAR.</p>
            <p>CONTINÚA LA OPERACIÓN.</p>
            <button onclick="this.parentElement.parentElement.remove()">ENTENDIDO</button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Remover automáticamente después de 10 segundos
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 10000);
}

// Añadir estilos CSS adicionales para los nuevos efectos
const additionalStyles = `
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .scanlines {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }
    
    .scanlines div {
        height: 2px;
        background: rgba(0, 255, 0, 0.1);
        margin-bottom: 2px;
        animation: scan 2s linear infinite;
    }
    
    @keyframes scan {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
    }
    
    .audio-visualizer {
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 3px;
        z-index: 1000;
    }
    
    .audio-visualizer .bar {
        width: 4px;
        background: #00ff00;
        border-radius: 2px;
        transition: height 0.1s ease;
    }
    
    .emergency-alert {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: emergency-pulse 0.5s infinite;
    }
    
    @keyframes emergency-pulse {
        0%, 100% { background: rgba(255, 0, 0, 0.9); }
        50% { background: rgba(255, 0, 0, 1); }
    }
    
    .alert-content {
        background: #000;
        border: 3px solid #ff0000;
        border-radius: 15px;
        padding: 40px;
        text-align: center;
        color: #ffffff;
        max-width: 500px;
        box-shadow: 0 0 50px #ff0000;
    }
    
    .alert-content h3 {
        color: #ff0000;
        margin-bottom: 20px;
        font-size: 1.8rem;
    }
    
    .alert-content button {
        background: #ff0000;
        color: #ffffff;
        border: none;
        padding: 15px 30px;
        font-size: 1.2rem;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 20px;
        font-family: 'Share Tech Mono', monospace;
        transition: all 0.3s ease;
    }
    
    .alert-content button:hover {
        background: #cc0000;
        transform: scale(1.1);
    }
`;

// Insertar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);