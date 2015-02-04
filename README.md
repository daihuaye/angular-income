angular-income
=============

Simple custom income input directives for angular js >= 1.3. ( [Demo](http://embed.plnkr.co/THnIOl/preview) )

## Install

+ Add this line to your *bower.json* dependencies and run *bower install* afterwards.

>
``` JavaScript
"angular-income": "~1.0.2"
```

+ Include the required source file (this path or similar)

>
``` html
<script src="bower_components/dist/angular-income.min.js"></script>
```

+ Inject the `angular.income` module into your app.

>
``` JavaScript
angular.module('app', ['dy.income']);
```

## Usage

#### Module Name (Dependency)

* angular.income

#### Directives

* angular-income

#### Service

* angular.incomeService

## Attribute Usage
| attribute  | 	Description  | note |
|------------|----------------|---|
| `angular-income="{callbackHandler(event)}"` | **angular-income** is the main directive. `callbackHandler` is to receive data when data is populated. `event.val` return string value with comma, `event.value` return integer value without comma | |
| `ai-value="{{income}}"` | **ai-value** is a data-attribute to pass income value to directive | default: **empty string** |
| `ai-max-length="{{number}}"` | **ai-value** is a data-attribute to pass max length of income can be inputed | default: **8** |

## Example

>
```html
<div class="page" ng-controller="AppCtrl">
	<input type="text"
        dy-income="handler($event)"
        dy-value="{{income}}"
        dy-max-length="8" />
</div>
```

>
```JavaScript
var app = angular.module('app', [ 'angular.income' ]);
app.controller('AppCtrl', function AppCtrl($scope) {
  $scope.handler = function(event) {
    console.log(event.val); // show value with comma
    console.log(event.value); // show integer value
  };
})
```

## Copyright & License

Released under the [MIT license](LICENSE.txt).
