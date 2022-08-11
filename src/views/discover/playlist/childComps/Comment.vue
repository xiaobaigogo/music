<template>
  <div>
    <header>
      <h5>评论（共{{total}}条）</h5>
    </header>
    <virtual-list :listData="commentList" :total="total" :estimatedItemSize="50" height="900px" :pullDownload="true"
      @pullDownload="pullDownload">
      <template v-slot:vl-item="{user, content, id, timeStr, likedCount, liked}">
        <li id="user">
          <div id="left">
            <img :src="user.picUrl" alt="">
          </div>
          <div id="center">
            <span id="nickname">{{user.nickname}}</span>
            <p id="content">{{content}}</p>
            <span id="time">{{timeStr}}</span>
          </div>
          <div id="right">
            <div id="like" :class="{liked: liked}"><i></i><span>{{likedCount}}</span></div>
          </div>
        </li>
      </template>
    
    </virtual-list>
  </div>
</template>

<script>
  import VirtualList from "@/components/common/virtuallist/VirtualList.vue";

  import { getListComment } from "@/network/api.js";

  export default {
    name: "",
    components: {
      VirtualList
    },
    props: {
      id: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        limit: 30,
        page: 1,
        commentList: [],
        hotComments: [],
        total: 0,
      }
    },
    methods: {
      pullDownload(end) {
        if (end >= this.total) {
          return;
        }
        this.page += 1;
        getListComment(this.id, (this.page - 1) * this.limit, this.limit).then((res) => {
          if (res.code === 200) {
            let tmp = res.comments.map((item) => {
              let user = (({ userId, avatarUrl, nickname }) => { return { userId, picUrl: avatarUrl, nickname } })(item.user);
              return { user, id: item.commentId, content: item.content, time: item.time, timeStr: item.timeStr, likedCount: item.likedCount, liked: item.liked }
            });
            this.commentList.push(...tmp);
            // console.log(this.commentList)
          }
        }).catch((err) => err)
      }
    },
    created() {
      getListComment(this.id, (this.page - 1) * this.limit, this.limit).then((res) => {
        // console.log(res);
        if (res.code === 200) {
          this.total = res.total;
          console.log(res.comments)
          this.commentList = res.comments.map((item) => {
            let user = (({ userId, avatarUrl, nickname }) => { return { userId, picUrl: avatarUrl, nickname } })(item.user);
            return { user, id: item.commentId, content: item.content, time: item.time, timeStr: item.timeStr, likedCount: item.likedCount, liked: item.liked }
          });
          this.hotComments = res.hotComments.map((item) => {
            let user = (({ userId, avatarUrl, nickname }) => { return { userId, picUrl: avatarUrl, nickname } })(item.user);
            return { user, id: item.commentId, content: item.content, time: item.time, timeStr: item.timeStr, likedCount: item.likedCount, liked: item.liked }
          });
        }
      }).catch((err) => err)
    },
    mounted() {

    }
  }
</script>

<style scoped>
  header {
    margin-top: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #eee;
  }

  header h5 {
    color: #000;
    font-weight: 700;
    font-size: 18px;
  }

  #user {
    display: flex;
    width: 100%;
  }

  #user #left {
    flex-basis: 50px;
    margin: auto 0;
    margin-right: 20px;
    width: 50px;
    height: 50px;
  }

  #user #left img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  #user #center #nickname {
    color: #000;
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 10px;
  }

  #user #center #time {
    color: rgb(99, 98, 98);
    font-size: 10px;
  }

  #user #right {
    color: rgb(99, 98, 98);
    font-size: 10px;
    margin-left: auto;
    flex-basis: 50px;
    flex-shrink: 0;
    text-align: center;
    align-items: center;
  }

  #user #right #like {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #user #right i {
    display: inline-block;
    background: url(~assets/images/playbar.png) no-repeat;
    width: 30px;
    height: 30px;
    background-size: 400%;
    /* background-position: -90px -165px; */
    background-position: -43px -391px;
  }

  #user #right #like.liked {
    color: red;
  }

  #user #right #like.liked i {
    background-position: -43px -414px;
  }
</style>