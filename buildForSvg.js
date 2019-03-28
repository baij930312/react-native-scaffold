const fs = require('fs');
const path = require('path');


const names = [];
console.log('create...');

fs.readFile('./src/temp/Iconfont.ttf',(err,data)=>{
    fs.writeFile('./android/app/src/main/assets/fonts/Iconfont.ttf', data,(err)=> {
        console.log('move ttf file successe for android');

    })
})

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(path.join(__dirname,'./src/temp/iconfont.svg')),

});


lineReader.on('line', function (line) {
    let words = line.split(' ');
    if(words[4]==='<glyph'){
        let [key,value] = [words[5].slice(12,-1),words[6].slice(11,-2)];
        if(value){
            names.push('    "'+key+'":'+value);
        }
    }
});
lineReader.on('close',function () {
    return fs.writeFile(path.resolve(__dirname, './src/components/aliIcons/nameMap.json'), '{\n'+names.join(',\n')+'\n}', function (err) {
        if (err) {
            throw new Error(err)
        } else {
            console.log('create name map successe.');
        }
    })
});