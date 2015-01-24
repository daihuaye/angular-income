(function(window, angular, undefined) {
    'use strict';

    angular
        .module('dy.income', [])
        .factory('dy.income.service', incomeService)
        .directive('dyIncome', dyIncomeDirective);

    incomeService.$inject = [];
    dyIncomeDirective.$inject = ['dy.income.service', '$parse'];

    function incomeService() {
        var service = {
            bind: bind,
            addCommas: addCommas,
            numberOnly: numberOnly,
            specialKeys: specialKeys,
            getCursorPosition: getCursorPosition,
            setCursorPosition: setCursorPosition
        };

        return service;

        //////////

        function addCommas(input) {
            if (angular.isUndefined(input)) return "";
            return input.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        function specialKeys(event) {
            var key = event.keyCode,
                ctrl = event.ctrlKey,
                inSpecialArray = [8, 9, 13, 27, 46].indexOf(key), // backspace: 8, tab: 9, enter: 13, escape: 27, delet: 46
                inCtrlArray = [65, 67, 86, 88, 90].indexOf(key), //  a: 65,  c  67, v: 86,  x: 88, z: 90 
                isArrowKey = key >= 35 && key <= 39, // up: 38, left: 37, right: 39, down: 40 (down in this care is useless)
                isJQueryMetaKeycode = event.metaKey || event.ctrlKey || event.altKey;
            return inSpecialArray !== -1 || inCtrlArray !== -1 && ctrl || isArrowKey || isJQueryMetaKeycode
        }

        function numberOnly(event) {
            return !((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105))
        }

        function getCursorPosition (inp) {
            if ("selectionStart" in inp) {
                return inp.selectionStart;
            } else if (document.selection) {
                inp.focus();
                var sel = document.selection.createRange();
                var selLen = document.selection.createRange().text.length;
                sel.moveStart("character", -inp.value.length);
                return sel.text.length - selLen;
            }
        }

        function setCursorPosition(e, pos) {
            angular.forEach(e, function(elem, index) {
                if (elem.setSelectionRange) {
                    elem.setSelectionRange(pos, pos);
                } else if (elem.createTextRange) {
                    var range = elem.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            });
        }

        function bind(element, eventHandlers) {
            element.on('keydown', function(event) {
                eventHandlers['keydown'] && eventHandlers['keydown'](event);
            });

            element.on('keyup', function(event) {
                eventHandlers['keyup'] && eventHandlers['keyup'](event);
            });
        }
    }

    function dyIncomeDirective(incomeService, $parse) {
        var directive = {
            link: link
        };

        return directive;

        ///////////

        function link(scope, element, attr) {
            var incomeHandler = $parse(attr['dyIncome']),
                maxLength = 10,
                defaultValue = '';

            if (attr['dyMaxLength'] && attr['dyMaxLength'].length > 0) {
                maxLength = parseInt(attr['dyMaxLength'], 10);
            }

            if (attr['dyValue'] && attr['dyValue'].length > 0) {
                defaultValue = attr['dyValue'];
                element.val(incomeService.addCommas(defaultValue));
            }

            incomeService.bind(element, {
                'keydown': function(event) {
                    if (!incomeService.specialKeys(event)) {
                        // not press special keys
                        if (element.val().replace(/[^0-9]/g, "").length >= maxLength || !incomeService.numberOnly(event)) {
                            // either greater than max length or not a number then prevent default.
                            event.preventDefault();
                        }
                    }
                },
                'keyup': function(event) {
                    var prev_cursor_position = incomeService.getCursorPosition(element[0]),
                        prev_length = element.val().length,
                        income = incomeService.addCommas(element.val());

                    scope.$apply(function() {
                        element.val(income);
                        angular.extend(event, { val: income, value: parseInt(income.replace(/,/g, ''), 10) });
                        incomeHandler(scope, { $event: event });
                    });

                    // change the cursor position after the new value is set.
                    if (!event.ctrlKey) {
                        var new_cursor_position = prev_cursor_position + element.val().length - prev_length;
                        incomeService.setCursorPosition(element, new_cursor_position)
                    }
                }
            });
        }
    }


})(window, window.angular);