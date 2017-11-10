import { toggleMixin } from '../';

class Toggler {
    constructor(element){
        this.initToggle({element});
    }
}

toggleMixin(Toggler.prototype);

const p = document.querySelector('p');
const toggler = new Toggler(p);

setEvent(p, 'beforetoggled');
setEvent(p, 'toggled');
document.querySelector('button').addEventListener('click', e=>{
    toggler.toggle();
});

function setEvent(p, name){
    p.addEventListener(name, e=>{
        console.log(`fired ${name} event`);
        document.body.insertAdjacentHTML('beforeend', `<p>fired ${name} event</p>`)
    });
}
