import Handlebars from 'handlebars/dist/handlebars.js'

import rawTemplate from 'raw-loader!./template.html'
import style from 'style-loader!css-loader!./style.css'

const template = Handlebars.compile(rawTemplate)

export default ({step, cb, story}) => {
  var res = {'currentURL': encodeURIComponent(window.location.href + `?step=${step}&_share=1`)}
  if (step <= 0) {
    res['background'] = './assets/results/stay-home.png'
    res['title'] = 'Вы победили!'
    res['text'] = 'Остаться дома - самый правильный вариант! поделитесь своей победой с друзьями!'
  }

  if (step > 0 && step < 50) {
    res['background'] = './assets/results/less50.png'
    res['title'] = 'Вы умерли!'
    res['text'] = 'Остаться дома - самый правильный вариант! поделитесь своей победой с друзьями!'
  }

  if (step >= 50 && step < 100) {
    res['background'] = './assets/results/over50.png'
    res['title'] = 'Вы умерли!'
    res['text'] = 'Остаться дома - самый правильный вариант! поделитесь своей победой с друзьями!'
  }

  if (step >= 100) {
    res['background'] = './assets/results/over100.png'
    res['title'] = 'Вы умерли!'
    res['text'] = 'Остаться дома - самый правильный вариант! поделитесь своей победой с друзьями!'
  }

  if (story) {
    res['customHead'] = story.title || ''
    res['customDate'] = story.date || ''
    res['customText'] = story.text || ''
  }

  var html = template(res)

  const fragment = document.createElement('div')
  fragment.innerHTML = html
  document.body.appendChild(fragment)

  document.querySelector('#selector-for-button').onclick = function() {
    document.body.removeChild(fragment)
    cb()
  }
}
