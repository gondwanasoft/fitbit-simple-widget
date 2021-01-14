/*
This is a smart widget. It can update the foreground arc and text label just by setting the el.value
*/

const construct = el => {
  //console.log(`rounded-rect construct: el=${el} width=${el.width}`)
  const progressArcText = el.getElementById("progressArcText");
  const progressArcBg   = el.getElementById("progressArcBg");
  const progressArcFg   = el.getElementById("progressArcFg");
  let   _value = 0, _suffix = ''

  el.redraw = () => {
    // redraw() must be exposed in this widget's API because changes to width won't adjust the widget's sub-elements.

    progressArcFg.sweepAngle = _value / 100 * 270;
    progressArcText.text = `${_value}${_suffix}`;
    
  
  }
  
  
  Object.defineProperty(el, 'value', {  // It may be dangerous to use the property name 'value' because it's already defined on GraphicsElement.
    set: function(newValue) {
      if(_value === newValue)
        return
      _value = newValue
      el.redraw()
    }
  })
  
  Object.defineProperty(el, 'suffix', {  // It may be dangerous to use the property name 'value' because it's already defined on GraphicsElement.
    set: function(newValue) {
      if(_suffix === newValue)
        return
      _suffix = newValue
      el.redraw()
    }
  })


  el.redraw()

  return el
}

//widgetFactory().register('roundedRect', construct)


export default () => {
  return {
    name: 'progressArcSmart',
    construct: construct
  }
}