// 表单验证输入内容不能全为空格
const rulesText = (rule, value, callback) => {
  const text = /^(?!(\s+$))/.test(value)
  if (text) {
    callback()
  } else {
    callback(new Error('输入内容不能全为空格!'))
  }
}
// 验证输入的必须是正整数
const isValidateInteger = (rule, value, callback) => {
  if (!(/(^[1-9]\d*$)/.test(value))) {
    callback(new Error('输入正整数'))
  } else {
    callback()
  }
}

// 验证输入必须为数字
const isNumber = (rule, value, callback) => {
  if ((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) === false) {
    callback(new Error('请输入数字值'))
  } else {
    callback()
  }
}

// 验证可以不填，但是录入的话必须为数字
const isValNumber = (rule, value, callback) => {
  if (value !== null && value !== '') {
    if ((/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/).test(value) === false) {
      callback(new Error('请输入数字值'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 验证可以不填，但是录入的话必须为数字且默认小数点后四位；如果有特殊限制则依据特殊限制
const isFloatNumber = (rule, value, callback,maxFloat) => {
  if (value !== null && value !== '') {
    if(!maxFloat){
      maxFloat = 4;
    }
    let exp = `^\\d+(?:\\.\\d{1,${maxFloat}})?$`;// /^\d+(?:\.\d{1,4})?$/;
    const reg = new RegExp(exp);
    if (reg.test(value) === false) {
      callback(new Error(`请输入数字，小数部分为0到${maxFloat}位`))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

// 验证经度
const isLongitude = (rule, value, callback) => {
  if ((/^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/).test(value) === false) {
    if(value === '' || value === null || value === undefined){
      callback()
    }else{
      callback(new Error('经度整数部分为(-180,180),小数部分为0到6位'))
    }
  } else {
    callback()
  }
}

// 验证纬度
const isLatitude = (rule, value, callback) => {
  if ((/^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/).test(value) === false) {
    if(value === '' || value === null || value === undefined){
      callback()
    }else{
      callback(new Error('纬度整数部分为(-90,90),小数部分为0到6位'))
    }
  } else {
    callback()
  }
}

export default {
  rulesText,
  isValidateInteger,
  isNumber,
  isValNumber,
  isFloatNumber,
  isLongitude,
  isLatitude
}
