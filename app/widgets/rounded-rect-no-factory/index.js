/*
  This is a version of rounded-rect that has been streamlined so it can be created easily without using the widget-factory.
*/

const construct = el => {
  //console.log(`rounded-rect construct: el=${el} width=${el.width}`)
  const roundedRectLeftEl = el.getElementById('roundedRectLeft')
  const roundedRectRectEl = el.getElementById('roundedRectRect')
  const roundedRectRightEl = el.getElementById('roundedRectRight')
  let   isValid = el.width < el.height    // opposite to what we want, so it gets handled in first redraw

  el.redraw = () => {
    // redraw() must be exposed in this widget's API because changes to width won't adjust the widget's sub-elements.

    //console.log(`roundedRect.redraw() ${roundedRectLeftEl.cx} ${roundedRectLeftEl.cy} ${roundedRectLeftEl.r} ${el.height}`)
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

  return el;
}

export default el => {return construct(el)}
// An alternative would be to take {id, ElementSearch} as the argument and use ElementSearch.getElementById(id) to obtain the element, then proceed as currently.