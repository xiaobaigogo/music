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