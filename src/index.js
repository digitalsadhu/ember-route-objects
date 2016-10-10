'use strict'

module.exports = function mapRouteFunctionToObjects (routeDefinitionFunction) {
  const routeDefinitionObjects = []
  const context = {
    route (name, options, callback) {
      if (typeof options === 'function') callback = options
      if (!options && !callback) options = {}
      const routeDefinitionObject = {
        name,
        path: options.path || '/',
        method: options.method || 'get',
        children: []
      }
      routeDefinitionObjects.push(routeDefinitionObject)
      if (typeof callback === 'function') {
        routeDefinitionObject.children = mapRouteFunctionToObjects(callback)
      }
    }
  }
  routeDefinitionFunction.call(context)
  return routeDefinitionObjects
}
