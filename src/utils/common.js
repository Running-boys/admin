/*
@前端生成id 20位
*/
function getRadomID() {
    let time = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
        time += performance.now()
    }
    // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    const uid = 'xxxx-xxxx-xxxx-4xxxx'.replace(/[xy]/g, function (c) {
        const r = (time + Math.random() * 16) % 16 | 0
        time = Math.floor(time / 16)
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uid
}

/**
 * 下载
 * @param {*} url 
 * @param {*} callback 
 * self.commonJs.urlToBlob(downSrc, function(res) {
        const link = document.createElement('a')
        const url = window.URL.createObjectURL(res)
        link.href = url
        link.target = '_top'
        link.setAttribute('download', row.fileName)
        link.click()
        window.URL.revokeObjectURL(url)
        self.uploadLoad = true;
        self.currentIndex = -1;
    })
 */
function urlToBlob(url, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
        if (this.status === 200) {
            if (callback) {
                callback(this.response)
            }
        }
    }
    xhr.send()
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        return value.toString().padStart(2, '0')
    })
    return time_str
}
/**
 * 获取当前时间
 */
export function getDate() {
    const now = new Date()
    const day = now.getDay()
    const weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六')
    const week = weeks[day]
    const time = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}') + ' ' + week
    return time
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}


/**
 * 日期格式化
 * @param Number time 时间戳
 * @param String format 格式
 * @用法 dateFormat(1558259949034, 'Y-M-D H:I:S')
 */
function dateFormat(time, format) {
    const t = new Date(time);
    // 日期格式
    format = format || "Y-m-d h:i:s";
    let year = t.getFullYear();
    // 由于 getMonth 返回值会比正常月份小 1
    let month = t.getMonth() + 1;
    let day = t.getDate();
    let hours = t.getHours();
    let minutes = t.getMinutes();
    let seconds = t.getSeconds();

    const hash = {
        y: year,
        m: month,
        d: day,
        h: hours,
        i: minutes,
        s: seconds
    };
    // 是否补 0
    const isAddZero = o => {
        return /M|D|H|I|S/.test(o);
    };
    return format.replace(/\w/g, o => {
        let rt = hash[o.toLocaleLowerCase()];
        return rt >= 10 || !isAddZero(o) ? rt : `0${rt}`;
    });
}

/*
*@时间格式处理
*/
function formatDateTime(date, isSimple) {
    if (date !== null && date !== '') {
        let y = new Date(date).getFullYear();
        let m = new Date(date).getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = new Date(date).getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = new Date(date).getHours();
        h = h < 10 ? ('0' + h) : h;
        let min = new Date(date).getMinutes();
        min = min < 10 ? ('0' + min) : min;
        let s = new Date(date).getSeconds();
        s = s < 10 ? ('0' + s) : s;
        if (isSimple) {
            return `${y}-${m}-${d}`
        } else {
            return `${y}-${m}-${d} ${h}:${min}:${s}`
        }
    } else {
        return ''
    }
}

/*
*@数组对象去重
*data: 需要去重的数据
*field： 去重需要对比的字段
*/
function deWeight(data, field) {
    let hash = {};
    data = data.reduce((perVal, curVal) => {
        hash[curVal[field]] ? '' : hash[curVal[field]] = true && perVal.push(curVal);
        return perVal;
    }, []);
    return data;
}


/*
*@数组对象完全对比去重
*dataOne: 对比数据之一 数组
*dataTwo：对比数据之二 数组
*conObj：对比字段 对象
*/
function deWeightComplete(dataOne, dataTwo, conObj) {
    let datas = [];
    datas = datas.concat(dataOne);
    const jsDataOne = JSON.stringify(dataOne);
    for (let i = 0; i < dataTwo.length; i++) {
        let jsDataTwo = JSON.stringify(dataTwo[i]);
        if (jsDataOne.includes(jsDataTwo) === false) {
            datas.push(dataTwo[i]);
        }
    }
    return datas;
}


/*
*@查找树的第一个最深子节点
*@treeData: 树数据
*/
function findTreeFirstNode(treeData) {
    let temp = {};
    var treeFirstNode = function (treeData) {
        for (let i = 0; i < treeData.length; i++) {
            if (treeData[i].children && treeData[i].children.length > 0) {
                treeFirstNode(treeData[i].children);
            } else {
                if (treeData[i].children) {
                    treeFirstNode(treeData[i].children);
                } else {
                    if (JSON.stringify(temp) === "{}") {
                        temp = treeData[i];
                    }
                    break;
                }
            }
        }
    }
    treeFirstNode(treeData);
    return temp;
}


/*
*@递归去除没有子节点的children
*@arr: 数据
*/
function childMenu(arr) {
    if (arr && arr.length) {
        for (let i in arr) {
            if (arr[i].children && arr[i].children.length) {
                if (arr[i].children.indexOf(null) >= 0) {
                    arr[i].children = []
                } else {
                    childMenu(arr[i].children);
                }
            } else {
                delete arr[i].children;
            }
        }
    }
    return arr;
}

/*
*@查找指定树节点返回当前节点对象
*@arr: 数据
*/
function findCurrentNode(array, id, needFiled) {
    let obj = {};
    let walker = (array, id, needFiled) => {
        array.forEach((item) => {
            if (item[needFiled] === id) {
                obj = item;
            } else if (item['children']) {
                walker(item['children'], id, needFiled);
            }
        });
    }
    walker(array, id, needFiled);
    return obj;
}


/*
*@指定树id查找所有父节点
*@arr: 数据
*@id: 查找的id值
*@needFiled: 需要查找的字段
*/
function findAllParent(array, id, needFiled) {
    let stack = [];
    let going = true;
    let walker = (array, id, needFiled) => {
        array.forEach((item) => {
            if (!going) {
                return;
            }
            stack.push(item[needFiled]);
            if (item[needFiled] === id) {
                going = false;
            } else if (item['children']) {
                walker(item['children'], id, needFiled);
            } else {
                stack.pop();
            }
        });
        if (going) {
            stack.pop();
        }
    }
    walker(array, id, needFiled);
    return stack;
}


/*
*@指定树id查找所有子节点屏蔽
*@arr: 数据
*@id: 查找的id值
*@needFiled: 需要查找的字段
*@chilNode：需要屏蔽的子节点
*/
function disabledAllNode(arr, id, needFiled, chilNode) {
    if (arr && arr.length) {
        for (let i in arr) {
            if (arr[i][needFiled] === id || chilNode) {
                arr[i]['disabled'] = true;
                disabledAllNode(arr[i].children, id, needFiled, 'chilNode');
            } else {
                disabledAllNode(arr[i].children, id, needFiled);
            }
        }
    }
    return arr;
}