import Handlebars from 'handlebars/dist/handlebars.js'

import rawTemplate from 'raw-loader!./template.html'
import style from 'style-loader!css-loader!./style.css'

const template = Handlebars.compile(rawTemplate)

export default ({cb}) => {
  var res = {video: './assets/intro.mp4'}
  var html = template(res)

  const fragment = document.createElement('div')
  fragment.innerHTML = html
  document.body.appendChild(fragment)

  document.querySelector('#selector-for-video').onended = function() {
    document.body.removeChild(fragment)
    cb()
  }
}
