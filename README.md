<!-- TITLE/ -->

<h1>ember-route-objects</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-badge"><a href="https://mediasuite.co.nz" title="The Media Suite"><img src="https://mediasuite.co.nz/ms-badge.png" alt="The Media Suite" /></a></span>
<br class="badge-separator" />
<span class="badge-badge"><a href="https://nodei.co/npm/ember-route-objects"><img src="https://nodei.co/npm/ember-route-objects.png?downloads=true&stars=true" /></a></span>
<br class="badge-separator" />
<span class="badge-travisci"><a href="http://travis-ci.org/digitalsadhu/ember-route-objects" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/digitalsadhu/ember-route-objects/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/ember-route-objects" title="View this project on NPM"><img src="https://img.shields.io/npm/v/ember-route-objects.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/ember-route-objects" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/ember-route-objects.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/digitalsadhu/ember-route-objects" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/digitalsadhu/ember-route-objects.svg" alt="Dependency Status" /></a></span>

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Parses ember router definitions into a nested object structure

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>NPM</h3></a><ul>
<li>Install: <code>npm install --save ember-route-objects</code></li>
<li>Module: <code>require('ember-route-objects')</code></li></ul>

<!-- /INSTALL -->


## Usage
First require the route objects function that will be used to parse an ember js style
router defintion function.

```js
const ro = require('ember-route-objects')
```

Then pass route objects an ember router definition function.

```js
const routeObjects = ro(function () {
  this.route('users')
  this.route('posts', function () {
    this.route('view', {path: '/:post_id'})
    this.route('list', {path: '/'})
    this.route('create', {method: 'post', path: '/'})
  })
})
```

And get back a definition object.

```js
[
  {
    name: 'users',
    path: '/users',
    method: 'get',
    resetNamespace: false,
    children: []
  },
  {
    name: 'posts',
    path: '/posts',
    method: 'get',
    resetNamespace: false,
    children: [
      {
        name: 'view',
        path: '/view',
        method: 'get',
        resetNamespace: false,
        children: []
      },
      {
        name: 'list',
        path: '/',
        method: 'get',
        resetNamespace: false,
        children: []
      },
      {
        name: 'create',
        path: '/',
        method: 'post',
        resetNamespace: false,
        children: []
      },
    ]
  }
]
```

### Additional

#### Note

- An additional option `method` is supported which should be specified as an http verb. `get|put|patch|post|delete`

#### Further reading

For additional documentation on how to define ember router route definitions please refer to:
- [Ember router documentation](https://guides.emberjs.com/v2.8.0/routing/defining-your-routes/)
- [Router's map method API documentation](http://emberjs.com/api/classes/Ember.Router.html#method_map)

<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/digitalsadhu/ember-route-objects/releases">Discover the release history by heading on over to the releases page.</a>

<!-- /HISTORY -->


<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li>Richard Walker digitalsadhu@gmail.com</li></ul>

<h3>Sponsors</h3>

These amazing people have contributed finances to this project:

<ul><li><a href="http://mediasuite.co.nz">The Media Suite</a></li></ul>

Become a sponsor!



<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="http://lovebeer.nz/">Richard Walker</a> — <a href="https://github.com/digitalsadhu/ember-route-objects/commits?author=digitalsadhu" title="View the GitHub contributions of Richard Walker on repository digitalsadhu/ember-route-objects">view contributions</a></li></ul>



<!-- /BACKERS -->


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="http://lovebeer.nz/">Richard Walker</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
