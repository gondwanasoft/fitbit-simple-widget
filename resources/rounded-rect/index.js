import widgetFactory from '../widget-factory'

console.log('rounded-rect index.js running')
console.log(`widgetFactory is ${widgetFactory}`)
console.log('got widgets')

const construct = el => {
  console.log(`rounded-rect construct: el=${el} width=${el.width}`)
  const roundedRectLeftEl = el.getElementById('roundedRectLeft')
  const roundedRectRectEl = el.getElementById('roundedRectRect')
  const roundedRectRightEl = el.getElementById('roundedRectRight')
  let   isValid = el.width < el.height    // opposite to what we want, so it gets handled in first redraw

  el.redraw = () => {
    // redraw() must be exposed in this widget's API because changes to width won't adjust the widget's sub-elements.

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

  return el
}

//widgetFactory().register('roundedRect', construct)

export default () => {
  return {
    name: 'roundedRect',
    construct: construct
  }
}

// TODO 3 expose internal elements via API (risky); see NiVZ's supeerb
// TODO 3 try rotating a widget