export const songIndexDB = {
  dbase: null,
  createTime: null,

  createDB: (name, objectStoreName, dbVersion = 1) => {
    return new Promise((resolve, reject) => {
      const udb = window.indexedDB.open(name, dbVersion)

      udb.onsuccess = (event) => {
        console.log('数据库创建/打开成功')
        // console.log(this);
        // console.log(songIndexDB.dbase);
        // console.log(dbase);
        songIndexDB.dbase = event.target.result  //数据库实例 IDBDatabase
        console.log(songIndexDB.dbase);

        resolve(songIndexDB.dbase)
      }

      udb.onerror = (event) => {
        reject('数据库创建失败')
        console.log('数据库创建失败')
      }

      //如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
      // 新建数据库或者数据库版本大于当前版本会触发onupgradeneeded事件
      udb.onupgradeneeded = function (event) {
        let db = event.target.result
        // 数据库中没有这个表   objectStoreNames：表名
        if (!db.objectStoreNames.contains(objectStoreName)) {
          let objectStore = db.createObjectStore(objectStoreName, { keyPath: 'id' }) //第二个属性为指定主键id
          objectStore.createIndex('id', 'id', { unique: true })
        }
        console.log(db)
      }
    })
  },

  insertBase: (dbase, objectStoreName, data, cb) => {
    // let transaction=dbase.transaction(['upload','readwrite'])   //事务
    // let objectStore=transaction.objectStore('upload')   //  对象仓库
    return new Promise((resolve, reject) => {
      let res = dbase.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName).add(data);
      res.onsuccess = function (event) {
        typeof cb == 'function' && cb(event);
        console.log('数据写入成功');
        resolve();
      }
      res.onerror = function (event) {
        console.log('数据写入失败');
        reject('数据写入失败');
      }
    })
  },

  deleteBase: (dbase, objectStoreName, key, cb) => {
    return new Promise((resolve, reject) => {
      // key 主键键值
      let transaction = dbase.transaction([objectStoreName], 'readwrite')
      let objectStore = transaction.objectStore(objectStoreName)
      let res = objectStore.delete(key)
      res.onsuccess = function () {
        console.log('删除成功');
        resolve();
      }
      res.onerror = function () {
        console.log('删除失败');
        reject('删除失败');
      }
    })
  },

  updateBase: (dbase, objectStoreName, key, data, cb) => {
    return new Promise((resolve, reject) => {
      let transaction = dbase.transaction([objectStoreName], 'readwrite')
      let objectStore = transaction.objectStore(objectStoreName)
      let res = objectStore.get(key)
      res.onsuccess = function () {
        console.log('数据更新成功')
        objectStore.put(data);
        resolve();
      }
      res.onerror = function () {
        console.log('数据更新失败');
        reject('数据更新失败');
      }
    })
  },

  findAllBase: (dbase, objectStoreName, cb) => {
    return new Promise((resolve, reject) => {
      let res = dbase.transaction([objectStoreName]).objectStore(objectStoreName).getAll()
      res.onsuccess = function (event) {
        typeof cb == 'function' && cb(event);
        // console.log(`获取数据成功: ${res}`);
        // objectStore.put(data)
        resolve(event);
      }
      res.onerror = function () {
        console.log('获取数据失败')
        reject('获取数据失败');
      }
    })
  },

  findSpecialBase(dbase, objectStoreName, id, cb) {
    // console.log(dbase);
    return new Promise((resolve, reject) => {
      let res = dbase.transaction([objectStoreName]).objectStore(objectStoreName).get(id)
      res.onsuccess = function (e) {
        // console.log('获取数据成功');
        typeof cb == 'function' && cb(e.target.result);
        // return e.target.result;
        // objectStore.put(data)
        resolve(e.target.result);
      }
      res.onerror = function () {
        console.log('获取数据失败');
        reject('获取数据失败');
      }
    })
  },

  deleteDB: (dbname) => {
    window.indexedDB.deleteDatabase(dbname)
  }
}