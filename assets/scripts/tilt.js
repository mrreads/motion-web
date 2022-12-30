
import gsap from 'gsap';

let cx, cy, clientX, clientY, dx, dy, tiltx, tilty, radius, degree;
const container = document.querySelector('.first .container');

cx = window.innerWidth / 2
cy = window.innerHeight / 2

container.addEventListener('mousemove', e => {
    clientX = e.pageX
    clientY = e.pageY
    requestAnimationFrame(update)
});

function update() {
    dx = clientX - cx;
    dy = clientY - cy;
    tiltx = dy / cy;
    tilty = dx / cx;
    radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
    degree = radius * 25;
    gsap.to(container, 1, { transform: `rotate3d( ${tiltx}, ${tilty}, 0, ${degree}deg )` });
}