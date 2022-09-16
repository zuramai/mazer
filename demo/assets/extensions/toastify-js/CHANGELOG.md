# Changelog

All the changes made to toastify-js library.

## [1.12.0] - 2022-07-21

* Accessibility fix: Support aria-live for the toast
* Accessibility fix: Add aria-label for close icon

## [1.11.2] - 2021-10-06

* Bugfix: Style Options: "backgroundColor" not working! (#81)
* Bugfix: "ShadowRoot is undefined" in older browsers (#83)

## [1.11.1] - 2021-07-15

* Bugfix: IE11 support broke since style option #77

## [1.11.0] - 2021-04-25

* New property `oldestFirst` allows to set the order of adding new toasts to page (#70 and #71)

## [1.10.0] - 2021-03-25

* `selector` now supports a DOM Node, along with ID string ([#65](https://github.com/apvarun/toastify-js/pull/65))
* New property - `escapeMarkup` - Toggle the default behavior of escaping HTML markup
* New property - `style` - Use the HTML DOM Style properties to add any style directly to toast
* Adds `toastify-es.js`, to be used from node_modules until there are no compatibility issues

### Deprecations:

* `backgroundColor` is deprecated. Use `style.background` instead

## [1.9.3] - 2020-10-10

* Offset IE11 compatibility #64

## [1.9.2] - 2020-09-24

* Bugfix: Max width problem for firefox browser #61

## [1.9.1] - 2020-08-13

* Bugfix: Avatar positioning based on toast position

## [1.9.0] - 2020-07-22

* Add support for providing toast `offset`
* Updated docs: offset 

## [1.8.0] - 2020-05-29

* Add option to provide a node instead of text
* Updated docs: permanent toast duration 

## [1.7.0] - 2020-03-01

* To be able to set `stopOnFocus` for toasts without close icon
* Bugfix: `duration` can be infinite by setting as `0`
* Bugfix: Prevent errors when parent node is removed from DOM while using frameworks
* Bugfix: IE 9/10 compatibility fix

## [1.6.2] - 2020-01-03

* Bugfix: Closing the toast when custom close icon from icon fonts are used

## [1.6.1] - 2019-06-29

* Bugfix: Disabling `stopOnFocus`

## [1.6.0] - 2019-06-29

* **Deprecation Warning**: Migrating from `positionLeft` property to `position`
* Property `position` to support `center` as a value along with `left` and `right` - Useful for centering toast messages in the page

## [1.5.0] - 2019-05-30

* Added persistant toast option with ability to programatically close it

## [1.4.0] - 2019-05-12

* **Breaking Change**: Manually import CSS while using as module in your modern JavaScript applications
* Ability to pause the toast dismiss timer on hover (Using `stopOnFocus` property)

## [1.3.2] - 2018-12-6

* Added z-index attribute

## [1.2.1] - 2018-05-31

* Added support for Classes. Now custom classes can be added to the toast while creating it

## [1.2.0] - 2018-03-05

* Fix issue when `destination` and `close` options is used at the same time

## [1.1.0] - 2018-02-18

* Browser support extended to IE10+ without any polyfills

## [1.0.0] - 2018-02-17

* Support for modules

## [0.0.6] - 2017-09-09

* Support for changing background [Options]
* Optimized toast positioning logic
* Added changelog for library update tracking

## [0.0.5] - 2017-09-06

* Support for toast messages on mobile screens
* Tweaked close icon

## [0.0.4] - 2017-09-05

* Support for positioning of toasts on the page

## [0.0.3] - 2017-09-05

* Close buton for toasts [Options]

## [0.0.2] - 2017-09-04

* Option to add on-click link for toasts
* Updated comments for code readability

## [0.0.1] - 2017-09-02

* Initial Release
* Added Preview page
* Optimized function structure
