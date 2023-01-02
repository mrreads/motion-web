import ASScroll from '@ashthornton/asscroll';
const asscroll = new ASScroll({ ease: 0.05, touchEase: 1, customScrollbar: false, disableRaf: true });
asscroll.enable();

import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSRulePlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

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
    rotate: 30,
    opacity: .8
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

gsap.from(".colors-animation .image-warpper", { 
    scrollTrigger: { 
        start: "top -200px", 
        end: "bottom -200px", 
        scrub: 2.0, 
        trigger: ".more" 
    },
    duration: 6,
    ease: "back.out(1.2)", 
    x: window.innerWidth,
    rotate: 60,
    scale: 2,
    stagger: 2
});


gsap.to(".gold",        { scrollTrigger: { start: "-200px bottom", end: "bottom -80px", trigger: ".colours", scrub: 2 }, ease: "power4.in", width: '0%' });
gsap.to(".silver",      { scrollTrigger: { start: "-200px bottom", end: "bottom -80px", trigger: ".colours", scrub: 1 }, ease: "power4.in", width: '0%' });
gsap.to(".deep-purple", { scrollTrigger: { start: "-200px bottom", end: "bottom -80px", trigger: ".colours", scrub: 4 }, ease: "power4.in", width: '0%' });
gsap.to(".red",         { scrollTrigger: { start: "1000px bottom", end: "bottom 0", trigger: ".colours", scrub: 3 }, ease: "power4.in", width: '0%' });

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".five",
      pin: true,
      pinType: isTouch ? 'fixed' : 'transform',
      scrub: 0.5,
      start: "top top",
      end: "+=150%"
    }
  })
  .to(".box", {
    force3D: true, 
    duration: 1,
    xPercent: 100,
    ease: "power1.inOut",
    stagger: { amount: 1 }
  })
  .to(".box", { ease: "power1.out", duration: 1, rotation: "45deg" }, 0)
  .to(".box", { ease: "power1.in", duration: 1, rotation: "0deg" }, 1);


const counters = document.querySelectorAll('.feature span')
gsap.from(counters, {
    scrollTrigger: {
        scrub: 1,
        end: "bottom bottom",
        trigger: ".six"
    },
    textContent: 1,
    duration: 4,
    ease: "power1.in",
    snap: { textContent: 1 },
    stagger: {
        each: 0.5,
        onUpdate: function() {
            this.targets()[0].innerHTML = numberWithCommas(Math.ceil(this.targets()[0].textContent));
        },
    }
});


const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");