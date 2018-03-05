// Нужно событие на конец игры.
// На начало игры.
// Сколько шагов нужно куда-то отправять.
// Резеты.
// Сообщать о типах события.
// Сколько раз человек играл.
// Ну и по возможности на какие-то свои события окружений.

const GAGameStart = () => {
  let totalStarts = localStorage.getItem('dontleave_totalStarts') || 0
  localStorage.setItem('dontleave_totalStarts', ++totalStarts)
  if (window.ga) {
    window.ga('send', 'event', 'dont_leave_the_room', 'total_start_try', totalStarts)
  } else {
    console.error('No GA in WINDOW')
  }
}

const GAGameEnd = (sessionTime, totalTime, steps) => {
  let totalEnds = localStorage.getItem('dontleave_totalEnds') || 0
  localStorage.setItem('dontleave_totalEnds', ++totalEnds)
  if (window.ga) {
    window.ga('send', 'event', 'dont_leave_the_room', 'total_ends', totalEnds)
  } else {
    console.error('No GA in WINDOW')
  }
}

const GAGameReset = () => {

}

export { GAGameStart, GAGameEnd, GAGameReset }
