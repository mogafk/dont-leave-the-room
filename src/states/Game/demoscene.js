/* globals __DEV__ */
import Phaser from 'phaser'
import dat from 'dat.gui'

import Background from './sprites/Background'
// import Animated from './sprites/Animated'

import Brevik from './sprites/persons/Brevik'
import Doctor from './sprites/persons/Doctor'
import Gaster from './sprites/persons/Gaster'
import Hero from './sprites/persons/Hero'
import Men1 from './sprites/persons/Men1'
import Men2 from './sprites/persons/Men2'
import Men3 from './sprites/persons/Men3'
import Men4 from './sprites/persons/Men4'
import Men5 from './sprites/persons/Men5'
import Ment from './sprites/persons/Ment'
import Montirovka from './sprites/persons/Montirovka'
import Neo from './sprites/persons/Neo'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = Phaser.Color.RGBtoString(79, 72, 74) //  '#4f484'
  }

  preload () {
    for (let src of [Brevik, Doctor, Gaster, Hero, Men1, Men2, Men3, Men4, Men5, Ment, Montirovka, Neo]) {
      this.game.load.atlasJSONHash(...src.getAsset())
    }
    this.game.load.atlasJSONHash('explose', 'events/explose.png', 'events/explose.json')
    if (__DEV__) {
      this.game.time.advancedTiming = true
    }
  }

  create () {
    Background(this.game)
    const els = {
      'Brevik': Brevik,
      'Doctor': Doctor,
      'Gaster': Gaster,
      'Hero': Hero,
      'Men1': Men1,
      'Men2': Men2,
      'Men3': Men3,
      'Men4': Men4,
      'Men5': Men5,
      'Ment': Ment,
      'Montirovka': Montirovka,
      'Neo': Neo
    }

    this.persons = {}
    const generate = array => {
      array.map(el => {
        this.persons[el] = () => {
          return new els[el]({
            game: this.game,
            x: this.game.world.centerX,
            y: this.game.world.centerY
          })
        }
      })
    }
    generate(['Brevik', 'Doctor', 'Gaster', 'Hero', 'Men1', 'Men2', 'Men3', 'Men4', 'Men5', 'Ment', 'Montirovka', 'Neo'])

    console.log(this.persons)

    this.SPRT = this.persons['Brevik']()

    this._sprite = {
      anim: ''
    }

    this.selectedSprite = ''

    this.variable = {name: 'object'}
    this.gui = new dat.GUI()
    this.personer = this.gui.add(this, 'selectedSprite', Object.keys(this.persons))
    this.controller = this.gui.add(this._sprite, 'anim', Object.keys(this.SPRT.anim))

    this.personer.onFinishChange(value => {
      this.SPRT.destroy()
      this.SPRT = this.persons[value]()
      this.gui.remove(this.controller)
      this.controller = this.gui.add(this._sprite, 'anim', Object.keys(this.SPRT.anim))
      this.controller.onFinishChange(value => {
        this.SPRT.anim[value].play()
        this.SPRT.anim[value].onComplete.add(() => { this.SPRT.anim[value].play() })
      }, this)
    })
  }

  render () {}
}
