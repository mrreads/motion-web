import { splitVendorChunkPlugin } from 'vite'

export default {
    base: './',
    plugins: [splitVendorChunkPlugin()]
}