window.addEventListener('DOMContentLoaded', (event) => {
    universalUpdate();
});

class UniversalPond{
    constructor(){
        this.pond = {}
    }

    drop(key, value, update=false){
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

    let regex = /\[\[( )*[a-zA-Z0-9-\+\. \(\)\[\]\{\}\^\*\'\",]+( )*\]\]/g;
    instances = code.match(regex)

    // console.log(instances)

    try{
        for(let instance of instances){
            key = instance.replace('[[', '').replace(']]', '').trim()
            console.log(key)
            if (pondKey != null){
                if (key == pondKey){
                    code = replaceFromPond(code, instance, eval(substituteValues(key)), false);
                }
            }

            else{
                code = replaceFromPond(code, instance, eval(substituteValues(key)), false);
            }
        }
    }

    catch(err){
        console.error(err);
    }

    html.innerHTML = code;
}


// Replace instance with pond key on "on"
function replaceFromPond(on, instance, key, findFromPond=true){
    if(!findFromPond){
        return on.replace(instance, key);
    }

    else if (Object.keys(universalPond.pond).includes(key)){
        value = universalPond.pond[key]

        switch (typeof(value)){
            case 'number':
                value = `Number(${value})`
                break;

            case 'string':
                value = `String('${value}')`
                break;

        }

        return on.replace(instance, value);
    }

}

function substituteValues(key){
    let value = ''
    let keys = Object.keys(universalPond.pond)
    let parts = breakSemantically(key);
    for (let i=0; i<parts.length; i++){
        if (keys.includes(parts[i])){
            parts[i] = replaceFromPond(parts[i], parts[i], parts[i])
        }
    }

    console.log(parts.join(''))
    return parts.join('');
}

// num+10-2    -> [num, +, 10, -, 2]
function breakSemantically(word){
    let wordList = [];
    let splitOn = ['+', '-', '*', '/', '.'];
    word = word.replaceAll(' ', '');

    let prevCharType = 'char'
    let wordPart = '';
    n = 1

    for(let char of word){
        let thisCharType = null
        if(splitOn.includes(char)){
            thisCharType = 'symbol';
        }

        else{
            thisCharType = 'char'
        }

        if (thisCharType != prevCharType){
            wordList.push(wordPart);
            wordPart = ''
        }

        if (n == word.length){
            wordPart += char;
            wordList.push(wordPart)
        }


        wordPart += char;

        prevCharType = thisCharType;
        n += 1
    }

    return wordList;
}
