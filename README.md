# cloud-music

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 前端优化
1、网站中大量运用了表格table，并且table中有元素i，划过会触发回流，为了减少table的回流次数，给table设置table-layout为auto或fixed，可以让table一行一行渲染，限制回流影响范围。

2、轮播图：给图片加上translate，这样就能够建立一个新图层。

3、进度条：与轮播图同理，将频繁运行的动画变为图层，图层能够阻止该节点回流影响别的元素。比如将进度条在组件中的位置设置为fixed。

4、回到顶部：同理设置为fixed。