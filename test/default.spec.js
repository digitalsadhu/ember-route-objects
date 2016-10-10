/* global describe, it */
const assert = require('assert')
const ro = require('../src')

describe('Ember Route Objects', function () {
  it('basic router definition parsing', function () {
    const actual = ro(function () {
      this.route('home', function () {
        this.route('away')
      })
    })

    const expected = [
      {
        name: 'home',
        path: '/home',
        method: 'get',
        resetNamespace: false,
        children: [
          {
            name: 'away',
            path: '/away',
            method: 'get',
            resetNamespace: false,
            children: []
          }
        ]
      }
    ]
    assert.deepEqual(actual, expected)
  })

  it('basic router definition parsing with options', function () {
    const actual = ro(function () {
      this.route('home', {path: '/homes', method: 'patch'}, function () {
        this.route('away', {path: '/aways', method: 'post'})
      })
    })

    const expected = [
      {
        name: 'home',
        path: '/homes',
        method: 'patch',
        resetNamespace: false,
        children: [
          {
            name: 'away',
            path: '/aways',
            method: 'post',
            resetNamespace: false,
            children: []
          }
        ]
      }
    ]
    assert.deepEqual(actual, expected)
  })

  it('real world router definition', function () {
    const actual = ro(function () {
      this.route('tmp', { path: '/tmps/:tmp_id' }, function () {
        this.route('view', { path: '/' })
        this.route('layouts', function () {
          this.route('edit', { path: '/:layout_id/edit' }, function () {
            this.route('details', { path: '/' })
            this.route('map')
          })
          this.route('create', { path: '/create' }, function () {
            this.route('details', { path: '/' })
            this.route('map')
          })
          this.route('view', { path: '/:layout_id' }, function () {
            this.route('deployments', function () {
              this.route('create')
              this.route('edit', { path: '/:deployment_id/edit' })
            })
          })
        })
      })
    })

    const expected = require('./expected.json')
    assert.deepEqual(actual, expected)
  })

  it('empty options object', function () {
    const actual = ro(function () {
      this.route('home', {})
    })

    const expected = [
      {
        name: 'home',
        path: '/home',
        method: 'get',
        resetNamespace: false,
        children: []
      }
    ]
    assert.deepEqual(actual, expected)
  })

  it('null options object', function () {
    const actual = ro(function () {
      this.route('home', null)
    })

    const expected = [
      {
        name: 'home',
        path: '/home',
        method: 'get',
        resetNamespace: false,
        children: []
      }
    ]
    assert.deepEqual(actual, expected)
  })

  it('no options object, no nested routes', function () {
    const actual = ro(function () {
      this.route('home')
    })

    const expected = [
      {
        name: 'home',
        path: '/home',
        method: 'get',
        resetNamespace: false,
        children: []
      }
    ]
    assert.deepEqual(actual, expected)
  })

  it('too few arguments', function () {
    const act = () => {
      ro(function () {
        this.route()
      })
    }

    assert.throws(act, /Invalid number of arguments to this.route/)
  })

  it('too many arguments', function () {
    const act = () => {
      ro(function () {
        this.route('home', {}, {}, {})
      })
    }

    assert.throws(act, /Invalid number of arguments to this.route/)
  })

  it('resetNamespace', function () {
    const actual = ro(function () {
      this.route('home', {resetNamespace: true})
    })

    const expected = [
      {
        name: 'home',
        path: '/home',
        method: 'get',
        resetNamespace: true,
        children: []
      }
    ]
    assert.deepEqual(actual, expected)
  })
})
