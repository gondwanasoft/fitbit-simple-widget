import document from 'document'
import { HeartRateSensor } from 'heart-rate'
import { battery } from 'power'
import widgetFactory from '../resources/widget-factory'
import simpleBar from '../resources/simple-bar'
import roundedRect from '../resources/rounded-rect'
import roundedRectSmart from '../resources/rounded-rect-smart'
import roundedRectWrapped from '../resources/rounded-rect-wrapped'
import compoundRoundedRect from '../resources/compound-rounded-rect'

const el = document.getElementById('energyGauge')
//console.log(`el=${el.id} ${el.class}`)

//console.log(`C`)
//console.log(`roundedRect=${roundedRect} (${typeof roundedRect})`)
const widgets = widgetFactory([roundedRect, roundedRectSmart, roundedRectWrapped, simpleBar, compoundRoundedRect])   // args aren't actually used; referring to them just ensures they're not tree-shaken out of existence
//console.log(`widgets=${widgets}`)
//const widget = widgets.getWidgetById('energyGauge', document)
//console.log(`widget=${widget}`)
const roundedRect1El = widgets.getWidgetById('roundedRect1')
const roundedRectRotEl = widgets.getWidgetById('roundedRectRot')
const roundedRectSmartEl = widgets.getWidgetById('roundedRectSmart')
roundedRectSmartEl.maxValue = 50
const roundedRectWrappedEl = widgets.getWidgetById('roundedRectWrapped')
//console.log(`roundedRect1El=${roundedRect1El} roundedRectWrappedEl=${roundedRectWrappedEl}`)

//const energyGauge = simpleBar({id:'energyGauge'})
//console.log('getting energyGauge')
const energyGauge = widgets.getWidgetById('energyGauge')
//console.log(`got energyGauge=${energyGauge}`)
//const stepsGauge = simpleBar({id:'stepsGauge', maxValue:50, decimals:2})
const stepsGauge = widgets.getWidgetById('stepsGauge')
stepsGauge.maxValue = 50
stepsGauge.decimals = 2
stepsGauge.text.style.fontSize = 10
//console.log(`stepsGauge=${stepsGauge}`)
//const heartGauge = simpleBar({id:'heartGauge'})
const heartGauge = widgets.getWidgetById('heartGauge')
const compoundRoundedRectEl = widgets.getWidgetById('compoundRoundedRect1')
compoundRoundedRectEl.x = 68
compoundRoundedRectEl.y = 10
compoundRoundedRectEl.width = 200
compoundRoundedRectEl.maxValue = 150
compoundRoundedRectEl.redraw()

//roundedRect1El.style.opacity = 0.3  // opacity is problematic in this case because of overlapping elements

// The following (and other) property assignments work because the widget is a SVG element, and thus inherits members from that element even though they're not included in the widget definition:
stepsGauge.style.fill = 'brown'

// Detect battery level change and update immediately:
battery.addEventListener('change', () => {
  const val = battery.chargeLevel
  energyGauge.value = stepsGauge.value = heartGauge.value = val*4/3
  roundedRect1El.width = val; roundedRect1El.redraw()
  roundedRectRotEl.width = val; roundedRectRotEl.redraw()
  roundedRectWrappedEl.width = val  // no need (or ability!) to call redraw() because .width does so
  roundedRectSmartEl.value = val
  compoundRoundedRectEl.value = val
})

const hrm = new HeartRateSensor({ frequency: 1 })
hrm.addEventListener("reading", () => {
  energyGauge.height = stepsGauge.height = heartGauge.height = hrm.heartRate
  energyGauge.redraw(); stepsGauge.redraw(); heartGauge.redraw()

  roundedRect1El.x = hrm.heartRate          // this works even though we never explicitly defined x, because it was already defined in the element
  roundedRectWrappedEl.x = hrm.heartRate    // this works because we explicitly defined x

  roundedRect1El.y = hrm.heartRate          // this works even though we never explicitly defined y, because it was already defined in the element
  roundedRectWrappedEl.y = hrm.heartRate    // this doesn't work because we never defined y, and the widget is not an element
})
hrm.start()

// TODO 3.2 widget used as mask (depends on whether symbol can be used as mask)
// TODO 3.3 widget masked (depends on whether symbol can be masked)
// TODO 3.4 widget with animation (discuss with NiVZ re API/events for this)
// TODO 3.5 subclass a widget
// TODO 3.6 widget with settings
// TODO 3.7 think about implications of widgets in dynamic GUIs; mem leaks?
// TODO 3.9 test on hardware
// TODO 9 k-pay
// TODO 9 other ideas for widgets: dateTime that swaps order based on locale; number (<text> that does commas and decimal places)