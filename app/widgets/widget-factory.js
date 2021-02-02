// Widget factory
// This module attempts to make widget usage seem more 'normal'; ie, similar to a built-in element or component.

import document from "document";

export const widgetFactory = (...args) => {
  // Constructs widgets of specified type(s).
  // args: optionally an ElementSearch element within which to search for widgets, followed by one or more functions that return {name:nameString, construct:constructorFunction}
  // If an ElementSearch element isn't provided, the whole of document will be searched.
  // widgetFactory is a closure, so its internal variables and functions are not directly accessible to external code.

  let searchElement = document;
  let firstWidgetIndex = 0;

  if (typeof args[0] === 'object') {  // assume the object is an ElementSearch (widgets will be 'function')
    searchElement = args[0];
    firstWidgetIndex = 1;
  }

  // Construct widgets:
  for (let i = firstWidgetIndex; i < args.length; i++) {
    const widgetRego = args[i]();   // get the registration info for this widget
    const instances = searchElement.getElementsByTypeName(widgetRego.name); // this picks up widgets within widgets
    // TODO 9 another way to avoid searching whole of document would be to provide a factory(?) function that constructs widgets from their id or class.
    instances.forEach(el => {
      el.class = el.class; // This shouldn't do anything, but seems to cause CSS rules to be reapplied. Without it, CSS selectors such as "#id #radius" don't work.
      widgetRego.construct(el);
    });
  }
}
// TODO 3 do I need widgetRego.name?
// TODO 3 can I use getElementsByTypeName without specifying type against <use> but against <symbol>? If so, mightn't need type= in widget <use>, and mightn't need class= in <symbol>