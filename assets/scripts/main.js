import Cursor from './Cursor';
import ASScroll from '@ashthornton/asscroll';

new Cursor().init();

const asscroll = new ASScroll({
    ease: 0.05,
    touchEase: 1,
    customScrollbar: false
});
asscroll.enable();