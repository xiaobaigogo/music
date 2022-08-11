export const songStorage = {
  setExpireMap: (key, expire) => {
    const expireMap = localStorage.getItem('EXPIRE_MAP') || "{}";
    // console.log(expireMap);
    let addItem = { [key]: expire };
    // console.log(addItem);
    // console.log({ ...JSON.parse(expireMap) })
    localStorage.setItem('EXPIRE_MAP', JSON.stringify({
      ...JSON.parse(expireMap),
      ...addItem,
    }))
    // console.log(localStorage.getItem('EXPIRE_MAP'));
  },
  setItem: (key, value, expire) => {
    songStorage.setExpireMap(key, expire);
    // 这里要将map变成普通对象才能转换成JSON字符
    // console.log(value);
    // console.log(value instanceof Map);
    if (value instanceof Map) {
      // console.log('11111111');
      let obj = {};
      for (let [k, v] of value) {
        obj[k] = v;
      }
      // console.log(obj);
      localStorage.setItem(key, JSON.stringify(obj));
    } else if (value instanceof Object) {
      localStorage.setItem(key, JSON.stringify(value));
    }
    // console.log(JSON.stringify(obj));
  },
  getItem: (key) => {
    const expireMap = JSON.parse(
      localStorage.getItem('EXPIRE_MAP') || '{}'
    )
    if (expireMap[key] && expireMap[key] > Date.now()) {
      // console.log('yes');
      return JSON.parse(localStorage.getItem(key));
    }
    else if (expireMap[key] && expireMap[key] <= Date.now()) {
      // console.log('no')
      localStorage.removeItem(key);
      return null;
    }
    // console.log('1111111');
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  }
}