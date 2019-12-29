<template>
<!-- //页面布局,分为左右两部分,页面再分为上下两部分 -->
<el-container class="home-container">
    <!-- 侧边栏部分 -->
    <el-aside  class="home-aside" style="transition:all 0.3s" :width="flod?'61px':'231px'">
      <layout-side @flodChanges="changeFlod" />
    </el-aside>

    <!-- 主内容部分,这个contaiter是main容器,分为上下两部分 -->

    <el-container>
        <!-- 头部区域 -->
    <el-header>
        <layout-header/>
    </el-header>
    <!-- 内容区域 -->
    <el-main>
      <!-- 二级路由 -->
      <router-view></router-view>
      </el-main>
  </el-container>

</el-container>

</template>

<script>

// 这里在main.js中进行了全局注册组件, 所以几不需要了;
// 引入侧边栏
// import layoutAside from '../../components/home/layout-side'
// 引入main内容的header
// import layoutHeader from '../../components/home/layout-header'
export default {
  data () {
    return {
      flod: false
    }
  },
  components: {
    // 'layout-side': layoutAside,
    // 'layout-header': layoutHeader
  },
  methods: {
    changeFlod () {
      this.flod = !this.flod
    }
  }

}
</script>

<style lang="less" scoped>
        .home-container{
            height: 100vh;
            .home-aside{
                background-color: #323745;

            }

        }

</style>
