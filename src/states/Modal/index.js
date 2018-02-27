import Handlebars from 'handlebars/dist/handlebars.js'

import rawTemplate from 'raw-loader!./template.html'
import style from 'style-loader!css-loader!./style.css'

const template = Handlebars.compile(rawTemplate)

// template({'variable':'NJNJNJNJ'})
// console.log(template({'variable': 'NJNJNJNJ'}))

export default (step) => {
  var res = {'currentURL': encodeURIComponent(window.location.href + `?step=${step}&_share=1`)}
  if (step < 50) {
    res['background'] = './assets/results/stay-home.png'
    res['title'] = 'Вы победили!'
    res['text'] = 'Остаться дома - самый правильный вариант! поделитесь своей победой с друзьями!'
  }

  var html = template(res)

  const fragment = document.createElement('div')
  fragment.innerHTML = html
  document.getElementById('content').appendChild(fragment)

  return 'CONSOLE'
}
