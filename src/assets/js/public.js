function jsonFormat(str) {
  return JSON.parse(JSON.parse(str.replace(/\d+\|/g, '')))
}
function get_time() {
  var startDay = new Date()
  var endDay = new Date()
  startDay.setHours(0)
  startDay.setMinutes(0)
  startDay.setSeconds(0)
  endDay.setHours(23)
  endDay.setMinutes(59)
  endDay.setSeconds(59)
  return {
    startDay: startDay,
    endDay: endDay
  }
}

// storage方法封装，带过期时间,设置当天23：59：59过期
function setStorage(key, value) {
  var endTime = get_time().endDay
  localStorage.setItem(key, JSON.stringify({
    data: value,
    time: endTime
  }))
}

function getStorage(key) {
  var data = localStorage.getItem(key)
  if (!data) return ''
  var dataObj = JSON.parse(data)
  if (new Date().getTime() - dataObj.time >= 0) {
    localStorage.removeItem(key)
    return ''
  } else {
    var dataObjDatatoJson = dataObj.data
    return dataObjDatatoJson
  }
}

function getBeforeDate(cur_date, n, full) {
  // 获取指定日期的前n天日期，cur_date:指定日期，没有则默认为当前日期，n:多少天前，没有则默认为30天前
  // cur_date格式:2018-12-25 ,n为数字
  // full参数不存在则只返回月-日格式，如果存在则返回年-月-日
  if (n == undefined) n = 30
  var d = cur_date ? new Date(cur_date) : new Date()
  var year = d.getFullYear()
  var mon = d.getMonth() + 1
  var day = d.getDate()
  if (day <= n) {
    if (mon > 1) {
      mon = mon - 1
    } else {
      year = year - 1
      mon = 12
    }
  }
  d.setDate(d.getDate() - n)
  year = d.getFullYear()
  mon = d.getMonth() + 1
  day = d.getDate()
  if (full) {
    var s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day)
  } else {
    var s = (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day)
  }

  return s
}

function getBeforeDateList(cur_date, n, full) {
  // 获取指定日期n天前的所有日期(包括cur_date)，返回所有日期数组
  var dateList = []
  while (n >= 0) {
    dateList.push(getBeforeDate(cur_date, n, full))
    n--
  }
  return dateList
}

function getYesterDay() {
  // 获取昨天的日期，返回文本格式
  var today = new Date()
  today.setTime(today.getTime() - 24 * 60 * 60 * 1000)
  var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1).toString() : today.getMonth() + 1
  var date = today.getDate() < 10 ? '0' + (today.getDate()).toString() : today.getDate()
  var yesterday = today.getFullYear() + '-' + month + '-' + date
  return yesterday
}

function getYearWeek(dateString) {
  var da = dateString// 日期格式2015-12-30
  // 当前日期
  var date1 = new Date(da.substring(0, 4), parseInt(da.substring(5, 7)) - 1, da.substring(8, 10))
  // 1月1号
  var date2 = new Date(da.substring(0, 4), 0, 1)
  // 获取1月1号星期（以周一为第一天，0周一~6周日）
  var dateWeekNum = date2.getDay() - 1
  if (dateWeekNum < 0) {
    dateWeekNum = 6
  }
  if (dateWeekNum < 4) {
    // 前移日期
    date2.setDate(date2.getDate() - dateWeekNum)
  } else {
    // 后移日期
    date2.setDate(date2.getDate() + 7 - dateWeekNum)
  }
  var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000)
  if (d < 0) {
    var date3 = (date1.getFullYear() - 1) + '-12-31'
    return getYearWeek(date3)
  } else {
    // 得到年数周数
    var year = date1.getFullYear()
    var week = Math.ceil((d + 1) / 7)
    return year + ' 第' + week + '周'
  }
}

function transdate(endTime) {
  var date = new Date()
  date.setFullYear(endTime.substring(0, 4))
  date.setMonth(endTime.substring(5, 7) - 1)
  date.setDate(endTime.substring(8, 10))
  date.setHours(endTime.substring(11, 13))
  date.setMinutes(endTime.substring(14, 16))
  date.setSeconds(endTime.substring(17, 19))
  return Date.parse(date)
}

