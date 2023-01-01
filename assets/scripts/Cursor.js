export default class Cursor {
    
    constructor() {
        this.element;
        this.target = { x: 0.5, y: 0.5 };
        this.cursor = { x: 0.5, y: 0.5 };
        this.speed = 0.1;

        if (!document.querySelector('.cursor')) {
            let element = document.createElement('div');
            element.classList.add('cursor');
            document.body.appendChild(element);
        }
    }

    init() {
        window.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.element = document.querySelector('.cursor');
        this.raf = requestAnimationFrame(this.render.bind(this));
    }

    lerp(a, b, n) { 
        return (1 - n) * a + n * b;
    }

    onMouseMove(e) {
        this.target.x = e.clientX / window.innerWidth;
        this.target.y = e.clientY / window.innerHeight;
        if (!this.raf) this.raf = requestAnimationFrame(this.render.bind(this));
    }

    render() {
        this.cursor.x = this.lerp(this.cursor.x, this.target.x, this.speed);
        this.cursor.y = this.lerp(this.cursor.y, this.target.y, this.speed);
        this.element.style.top = `${this.cursor.y * window.innerHeight}px`;
        this.element.style.left = `${this.cursor.x * window.innerWidth}px`;

        const delta = Math.sqrt(Math.pow(this.target.x - this.cursor.x, 2) + Math.pow(this.target.y - this.cursor.y, 2));
        if (delta < 0.001) {
            cancelAnimationFrame(this.raf);
            this.raf = null;
        }
        this.raf = requestAnimationFrame(this.render.bind(this));

        this.hover();
    }

    hover() {
        let rect = this.element.getClientRects()[0];
        let point = document.elementFromPoint(rect.x + (this.element.clientHeight / 2), rect.y + (this.element.clientWidth / 2));

        if (point?.closest('.first') || false) {
            this.element.dataset.type = 'first';
        }
        else if (point?.closest('.second') || false) {
            this.element.dataset.type = 'second';
        }
        else if (point?.closest('.four') || false) {
            this.element.dataset.type = 'four';
        }
        else if (point?.closest('.five') || false) {
            this.element.dataset.type = 'five';
        }
        else if (point?.closest('.colours') || false) {
            this.element.dataset.type = 'colours';
        }
        else if (point?.closest('.five') || false) {
            this.element.dataset.type = 'five';
        }
        else if (point?.closest('.six') || false) {
            this.element.dataset.type = 'six';
        }
        else {
            //this.element.dataset.type = 'none';
        }
    }
}