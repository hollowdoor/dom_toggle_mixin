'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var getElement = _interopDefault(require('dom-get-element'));
var domEventDispatch = require('dom-event-dispatch');

function toggleMixin(dest){

    dest.initToggle = function(ref){
        if ( ref === void 0 ) ref = {};
        var toggle = ref.toggle; if ( toggle === void 0 ) toggle = null;
        var display = ref.display; if ( display === void 0 ) display = 'block';
        var element = ref.element; if ( element === void 0 ) element = null;

        this._toggle = toggle;
        this._display = display;
        if(element)
            { this.element = getElement(element); }
    };

    dest.toggleDisplay = function(show){
        return toggleDisplay(this, show, this._display);
    };

    dest.toggle = function(show){
        var this$1 = this;

        if(yesToggle(this, show)){

            var cancelled = domEventDispatch.dispatchEvent(this.element, 'beforetoggled', {"bubbles":false, "cancelable":true});

            if(cancelled){
                return Promise.resolve(getDisplay(this.element) !== 'none');
            }

            if(!this._toggle){
                return Promise.resolve(
                    this.toggleDisplay(show)
                );
            }

            return Promise.resolve(this._toggle.call(this, !!show))
            .then(function (){ return this$1.toggleDisplay(show); });
        }

        return Promise.resolve(getDisplay(this.element) !== 'none');
    };
}

function yesToggle(that, show){

    if(show === void 0) { return true }
    {
        var display = getDisplay(that.element);
        return (
            show && display === 'none'
            ||
            !show && display !== 'none'
        );
    }
}

function toggleDisplay(that, show, display){
    if(show === void 0){
        var current = getDisplay(that.element);
        that.element.style.display = (
            display = current === 'none'
            ? display : 'none'
        );

        show = display !== 'none';
    }else{
        that.element.style.display = show ? display : 'none';
    }

    domEventDispatch.dispatchEvent(that.element, 'toggled', {"bubbles":false});

    return show;
}

function getDisplay(el){
    if(!el.style.display){
        var style = window.getComputedStyle(el, null);
        return style.display;
    }else{
        return el.style.display;
    }
}

exports.toggleMixin = toggleMixin;
//# sourceMappingURL=bundle.js.map
