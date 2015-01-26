angular-income
=============

Simple custom income input directives for angular js >= 1.2. ( [Demo](http://embed.plnkr.co/THnIOl/preview) )

## Install

+ Add this line to your *bower.json* dependencies and run *bower install* afterwards.

>
``` JavaScript
"angular-income": "~1.0.0"
```

+ Include the required source file (this path or similar)

>
``` html
<script src="bower_components/dist/angular-income.min.js"></script>
```

+ Inject the `dy.income` module into your app.

>
``` JavaScript
angular.module('app', ['dy.income']);
```

## Usage

#### Module Name (Dependency)

* dy.income

#### Directives

* dy-income

#### Service

* dy.incomeService

## Attribute Usage
| attribute  | 	Description  | note |
|------------|----------------|---|
| `dy-income="{callbackHandler(event)}"` | **dy-income** is the main directive. `callbackHandler` is to receive data when data is populated. `event.val` return string value with comma, `event.value` return integer value without comma | |
| `dy-value="{{income}}"` | **dy-value** is a data-attribute to pass income value to directive | default: **empty string** |
| `dy-max-length="{{number}}"` | **dy-value** is a data-attribute to pass max length of income can be inputed | default: **8** |

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
var app = angular.module('app', [ 'dy.income' ]);
app.controller('AppCtrl', function AppCtrl($scope) {
  $scope.handler = function(event) {
    console.log(event.val); // show value with comma
    console.log(event.value); // show integer value
  };
})
```

## Copyright & License

Released under the [MIT license](LICENSE.txt).
