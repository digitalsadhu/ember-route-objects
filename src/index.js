'use strict'

module.exports = function mapRouteFunctionToObjects (routeDefinitionFunction) {
  const routeDefinitionObjects = []
  const context = {
    route (name, options, callback) {
      const args = Array.from(arguments)
      if (args.length > 3 || args.length < 1) {
        throw new Error('Invalid number of arguments to this.route')
      }
      if (typeof options === 'function') callback = options
      if (!options && !callback) options = {}
      const routeDefinitionObject = {
        name,
        path: options.path || `/${name}`,
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
