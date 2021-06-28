function universalEvent(){
    let html = document.getElementsByTagName('html')[0];
    let code = html.innerHTML;

    let regex = /\[\%( )*[a-zA-Z0-9-\+\. \(\)\[\]\{\}\^\*\'\",]+( )*\%\]/g;
    instances = code.match(regex)

    console.log(instances)

    for (instance of instances){
        let key = instance.replace('[%', '').replace('%]', '').trim()
        let splits = key.split(' ')

        if (splits[0] == 'for'){
            console.log(getList(splits[splits.length - 1]))
        }
    }
}

function range(start, end=null, jump=1){
    let list = []
    if (end != null){
        for(let i = start; i < end; i+=jump){
            list.push(i);
        }
    }

    else{
        for(let i = 0; i < start; i += jump){
            list.push(i)
        }
    }

    return list
}

function getList(str){
    if (str.includes('range(')){
        return eval(str)
    }

    else{
        return universalPond.pond[str]
    }
}
