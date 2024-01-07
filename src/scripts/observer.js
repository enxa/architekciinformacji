const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0
};

const callback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('out-viewport')
      entry.target.classList.add('in-viewport')
    } else {
      entry.target.classList.remove('in-viewport')
      entry.target.classList.add('out-viewport')
    }
  })
}

export const observer = new IntersectionObserver(callback, options)