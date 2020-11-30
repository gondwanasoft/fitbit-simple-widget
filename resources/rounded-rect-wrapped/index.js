const construct = el => {
  const roundedRectLeftEl = el.getElementById('roundedRectLeft')
  const roundedRectRectEl = el.getElementById('roundedRectRect')
  const roundedRectRightEl = el.getElementById('roundedRectRight')
  let   isValid = el.width < el.height    // opposite to what we want, so it gets handled in first redraw

  el.redraw = () => {
    // This is inefficient because it updates values that may not have changed.

    const isValidNew = el.width >= el.height  // to be valid, we must at least be able to draw a circle
    if (isValidNew !== isValid) {
      isValid = isValidNew
      // Hide the elements if invalid:
      roundedRectLeftEl.style.visibility = roundedRectRectEl.style.visibility = roundedRectRightEl.style.visibility = isValidNew? 'inherit' : 'hidden'
      // An alternative would be a draw a scaled-down circle.
      if (!isValid) return
    }

    roundedRectLeftEl.cx = roundedRectLeftEl.cy = roundedRectLeftEl.r = roundedRectRectEl.x = roundedRectRightEl.cy = roundedRectRightEl.r = el.height / 2
    roundedRectRectEl.width = el.width - el.height
    roundedRectRightEl.cx = el.width - el.height / 2
  }

  el.redraw()

  const widget = {}

  Object.defineProperty(widget, 'x', {  // because we're not returning an element, we have to explicitly define any element API calls we want to be available
    get: function() {
      return el.x
    },
    set: function(newValue) {
      if(el.x === newValue)
        return
      el.x = newValue
    }
  })

  Object.defineProperty(widget, 'width', {
    get: function() {
      return el.width
    },
    set: function(newValue) {
      if(el.width === newValue)
        return
      el.width = newValue
      el.redraw()
    }
  })

  return widget
}

export default () => {
  return {
    name: 'roundedRectWrapped',
    construct: construct
  }
}

// TODO 3.1 try a widget within a widget (smart widget with text overlay? rounded-rect bar with grey rounded-rect background?)