function timestampToTime(timestamp, no_day) {
  var date = new Date(timestamp)
  Y = date.getFullYear()
  M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  D = date.getDate()
  if (no_day) return Y + '-' + M
  return Y + '-' + M + '-' + D
}

function xwsErrorTip(content) {
  if (!content) content = '数据更新失败，请刷新页面重试！'
  $('#xws-modal-block .modal-body').empty().append('<div class="text-center" style="color: #f35a4a;">' + content + '</div>')
}

function getYearWeekStrList(dateString, n) {
  // 将文本时间转化为时间戳
  var date = transdate(dateString)
  var weekList = []
  for (var i = 0; i < n; i++) {
    weekList.push(date - 7 * 86400000 * i)
  }
  var week_len = weekList.length
  var weekArr = []
  for (var i = 0; i < week_len; i++) {
    weekArr.push(getYearWeek(timestampToTime(weekList[i])))
  }
  return weekArr.reverse()
}

function lastYearMonth(strTime, n) {
  var ms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  var curr = new Date(strTime)
  var m = curr.getMonth()
  var r = []
  for (var i = 0; i < n; i++) {
    var tmp = m - i
    var tmp_y = 0
    while (tmp < 0) {
      tmp += 12
      tmp_y += 1
      if (tmp > 0) {
        break
      }
    }
    y = curr.getFullYear() - tmp_y
    var month = ms[tmp] < 10 ? '0' + ms[tmp] : ms[tmp]
    r.push(y + '-' + month)
  }
  return r.reverse()
}

function concatArr(arr) {
  // 二维数组合并为一维数组
  return [].concat.apply([], arr)
}
function uniqArr(array) {
  /**
   * 图片合并
   */
  var temp = []
  var index = []
  var l = array.length
  for (var i = 0; i < l; i++) {
    for (var j = i + 1; j < l; j++) {
      if (array[i] === array[j]) {
        i++
        j = i
      }
    }
    temp.push(array[i])
    index.push(i)
  }
  return temp
}

function mergeArr(data, name) {
  /**
     * 合并数组内相同属性
     * data: 需要合并的数组
     * name: 合并的key
     */
  if (!name && typeof data !== Array && typeof name !== String) {
    return
  }
  var obj = {}
  var Arr = []
  data.forEach(function (item) {
    var key = Object.keys(item)
    key.forEach(function (el) {
      !obj[item[name].value] && (obj[item[name].value] = {})
      obj[item[name].value][el] = item[el]
    })
  })
  Object.values(obj).forEach(function (item) {
    Arr.push(item)
  })
  return Arr
}

// 获取上一个月时间,返回yyyy-MM-dd字符串
function getLastMonthTime(date) {
  //  1    2    3    4    5    6    7    8    9   10    11   12月
  var daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  var strYear = date.getFullYear()
  var strDay = date.getDate()
  var strMonth = date.getMonth() + 1
  // 一、解决闰年平年的二月份天数   //平年28天、闰年29天//能被4整除且不能被100整除的为闰年,或能被100整除且能被400整除
  if (((strYear % 4) === 0) && ((strYear % 100) !== 0) || ((strYear % 400) === 0)) {
    daysInMonth[2] = 29
  }
  if (strMonth - 1 === 0) { // 二、解决跨年问题
    strYear -= 1
    strMonth = 12
  } else {
    strMonth -= 1
  }
  strDay = Math.min(strDay, daysInMonth[strMonth])// 三、前一个月日期不一定和今天同一号，例如3.31的前一个月日期是2.28；9.30前一个月日期是8.30

  if (strMonth < 10) { // 给个位数的月、日补零
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  var datastr = strYear + '-' + strMonth + '-' + strDay
  return datastr
}

function calcDate(n) {
  var date = new Date()
  var t = date.getTime()
  var m = t - n * 24 * 3600 * 1000
  var s = new Date(m)
  return s.getFullYear() + '-' + ((parseInt(s.getMonth() + 1) < 10) ? '0' + parseInt(s.getMonth() + 1) : s.getMonth() + 1) + '-' + ((parseInt(s.getDate()) < 10) ? '0' + s.getDate() : s.getDate())
}
