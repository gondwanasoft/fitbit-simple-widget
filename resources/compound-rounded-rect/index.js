/*  This widget is a container for two other widgets ("sub-widgets").

    If you really want a widget like this, don't do it like this.
    It would be more efficient to have all the elements you want within the one widget,
    rather than having widgets within widgets.
*/

const construct = (el, widgetFactory) => {  // TODO 1 use of widgetFactory here is probably inconsistent; should register el as widget container, then search it
  widgetFactory.registerContainer(el)
  const compoundRoundedRectValWidget = el.getWidgetById('compoundRoundedRectVal', el)
  const compoundRoundedRectFillWidget = el.getWidgetById('compoundRoundedRectFill', el)

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

  return el
}

export default () => {
  return {
    name: 'compoundRoundedRect',
    construct: construct
  }
}