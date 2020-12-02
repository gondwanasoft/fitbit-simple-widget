// Widget factory

import document from 'document'
//import roundedRect from './rounded-rect'

const widgets = []    // each entry is {name:name, construct:constructorFunction}

export default (widgetArray) => {
  //console.log(`widget-factory init: ${typeof widgetArray}`)
  if (!widgetArray) return  // TODO 0 this can cause Bad Things to happen because nothing is returned
  widgetArray.forEach(widget => {
    //console.log(`factory is registering ${typeof widget}`)
    const widgetRego = widget()
    //console.log(`factory is registering ${widgetRego.name}`)
    widgets.push(widgetRego)
  })

  return {
    register(name, construct) {
      widgets.push({name:name, construct:construct})
      //console.log(`widget-factory register(${name}, ${construct}): count now ${widgets.length}`)
    },
    getWidgetById(id, parent) {
      //console.log(`getWidgetById(${id},${parent})`)
      if (!parent) parent = document
      const el = parent.getElementById(id)
      if (!el) return undefined

      const widgetName = el.class
      //console.log(`getWidgetById(): found element with class=${widgetName}`)

      const widget
      widgets.every(
        widgetRego => {
          if (widgetRego.name === widgetName) {
            //console.log(`getWidgetById(): found widget with name ${widgetName} in widgets[]`)
            //console.log(`construct=${widgetRego.construct}`)
            //console.log(`constructed widget is ${widgetRego.construct(el)}`)
            widget = widgetRego.construct(el)
            return false  // stop iterating
          } else
            return true
        }
      )
      return widget

      //return widgetRego.construct(el)

      /*switch(el.class) {
        case 'roundedRect':
          return roundedRect(el)
          break
        default:
          return undefined
      }

      return el*/
    }
  }
}
// TODO 3.8 args passed through to widget constructor
// TODO 3.8 widget constructed without using getWidgetById