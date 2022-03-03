// 格式化时间（分钟：秒）
export function formatTime(tm, ms) {
  let time = tm / ms;
  let m = Math.floor(time / 60);
  let s = (time % 60).toFixed(0);
  let mS = "";
  let sS = "";
  if (s == 60) {
    m += 1;
    sS = "00";
  } else if (s < 10) {
    sS = "0" + s;
  } else {
    sS = "" + s;
  }
  if (m < 10) {
    mS = "0" + m;
  }
  return `${mS}:${sS}`;
}

// 格式化日期
export function formatDate(date, fmt) {
  if (typeof date == 'string') {
    return date;
  }
  if (!fmt) fmt = "yyyy-MM-dd hh:mm:ss";
  if (!date || date == null) return null;
  // 将传入的date准换为时间对象，*1000是为了将秒转成毫秒；
  // date = new Date(date * 1000);
  date = new Date(date);
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = ('' + o[k])
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length === 1) ?
        str : padLeftZero(str)
      )
    }
  }
  return fmt;
}
function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 取随机插入数
export function randomInsert(length) {
  return Math.floor(length * Math.random());
}

// 格式化数量
export function formatCount(num) {
  if (num < 10000) {
    return num;
  } else if (num < 100000000) {
    return Math.floor(num / 10000) + "万";
  } else {
    return Math.floor(num / 100000000) + "亿";
  }
}