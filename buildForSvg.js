const fs = require('fs');
const path = require('path');

const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(path.join(__dirname,'./src/components/aliIcons/iconfont.svg'))
});

const names = [];
console.log('create...');
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
            console.log('create successe.');
        }
    })
});