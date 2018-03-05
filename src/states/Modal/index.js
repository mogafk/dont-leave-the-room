import Handlebars from 'handlebars/dist/handlebars.js'

import rawTemplate from 'raw-loader!./template.html'
import style from 'style-loader!css-loader!./style.css'

const template = Handlebars.compile(rawTemplate)


let BG_PATH = './assets/results/'
if(__DEV__ == false) {
  BG_PATH = '/dont_leave_room/assets/results/'
} 

export default ({step, cb, story}) => {
  var res = {'currentURL': encodeURIComponent(window.location.href + `?step=${step}&_share=1`)}
  if (step <= 0) {
    res['background'] = `${BG_PATH}stay-home.png`
    res['title'] = 'Вы победили!'
    res['text'] = 'Остаться дома - самый правильный вариант! поделитесь своей победой с друзьями!'
  }

  if (step > 0 && step < 50) {
    res['background'] = `${BG_PATH}less50.png`
    res['title'] = 'Вы умерли!'
    res['text'] = 'Остаться дома - самый правильный вариант! поделитесь своей победой с друзьями!'
  }

  if (step >= 50 && step < 100) {
    res['background'] = `${BG_PATH}over50.png`
    res['title'] = 'Вы умерли!'
    res['text'] = 'Остаться дома - самый правильный вариант! поделитесь своей победой с друзьями!'
  }

  if (step >= 100) {
    res['background'] = `${BG_PATH}over100.png`
    res['title'] = 'Вы умерли!'
    res['text'] = 'Остаться дома - самый правильный вариант! поделитесь своей победой с друзьями!'
  }

  if (story) {
    res['customHead'] = story.title || ''
    res['customDate'] = story.date || ''
    res['customText'] = story.text || ''
  }

  var html = template(res)

  // const fragment = document.createElement('div')
  const fragment = document.createElement('div')
  fragment.innerHTML = html
  document.body.appendChild(fragment);

  
  var windowW = window.innerWidth;
  if (windowW > 990) {
    setTimeout(function() {
      document.body.style.overflow = 'hidden';
      document.querySelector('[tabindex="10"]').focus();
    }, 1000)
  }
  

  document.querySelector('#selector-for-button').onclick = function() {
    document.body.removeChild(fragment)
    if (windowW > 990) {
      document.body.style.overflow = 'auto';
    }
    cb()
  }
}
