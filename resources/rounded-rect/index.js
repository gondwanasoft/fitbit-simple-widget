/*
This is a dumb widget. It has no awareness of maximum value or current level of achievement.
Its size is determined only by its width and height in pixels. It is the responsibility of calling code to determine the appropriate size.

The widget could be made smarter by giving it awareness of the maximum value it should be able to represent, and the current value it should indicate.
The widget's .width would then specify its size when its current value was at maximum. Lesser values would result in narrower visible image,
although the widget's .width would remain unchanged.

This example has been deliberately kept simple to demonstrate how to create a widget that is basically just a collection of SVG elements.
*/

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

// TODO 3 try rotating a widget