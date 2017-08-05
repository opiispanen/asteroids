class UI {

    constructor() {
        this.element = null;
        this.canvas = null;
        this.points = 0;
    }

    init(canvas) {
        if (!this.element) {
            this.canvas = canvas;
            this.element = this.generateElement(canvas);

            document.body.appendChild(this.element);
        }
    }

    update(points) {
        
        if (this.points !== points) {
            let pointDisplay = this.element.querySelector('.points');
            
            pointDisplay.innerText = points;

            this.points = points;
        }
    }

    removeLife() {
        let lives = this.element.querySelector('.lives');

        lives.removeChild(lives.children[0]);
    }

    gameOverScreen() {
        let screen = this.element.querySelector('.gameover-screen'),
            pointDisplay = this.element.querySelector('.points');

        pointDisplay.style.visibility = 'hidden';
        screen.innerHTML = `<h1>GAME OVER</h1><h2>${ this.points }</h2>`;

        return new Promise((resolve) => {
            screen.addEventListener('click', () => {
                this.element.innerHTML = this.defaultDisplay();
                resolve();
            });
        });
    }

    generateElement() {
        let element = document.createElement('div'),
            canvasBoundaries = this.canvas.getBoundingClientRect();

        element.className = 'game-ui';
        element.style.width = canvasBoundaries.width+'px';
        element.style.left = canvasBoundaries.left+'px';
        element.style.top = canvasBoundaries.top+'px';
        element.innerHTML = this.defaultDisplay();

        return element;
    }

    defaultDisplay() {
        return `<div class="points">${this.points}</div>
                            <div class="lives">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div class="gameover-screen"></div>`;
    }
}