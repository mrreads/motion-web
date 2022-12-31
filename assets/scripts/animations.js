import ASScroll from '@ashthornton/asscroll';
const asscroll = new ASScroll({ ease: 0.05, touchEase: 1, customScrollbar: false, disableRaf: true });
asscroll.enable();

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSRulePlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CSSRulePlugin);
gsap.ticker.add(asscroll.update)
ScrollTrigger.defaults({ scroller: asscroll.containerElement })
ScrollTrigger.scrollerProxy(asscroll.containerElement, {
    scrollTop(value) {
        return arguments.length ? asscroll.currentPos = value : asscroll.currentPos;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
    }
});
asscroll.on("update", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", asscroll.resize);

const isTouch = 'ontouchstart' in document.documentElement;
const totalScroll = asscroll.containerElement.scrollHeight - innerHeight;

gsap.to(".second .image", {
    scrollTrigger: {
        pin: true,
        start: "top -200px",
        pinType: isTouch ? 'fixed' : 'transform',
        scrub: 1,
        trigger: ".second"
    },
    y: 1200,
    rotate: 30
});

gsap.to(CSSRulePlugin.getRule(".four::before"), { scrollTrigger: { trigger: ".gold", scrub: 1, start: "top 300px" }, cssRule: { left: -10 }});
gsap.to(CSSRulePlugin.getRule(".four::after"), { scrollTrigger: { trigger: ".gold", scrub: 1, start: "top 300px" }, cssRule: { left: 10 }});

gsap.to(".four .container", {
    scrollTrigger: {
        start: "top -100px",
        scrub: false,
        trigger: ".colours",
    },
    opacity: 1,
});

gsap.to(".four", {
    scrollTrigger: {
        start: "top -200px",
        scrub: false,
        trigger: ".more",
    },
    backgroundColor: 'white'
});

gsap.to(".four .color-2", { scrollTrigger: { start: "top 150px", end: "bottom -200px", scrub: 1.0, trigger: ".more" }, ease: "power4.in", duration: 2, x: 175 });
gsap.to(".four .color-3", { scrollTrigger: { start: "top 150px", end: "bottom -200px", scrub: 1.1, trigger: ".more" }, ease: "power4.in", duration: 3, x: 175 * 2 });
gsap.to(".four .color-4", { scrollTrigger: { start: "top 150px", end: "bottom -200px", scrub: 1.2, trigger: ".more" }, ease: "power4.in", duration: 4, x: 175 * 3 });
gsap.to(".four .color-5", { scrollTrigger: { start: "top 150px", end: "bottom -200px", scrub: 1.3, trigger: ".more" }, ease: "power4.in", duration: 5, x: 175 * 4 });


gsap.to(".gold",        { scrollTrigger: { start: "-200px bottom", end: "bottom -80px", trigger: ".colours", scrub: 2 }, ease: "power4.in", width: '0%' });
gsap.to(".silver",      { scrollTrigger: { start: "-200px bottom", end: "bottom -80px", trigger: ".colours", scrub: 1 }, ease: "power4.in", width: '0%' });
gsap.to(".deep-purple", { scrollTrigger: { start: "-200px bottom", end: "bottom -80px", trigger: ".colours", scrub: 4 }, ease: "power4.in", width: '0%' });
gsap.to(".red",         { scrollTrigger: { start: "1000px bottom", end: "bottom 0", trigger: ".colours", scrub: 3 }, ease: "power4.in", width: '0%' });



