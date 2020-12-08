/*
This is a smart widget. It has knows about maximum value and current level of achievement.
*/

//import widgetFactory from '../widget-factory'

//console.log('rounded-rect index.js running')
//console.log(`widgetFactory is ${widgetFactory}`)
//console.log('got widgets')

const construct = el => {
  //console.log(`rounded-rect construct: el=${el} width=${el.width}`)
  const roundedRectLeftEl = el.getElementById('roundedRectLeft')
  const roundedRectRectEl = el.getElementById('roundedRectRect')
  const roundedRectRightEl = el.getElementById('roundedRectRight')
  let   isValid = el.width < el.height    // opposite to what we want, so it gets handled in first redraw
  let   _value = 0, _maxValue = 100

  el.redraw = () => {
    // redraw() must be exposed in this widget's API because changes to width won't adjust the widget's sub-elements.

    const visibleWidth = Math.max(Math.min(el.width * _value / _maxValue, el.width), 0) // scaled and range-checked width

    const isValidNew = visibleWidth >= el.height  // to be valid, we must at least be able to draw a circle
    if (isValidNew !== isValid) {
      isValid = isValidNew
      // Hide the elements if invalid:
      roundedRectLeftEl.style.visibility = roundedRectRectEl.style.visibility = roundedRectRightEl.style.visibility = isValidNew? 'inherit' : 'hidden'
      // An alternative would be a draw a scaled-down circle.
      if (!isValid) return
    }

    roundedRectLeftEl.cx = roundedRectLeftEl.cy = roundedRectLeftEl.r = roundedRectRectEl.x = roundedRectRightEl.cy = roundedRectRightEl.r = el.height / 2
    roundedRectRectEl.width = visibleWidth - el.height
    roundedRectRightEl.cx = visibleWidth - el.height / 2
  }

  Object.defineProperty(el, 'value', {  // It may be dangerous to use the property name 'value' because it's already defined on GraphicsElement.
    set: function(newValue) {
      if(_value === newValue)
        return
      _value = newValue
      el.redraw()
    }
  })

  Object.defineProperty(el, 'maxValue', {
    set: function(newValue) {
      if(_maxValue === newValue)
        return
      _maxValue = newValue
      el.redraw()
    }
  })

  el.redraw()

  return el
}

//widgetFactory().register('roundedRect', construct)

export default () => {
  return {
    name: 'roundedRectSmart',
    construct: construct
  }
}