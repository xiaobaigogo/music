import HomeView from 'views/HomeView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/toplist/detail',
    name: 'toplist',
    component: () => import(/* webpackChunkName: "about" */ 'views/discover/toplist/TopList.vue')
  },
  {
    path: '/discover/playlist',
    name: 'playlist',
    component: () => import(/* webpackChunkName: "about" */ 'views/discover/playlist/PlayList.vue')
  },
  {
    path: '/discover/artist',
    name: 'artist',
    component: () => import(/* webpackChunkName: "about" */ 'views/discover/artist/Artist.vue')
  },
  {
    path: '/album/detail',
    name: 'album',
    component: () => import(/* webpackChunkName: "about" */ 'views/discover/album/AlbumDetail.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ 'views/login/Login.vue')
  },
  {
    path: '/artist',
    name: 'artistDetail',
    component: () => import('views/discover/artist/ArtistsDetail.vue')
  },
  {
    path: '/playlist/detail',
    name: 'playListDetail',
    component: () => import('views/discover/playlist/PlayListDetail.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ 'views/search/Search.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ 'views/user/User.vue')
  },
  // {
  //   path: '/discover/toplist',
  //   name: 'toplist',
  //   component: () => import(/* webpackChunkName: "about" */ 'views/AboutView.vue')
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

export default routes