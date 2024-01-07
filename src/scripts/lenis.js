import Lenis from '@studio-freight/lenis'

// Custom easing function
const easing = x => {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2
}

const random = () => Math.floor(Math.random() * 10)

let lenis = new Lenis({
  orientation: 'horizontal'
})

lenis.on('scroll', e => {
  document.documentElement.style.setProperty('--velocity', Math.abs(e.velocity))
  document.documentElement.style.setProperty('--progress', e.progress)
  document.documentElement.style.setProperty('--limit', e.limit)
  document.documentElement.style.setProperty('--random', random())
})

const raf = time => {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

document.addEventListener('astro:page-load', () => {
  lenis = new Lenis({
    orientation: 'horizontal'
  })
})