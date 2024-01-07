let previousUrl = window.location.pathname
let currentUrl = window.location.pathname

document.addEventListener('astro:page-load', () => {
  previousUrl = currentUrl
  currentUrl = window.location.pathname
  console.log('prev', previousUrl)
  console.log('curr', currentUrl)
})