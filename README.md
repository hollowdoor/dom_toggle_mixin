dom-toggle-mixin
===

Install
---

`npm install dom-toggle-mixin`

Usage
---

```javascript
import { toggleMixin } from 'dom-toggle-mixin';

class Toggler {
    constructor(element, {
        display = 'block',
        toggle = null
    } = {}){
        //Spool up the toggle mixin on this instance
        //display, and toggle are optional
        this.initToggle({element, display, toggle});
    }
}

//Add the mixin to the prototype
toggleMixin(Toggler.prototype);

const p = document.querySelector('p');
const toggler = new Toggler(p, {
    //The style display when the element is visible
    display: 'block',
    toggle(showing){
        //Called before each toggle
        //Return a promise if you would like
        //to do something async before the toggle.
        //This might be used with an animation library.
    }
});

//toggler.toggleDisplay() doesn't emit any events.
//Toggle the display synchronously
toggler.toggleDisplay();
//Force toggle to visible if the display is 'none'
toggler.toggleDisplay(true);
//Force toggle to not visible if the display is not 'none'
toggler.toggleDisplay(false);

//Events emitted by toggler.toggle();
p.addEventListener('beforetoggled', e=>{
    //Called before each toggle
});
p.addEventListener('toggled', e=>{
    //Called after each toggle
});

document.querySelector('#button1').addEventListener('click', e=>{
    //toggler.toggle() is asynchronous
    //toggler.toggle() emits DOM events
    //Toggle off/on depending on the style.display
    toggler.toggle().then(isVisible=>{
        //maybe it toggled
    });
});

document.querySelector('#button2').addEventListener('click', e=>{
    //Force toggle to visible if it's not visible
    toggler.toggle(true).then(isVisible=>{
        //maybe it toggled
    });
});

document.querySelector('#button3').addEventListener('click', e=>{
    //Force toggle to not visible if it's visible
    toggler.toggle(false).then(isVisible=>{
        //maybe it toggled
    });
});

```

About
---

It's a visibility toggler, in the form of a mixin. :)
