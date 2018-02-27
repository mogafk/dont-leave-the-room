import Handlebars from 'handlebars/dist/handlebars.js'

import rawTemplate from 'raw-loader!./template.html'
import style from 'style-loader!css-loader!./style.css'

const template = Handlebars.compile(rawTemplate)

// template({'variable':'NJNJNJNJ'})
// console.log(template({'variable': 'NJNJNJNJ'}))


let BG_PATH = './assets/results/'
if(__DEV__ == false) {
  BG_PATH = '/dont_leave_room/assets/results/'
} 

export default (step, cb) => {
  var res = {'currentURL': encodeURIComponent(window.location.href + `?step=${step}&_share=1`)}
  console.log('STEPS:', step)
  if (step <= 0) {
    res['background'] = `${BG_PATH}stay-home.png`
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

  var html = template(res)

  // const fragment = document.createElement('div')
  const fragment = document.createElement('div')
  fragment.innerHTML = html
  document.body.appendChild(fragment)

  document.querySelector('#selector-for-button').onclick = function() {
    document.body.removeChild(fragment)
    cb()
  }
}
