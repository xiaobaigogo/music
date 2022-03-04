
import { formatTime } from "common/utils.js"
export class SingerDesc {
  constructor(artist, hotSong) {
    // id, cover, name, identifyTag, briefDesc, albumSize, musicSize, mvSize
    this.id = artist.id;
    this.cover = artist.picUrl;
    this.singername = artist.name;
    this.transnames = artist.alias;
    this.briefDesc = artist.briefDesc;
    this.albumSize = artist.albumSize;
    this.musicSize = artist.musicSize;
    this.mvSize = artist.mvSize;
    this.hotSongs = hotSong.map(({ id, name, dt, al }) => {
      // 将原本的数组过滤到剩名字，时长和专辑名字三项
      let alname = al.name;
      let alid = al.id;
      let dtString = formatTime(dt, 1000);
      al = { alname, alid };
      return { id, name, dtString, al };
    })
  }
}

export class SingerHotSongs {
  constructor(hotSong) {
    // this.songname = hotSongs.name;
    // this.dt = hotSongs.dt;
    // this.al = hotSongs.al.name;
    this.hotSongs = hotSong.map(({ name, dt, al }) => {
      // console.log(name);
      let alname = al.name;
      return { name, dt, alname }
    })
    // console.log(this.hotSongs)
  }
}

// 歌单详情数据结构
export class PlayListDetail {
  constructor(playlist) {
    this.detail = {
      id: playlist.id,
      name: playlist.name,
      picUrl: playlist.coverImgUrl,
      createTime: playlist.createTime,
      creator: {
        avatarUrl: playlist.creator.avatarUrl,
        nickname: playlist.creator.nickname,
        userId: playlist.creator.userId,
      },
      tag: playlist.tags,
      description: playlist.description,
      playCount: playlist.playCount,
    }
    // this.tracks = playlist.tracks.map(
    //   ({ name, dt, ar, al }) => { name, dt, { arname: ar.name, arid: ar.id }, { alname: al.name, alid: al.id } })
    this.tracks = playlist.tracks.map(
      ({ id, name, dt, ar, al }) => {
        let artist = ar.map(({ name, id }) => {
          return { arname: name, arid: id }
        });
        let album = { alname: al.name, alid: al.id }

        return { id, name, dt, artist, album }
      }
    )

    this.subscriber = playlist.subscribers.map(({ avatarUrl, userId }) => {
      return { avatarUrl, userId }
    })
  }
}
// 搜索结果数据结构
export class SearchDetail {
  constructor(songs) {
    this.songs = songs.map(({ id, name, dt, al, ar }) => {
      let artist = ar.map(({ id, name }) => { return { arid: id, arname: name } });
      let album = { alname: al.name, alid: al.id };
      return { id, name, dt, picUrl: al.picUrl, album, artist }
    });

    this.artists = [];
    songs.map(({ ar }) => {
      let ars = ar.map(({ id }) => { return id });
      this.artists.push(...ars);
      return ars;
    }, this.artists);

    this.albums = songs.map(({ al }) => {
      return { name: al.name, id: al.id, picUrl: al.picUrl }
    })
  }
}
// 专辑结果数据结构
export class AlbumDetail {
  constructor(album, songs) {
    this.detail = {
      id: album.id,
      name: album.name,
      picUrl: album.picUrl,
      publishTime: album.publishTime,
      artist: {
        picUrl: album.artist.picUrl,
        name: album.artist.name,
        id: album.artist.id,
      },
      tags: album.tags,
      description: album.description,
      // playCount: playlist.playCount,
    }
    // this.tracks = playlist.tracks.map(
    //   ({ name, dt, ar, al }) => { name, dt, { arname: ar.name, arid: ar.id }, { alname: al.name, alid: al.id } })
    this.tracks = songs.map(
      ({ id, name, dt, ar, al }) => {
        let artist = ar.map(({ name, id }) => {
          return { arname: name, arid: id }
        });
        let album = { alname: al.name, alid: al.id }

        return { id, name, dt, artist, album }
      }
    )

    // this.subscriber = playlist.subscribers.map(({ avatarUrl, userId }) => {
    //   return { avatarUrl, userId }
    // })
  }
}