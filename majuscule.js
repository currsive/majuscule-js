window.addEventListener('DOMContentLoaded', (event) => {
    universalUpdate();
});

class UniversalPond{
    constructor(){
        this.pond = {}
    }

    drop(key, value, update=true){
        this.pond[key] = value;

        if(update){
            universalUpdate(key);
        }
    }
}

let universalPond = new UniversalPond();

function universalUpdate(pondKey=null){
    let html = document.getElementsByTagName('html')[0];
    let code = html.innerHTML;

    let regex = /\[\[( )*[a-zA-Z0-9]+( )*\]\]/g;
    instances = code.match(regex)

    for(let instance of instances){
        key = instance.replace('[[', '').replace(']]', '').trim()

        if (pondKey != null){
            if (Object.keys(universalPond.pond).includes(key) && key == pondKey){
                code = code.replace(instance, universalPond.pond[key]);
            }
        }

        else if (Object.keys(universalPond.pond).includes(key)){
            code = code.replace(instance, universalPond.pond[key]);
        }
    }

    html.innerHTML = code;
}
