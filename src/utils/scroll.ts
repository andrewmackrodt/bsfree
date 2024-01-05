export interface ScrollCoordinate {
  scrollX: number
  scrollY: number
}

let lastCoord: ScrollCoordinate = { scrollX: -1, scrollY: -1 }

export type ScrollListener = (coord: ScrollCoordinate, lastCoord: ScrollCoordinate) => void

const listeners: ScrollListener[] = []

function registerAnimationFrameHandler() {
  const callback = function () {
    const coord = { scrollX: window.scrollX, scrollY: window.scrollY }
    if (
      coord.scrollX !== lastCoord.scrollX ||
      coord.scrollY !== lastCoord.scrollY
    ) {
      for (const listener of listeners) {
        listener(coord, lastCoord)
      }
    }
    lastCoord = coord
    if (listeners.length > 0) {
      requestAnimationFrame(callback)
    }
  }

  requestAnimationFrame(callback)
}

export function addScrollListener(listener: ScrollListener) {
  listeners.push(listener)
  if (listeners.length === 1) {
    registerAnimationFrameHandler()
  }
}

export function removeScrollListener(listener: ScrollListener) {
  const index = listeners.indexOf(listener)
  if (index >= 0) {
    listeners.splice(index, 1)
  }
}
