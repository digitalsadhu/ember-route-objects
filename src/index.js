'use strict'

const assert = require('assert')

module.exports = function mapRouteFunctionToObjects (routeDefinitionFunction) {
  const routeDefinitionObjects = []
  const context = {
    route (name, options, callback) {
      const args = Array.from(arguments)
      if (args.length > 3 || args.length < 1) {
        throw new Error('Invalid number of arguments to this.route')
      }
      if (options && options.hasOwnProperty('method')) {
        if (['get', 'put', 'patch', 'post', 'delete'].indexOf(options.method) === -1) {
          throw new Error('Invalid http verb given to `method` option')
        }
      }
      assert.ok(typeof name === 'string', 'name argument must be a string')
      if (options && !callback) {
        assert.ok(typeof options === 'object' || typeof options === 'function', 'Invalid second argument given to this.route. Should be a function or options argument.')
      }
      if (options && callback) {
        assert.ok(typeof callback === 'function', 'Invalid third argument given to this.route. Should be a function.')
      }
      if (typeof options === 'function') callback = options
      if (!options && !callback) options = {}
      const routeDefinitionObject = {
        name,
        path: options.path || `/${name}`,
        method: options.method || 'get',
        resetNamespace: options.resetNamespace || false,
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
