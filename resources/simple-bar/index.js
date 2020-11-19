import document from 'document'
import widgetFactory from '../widget-factory'

console.log('simple-bar index.js running')

const construct = el => {
  console.log(`simple-bar construct: el=${el} id=${el.id}`)
  console.trace()

  const _text = el.getElementById('simpleBarText')
  const _valRect = el.getElementById('simpleBarValRect')
  let _value
  let _maxValue = 100
  let _decimals = 0

  console.log(`before Object.defineProperty`)
  Object.defineProperty(el, 'value', {  // It may be dangerous to use the property name 'value' because it's already defined on GraphicsElement.
    get: function() {
      return _value
    },
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

  Object.defineProperty(el, 'decimals', {
    set: function(newValue) {
      if(_decimals === newValue)
        return
      _decimals = newValue
      el.redraw()
    }
  })

  // The following property demonstrates how to provide simple access to elements within a widget.
  // In general, this is a dangerous practice because calling code can break the behaviour of the widget by manipulating its elements independently.
  // This feature might be useful where calling code might require more flexible control of elements within a widget than is otherwise provided by the
  // widget's API.
  Object.defineProperty(el, 'text', {
    get: function() {
      return _text
    }
  })

  el.redraw = () => {
    // Must be called after changing height in .js.
    // Alternatives:
    //    - Implement setHeight, which sets el.height and then calls redraw().
    //    - Widget doesn't return el but an object that implements all appropriate API (including height), passing calls through to el.
    //console.log(`simpleBar redraw() id=${el.id} value=${_value}`)
    if (_value === undefined) {
      _text.text = ''
      _valRect.height = 0
      return
    }

    _text.text = _value.toFixed(_decimals)
    //console.log(`_value=${_value} _maxValue=${_maxValue} height=${el.height}`)
    const height = Math.min( _value / _maxValue * el.height, el.height)
    _valRect.height = height
    _valRect.y = el.height - height
  }

  return el
}

//widgetFactory().register('simpleBar', construct)

export default () => {
  return {
    name: 'simpleBar',
    construct: construct
  }
}

/*export default ({id, maxValue, decimals}) => {
  const _symbol = document.getElementById(id)
  const _text = _symbol.getElementById('simpleBarText')
  const _valRect = _symbol.getElementById('simpleBarValRect')
  let _value
  let _maxValue    = maxValue || 100
  let _decimals = decimals | 0
  //let _height = _symbol.height

  Object.defineProperty(_symbol, 'value', {  // It may be dangerous to use the property name 'value' because it's already defined on GraphicsElement.
    get: function() {
      return _value
    },
    set: function(newValue) {
      if(_value === newValue)
        return
      _value = newValue
      _symbol.redraw()
    }
  })

  _symbol.redraw = () => {
    // Must be called after changing height in .js.
    // Alternatives:
    //    - Implement setHeight, which sets _symbol.height and then calls redraw().
    //    - Widget doesn't return _symbol but an object that implements all appropriate API (including height), passing calls through to _symbol.
    if (_value === undefined) {
      _text.text = ''
      _valRect.height = 0
      return
    }

    _text.text = _value.toFixed(_decimals)
    //console.log(`_value=${_value} _maxValue=${_maxValue} height=${_symbol.height}`)
    const height = Math.min( _value / _maxValue * _symbol.height, _symbol.height)
    _valRect.height = height
    _valRect.y = _symbol.height - height
  }

  ;(()=>{
    // Initialise widget.
    // This function is an IIFE so its memory can be freed after it has been executed.
    _symbol.redraw()
  })()

  return _symbol
}*/