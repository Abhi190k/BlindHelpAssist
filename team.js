// Create floating elements
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const numElements = 50;

    for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random position
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // Random animation
        const duration = 15 + Math.random() * 15;
        const delay = Math.random() * -20;
        
        element.style.animation = `float ${duration}s ${delay}s infinite linear`;
        
        container.appendChild(element);
    }
}

// Mouse follow effect for team cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.team-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
    
    createFloatingElements();
});

// Add floating animation
const style = document.createElement('style');
style.textContent = `
@keyframes float {
    0% {
        transform: translate(0, 0);
    }
    25% {
        transform: translate(10px, 10px);
    }
    50% {
        transform: translate(20px, 0);
    }
    75% {
        transform: translate(10px, -10px);
    }
    100% {
        transform: translate(0, 0);
    }
}
`;
document.head.appendChild(style);

// Neural Network Animation
class NeuralNetwork {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container = document.getElementById('neuralNetwork');
        this.container.appendChild(this.canvas);
        
        this.nodes = [];
        this.connections = [];
        this.animationFrame = null;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // Reinitialize if already exists
        if (this.nodes.length) {
            this.init();
        }
    }
    
    init() {
        // Clear previous
        this.nodes = [];
        this.connections = [];
        
        // Create nodes
        const numNodes = Math.floor(this.width * this.height / 20000);
        for (let i = 0; i < numNodes; i++) {
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }
    
    drawNode(x, y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 2, 0, Math.PI * 2);
        this.ctx.fillStyle = '#6c5ce7';
        this.ctx.fill();
    }
    
    drawConnection(x1, y1, x2, y2, opacity) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = `rgba(108, 92, 231, ${opacity})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.stroke();
    }
    
    update() {
        // Update node positions
        this.nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > this.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.height) node.vy *= -1;
        });
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw connections
        this.nodes.forEach((node1, i) => {
            this.nodes.slice(i + 1).forEach(node2 => {
                const dx = node2.x - node1.x;
                const dy = node2.y - node1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.5;
                    this.drawConnection(node1.x, node1.y, node2.x, node2.y, opacity);
                }
            });
        });
        
        // Draw nodes
        this.nodes.forEach(node => {
            this.drawNode(node.x, node.y);
        });
    }
    
    animate() {
        this.update();
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Neural Network
    const neuralNetwork = new NeuralNetwork();
    
    // Add hover effect to team cards
    const cards = document.querySelectorAll('.team-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
