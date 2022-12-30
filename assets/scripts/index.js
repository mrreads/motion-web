import ASScroll from '@ashthornton/asscroll';
const asscroll = new ASScroll({ ease: 0.05, touchEase: 1, customScrollbar: false });
asscroll.enable();

import Cursor from './cursor';
new Cursor().init();

import './tilt';

import './model';