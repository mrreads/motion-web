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

gsap.to(CSSRulePlugin.getRule(".four::before"), { scrollTrigger: { trigger: ".gold", scrub: false, start: "top 600px" }, cssRule: { left: -10 }});
gsap.to(CSSRulePlugin.getRule(".four::after"), { scrollTrigger: { trigger: ".gold", scrub: false, start: "top 600px" }, cssRule: { left: 10 }});

gsap.to(".four .container", {
    scrollTrigger: {
        start: "top -200px",
        scrub: false,
        trigger: ".colours",
    },
    opacity: 1,
});
