/*  This widget is a container for two other widgets ("sub-widgets").

    If you really want a widget like this, don't do it like this.
    It would be more efficient to have all the elements you want within the one widget,
    rather than having widgets within widgets.
*/

const construct = (el) => {
  const compoundRoundedRectValWidget = el.getElementById('compoundRoundedRectVal')
  const compoundRoundedRectFillWidget = el.getElementById('compoundRoundedRectFill')

  el.redraw = () => {
    // redraw() must be exposed in this widget's API because changes to width won't adjust the widget's sub-elements.

    // This is probably inefficient since it sets things that probably haven't changed.

    compoundRoundedRectValWidget.width = el.width
    compoundRoundedRectValWidget.height = el.height
    compoundRoundedRectValWidget.redraw()

    compoundRoundedRectFillWidget.width = el.width
    compoundRoundedRectFillWidget.height = el.height
    compoundRoundedRectFillWidget.redraw()
  }

  Object.defineProperty(el, 'value', {  // It may be dangerous to use the property name 'value' because it's already defined on GraphicsElement.
    set: function(newValue) {
      compoundRoundedRectValWidget.value = newValue
    }
  })

  Object.defineProperty(el, 'maxValue', {
    set: function(newValue) {
      compoundRoundedRectValWidget.maxValue = newValue
    }
  })

  el.redraw()
}

export default () => {
  return {
    name: 'compoundRoundedRect',
    construct: construct
  }
}