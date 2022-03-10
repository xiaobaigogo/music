import { request } from "./request";

export function getTopList() {
  return request({
    url: '/toplist'
  })
}

export function getTopListInfo(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

// 获取歌词
export function getLyricsContent(id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

// 获取歌手
export function getArtist(type = -1, area = -1, initial = -1, limit = 30, offset = 0) {
  return request({
    url: '/artist/list',
    params: {
      type,
      area,
      initial,
      limit,
      offset,
    }
  })
}

// 获取歌手介绍
export function getArtistsDetail(id) {
  return request({
    url: '/artists',
    params: {
      id,
    }
  })
}

// 获取歌手专辑
export function getArtistsAlbum(id) {
  return request({
    url: '/artist/album',
    params: {
      id,
    }
  })
}

// 获取歌手MV
export function getArtistsMV(id, limit, offset) {
  return request({
    url: '/artist/mv',
    params: {
      id,
      limit,
      offset,
    }
  })
}

// 获取歌手详细生平
export function getArtistsInfo(id) {
  return request({
    url: '/artist/desc',
    params: {
      id,
    }
  })
}


// 获取当前播放歌曲信息
export function getCurrentSong(ids) {
  return request({
    url: 'song/detail',
    params: {
      ids
    }
  })
}

// 获取歌单分类
export function getPlayListCategory() {
  return request({
    url: '/playlist/catlist',
  })
}

// 获取精品碟歌单
export function getSupremePlayList(cat = "全部", limit = 50, offset = 0) {
  return request({
    url: '/top/playlist',
    params: {
      cat,
      limit,
      offset
    }
  })
}

// 获取歌单详情数据
export function getPlayListDetail(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

// 获取相关歌单推荐
export function getPlayListDetailRecommend(id) {
  return request({
    url: '/related/playlist',
    params: {
      id
    }
  })
}

// 首页：获取新歌数据
export function getNewSongs() {
  return request({
    url: '/top/song'
  })
}

// 首页：获取推荐歌单数据
export function getGoodPlaylist() {
  return request({
    url: '/personalized'
  })
}

// navBar: 获取搜索区域
export function getSearchResult(text) {
  return request({
    url: '/cloudsearch',
    params: {
      keywords: text,
    }
  })
}

// 获取专辑详情
export function getAlbumDetail(id) {
  return request({
    url: '/album',
    params: {
      id,
    }
  })
}

// 获取登录
// export function getLoginDetail({cellphone, captcha}) {
//   return request({
//     url: '/login/cellphone',
//     method: 'post',
//     params: {
//       cellphone,
//       captcha,
//     }
//   })
// }

// 发送验证码
export function sendCaptcha(phone) {
  return request({
    url: "/captcha/sent",
    method: 'post',
    params: {
      phone,
    }
  })
}

// 验证验证码
export function verifyCaptcha({ phone, captcha }) {
  return request({
    url: "/captcha/verify",
    method: 'post',
    params: {
      phone,
      captcha
    }
  })
}

// 生成二维码key
export function createQrkey() {
  return request({
    url: "/login/qr/key",
    method: "post",
    // headers: { 'Cache-Control': 'no-cache' },
    timerstamp: new Date().getTime(),
  })
}
// 生成二维码
export function createQr(key, qrimg) {
  return request({
    url: "/login/qr/create",
    method: "post",
    params: {
      key,
      qrimg,
      // timerstamp: new Date().getTime(),
    },
  })
}
// 二维码扫码检测
export function verifyQr(key) {
  return request({
    url: "/login/qr/check",
    method: "post",
    params: {
      key,
      // timerstamp: new Date().getTime(),
    }
  })
}

// 退出登录
export function logout() {
  return request({
    url: "/logout"
  })
}

// 注册功能
export function register({ captcha, phone, password, nickname }) {
  return request({
    url: "/register/cellphone",
    method: "post",
    params: {
      captcha,
      phone,
      password,
      nickname
    }
  })
}

// 检测手机号是否已注册
export function isRegister(phone) {
  return request({
    url: "/cellphone/existence/check",
    params: {
      phone,
    }
  })
}

// 检测注册昵称是否重名
export function isSameName(nickname) {
  return request({
    url: "/nickname/check",
    params: {
      nickname
    }
  })
}

// 登录后获取自己的账号信息
export function getUserAccount() {
  return request({
    url: "/user/account"
  })
}
// 获取用户账号信息
export function getUserInfo(id) {
  return request({
    url: "/user/detail",
    params: {
      uid: id,
    }
  })
}
// 获取用户歌单信息
export function getUserPlaylist(id) {
  return request({
    url: "/user/playlist",
    params: {
      uid: id,
    }
  })
}
// 获取用户最近一周播放记录
export function getUserRecord(id) {
  return request({
    url: "/user/record",
    params: {
      uid: id,
      type: 1,
    }
  })
}

// 操作：喜欢音乐
export function likeMusic(id, like) {
  return request({
    url: "/like",
    params: {
      id,
      like,
    }
  })
}

// 喜欢音乐的列表
export function likeMusicList(uid) {
  let timerstamp = new Date().getTime();
  return request({
    url: "/likelist",
    params: {
      uid,
      timerstamp,
    }
  })
}