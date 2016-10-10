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
        path: '/',
        method: 'get',
        children: [
          {
            name: 'away',
            path: '/',
            method: 'get',
            children: []
          }
        ]
      }
    ]
    assert.deepEqual(actual, expected)
  })

  it('basic router definition parsing with options', function () {
    const actual = ro(function () {
      this.route('home', {path: '/home', method: 'patch'}, function () {
        this.route('away', {path: '/away', method: 'post'})
      })
    })

    const expected = [
      {
        name: 'home',
        path: '/home',
        method: 'patch',
        children: [
          {
            name: 'away',
            path: '/away',
            method: 'post',
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
})
