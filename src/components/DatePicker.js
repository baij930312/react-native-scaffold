import Picker from "react-native-picker";

export  class DatePicker {
    _createDateData() {
        let date = [];
        for(let i=1970;i<2020;i++){
            let month = [];
            for(let j = 1;j<13;j++){
                let day = [];
                if(j === 2){
                    for(let k=1;k<29;k++){
                        day.push(k+'日');
                    }
                    //Leap day for years that are divisible by 4, such as 2000, 2004
                    if(i%4 === 0){
                        day.push(29+'日');
                    }
                }
                else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
                    for(let k=1;k<32;k++){
                        day.push(k+'日');
                    }
                }
                else{
                    for(let k=1;k<31;k++){
                        day.push(k+'日');
                    }
                }
                let _month = {};
                _month[j+'月'] = day;
                month.push(_month);
            }
            let _date = {};
            _date[i+'年'] = month;
            date.push(_date);
        }
        return date;
    }

    show(onPickerConfirm,defaultValue){
        Picker.init({
            pickerData: this._createDateData(),
            pickerTitleText: ' ',
            pickerCancelBtnText: '   取消',
            pickerConfirmBtnText: '确定   ',
            pickerToolBarBg: [255, 255, 255, 1],
            pickerCancelBtnColor:[219,172,70,1],
            pickerConfirmBtnColor:[219,172,70,1],
            pickerBg: [255, 255, 255, 1],
            pickerFontColor: [0, 0 ,0, 1],
            onPickerConfirm,
        });
        Picker.show();
        if (!!defaultValue){
            Picker.select(defaultValue)
        }
    }
}

export  default new DatePicker();