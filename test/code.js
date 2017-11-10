(function () {
'use strict';

function isElement(o){
    var type = typeof Element; //HTMLElement maybe
    return (
    type === "object" || type === 'function'
    ? o instanceof Element
    //DOM2
    : !!o
        && typeof o === "object"
        && o.nodeType === 1 //Definitely an Element
        && typeof o.nodeName==="string"
    );
}

function getElement(element, context){
    if ( context === void 0 ) { context = document; }

    if(typeof element === 'string'){
        try{
            return context.querySelector(element);
        }catch(e){ throw e; }
    }

    if(isElement(element)) { return element; }

    if(!!element && typeof element === 'object'){
        if(isElement(element.element)){
            return element.element;
        }else if(isElement(element[0])){
            return element[0];
        }
    }

    throw new TypeError(("value (" + element + ") in isElement(value)\n    is not an element, valid css selector,\n    or object with an element property, or index 0."));

}

var createEvent = (function (){
    try{
        new Event('nothing');
        return function (name, options) { return new Event(name, options); };
    }catch(e){}

    return function (name, options) {
        var event = document.createEvent('Event');
        event.initEvent(name, options.bubbles, options.cancelable);
        return event;
    };
})();

function dispatchEvent(el, name, options){
    if ( options === void 0 ) { options = {}; }

    var event = createEvent(name, options);
    return !el.dispatchEvent(event);
}

function toggleMixin(dest){

    dest.initToggle = function(ref){
        if ( ref === void 0 ) { ref = {}; }
        var toggle = ref.toggle; if ( toggle === void 0 ) { toggle = null; }
        var display = ref.display; if ( display === void 0 ) { display = 'block'; }
        var element = ref.element; if ( element === void 0 ) { element = null; }

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

            var cancelled = dispatchEvent(this.element, 'beforetoggled', {"bubbles":false, "cancelable":true});

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

    dispatchEvent(that.element, 'toggled', {"bubbles":false});

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

var Toggler = function Toggler(element){
    this.initToggle({element: element});
};

toggleMixin(Toggler.prototype);

var p = document.querySelector('p');
var toggler = new Toggler(p);

setEvent(p, 'beforetoggled');
setEvent(p, 'toggled');
document.querySelector('button').addEventListener('click', function (e){
    toggler.toggle();
});

function setEvent(p, name){
    p.addEventListener(name, function (e){
        console.log(("fired " + name + " event"));
        document.body.insertAdjacentHTML('beforeend', ("<p>fired " + name + " event</p>"));
    });
}

}());
//# sourceMappingURL=code.js.map
