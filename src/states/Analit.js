// Нужно событие на конец игры.
// На начало игры.
// Сколько шагов нужно куда-то отправять.
// Резеты.
// Сообщать о типах события.
// Сколько раз человек играл.
// Ну и по возможности на какие-то свои события окружений.

const GAGameStart = () => {
  let totalStarts = localStorage.getItem('dontleave_totalStarts') || 0
  let lastEvent = localStorage.getItem('dontleave_lastEvent')
  localStorage.setItem('dontleave_totalStarts', ++totalStarts)
  if (window.ga) {
    window.ga('send', 'event', 'dont_leave_the_room', 'total_start_try', totalStarts)
    if (lastEvent !== undefined && lastEvent !== null) {
      window.ga('send', 'event', 'dont_leave_the_room', 'restart_after_event', lastEvent)
    }
  } else {
    console.error('No GA in WINDOW')
  }
}

const GAGameEnd = (sessionTime, totalTime, steps, event) => {
  let totalEnds = localStorage.getItem('dontleave_totalEnds') || 0
  localStorage.setItem('dontleave_totalEnds', ++totalEnds)
  localStorage.setItem('dontleave_lastEvent', event)
  if (window.ga) {
    window.ga('send', 'event', 'dont_leave_the_room', 'total_ends', totalEnds)
    window.ga('send', 'event', 'dont_leave_the_room', 'death_session_time', sessionTime)
    window.ga('send', 'event', 'dont_leave_the_room', 'death_game_time', totalTime)
    window.ga('send', 'event', 'dont_leave_the_room', 'death_steps_time', steps)
    window.ga('send', 'event', 'dont_leave_the_room', 'death_event', event)
  } else {
    console.error('No GA in WINDOW')
  }
}

const GAGameReset = () => {

}

export { GAGameStart, GAGameEnd, GAGameReset }
