import {Easing, Group, Utils, Signal} from 'phaser'

const FONT_STYLE = {
  font: 'bold 40pt Courier',
  fill: 'white',
  align: 'left'
}
const EASING = Easing.Sinusoidal.InOut
const INITIAL_VALUE = 0.99 // 99%
const INCREMENTAL_VALUE = 0.99 //  99%

const Counter = () => {
  const negative = _val => 1 - _val
  const percentage = _val => _val * 100
  const calculatePercentage = _val => percentage(negative(_val)).toFixed(2)
  var value = INITIAL_VALUE
  var _valAsPercent = calculatePercentage(value)
  return {
    getValue: () => value,
    getAsText: (_v) => {
      _valAsPercent = _v ? calculatePercentage(_v) : calculatePercentage(value)
      const spaces = _valAsPercent < 10 ? '  ' : ' '
      return `${spaces}${_valAsPercent}%`
    },
    increment: () => { value = value * INCREMENTAL_VALUE; return value },
    getChoice: () => {
      return Utils.chanceRoll(25)
    }
  }
}

const Steps = () => {
  var value = 0
  return {
    getValue: () => value,
    increment: () => ++value
  }
}

export default class extends Group {
  constructor (game) {
    super(game)

    this.onEvent = new Signal()

    const text = game.add.text(
      game.world.centerX,
      50,
      '',
      FONT_STYLE
    )
    this.addChild(text)
    const chance = new Counter()
    text.anchor.setTo(0.5)

    const stepCounter = game.add.text(
      game.world.centerX,
      85,
      '',
      {
        font: '30pt Courier',
        fill: 'white',
        align: 'left'
      }
    )
    this.addChild(stepCounter)
    stepCounter.anchor.setTo(0.5)
    const steps = new Steps()

    const eventsText = game.add.text(
      game.world.centerX,
      120,
      '',
      {
        font: '30pt Courier',
        fill: 'white',
        align: 'left'
      }
    )
    this.addChild(eventsText)
    eventsText.anchor.setTo(0.5)

    const printText = _val => {
      text.setText(chance.getAsText(_val))
    }

    this.increment = () => {
      const step = steps.increment()
      let choice = chance.getChoice()
      if (choice) this.onEvent.dispatch()
      stepCounter.setText(`Шагов: ${step}`)
      // eventsText.setText(choice ? 'СОБЫТИЕ!' : 'событий нет')
      let a = {val: chance.getValue()}
      const b = {val: chance.increment()}
      const animation = game.add.tween(a).to(b, 400, EASING)
      animation.start()
      animation.onUpdateCallback(() => printText(a.val), this)
    }
    printText()
  }
}
