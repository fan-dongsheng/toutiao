<template>
<!-- //页面布局,分为左右两部分,页面再分为上下两部分 -->
<el-container class="home-container">
    <!-- 侧边栏部分 -->
    <el-aside  class="home-aside" width="230px">
      <layout-side/>
    </el-aside>

    <!-- 主内容部分,这个contaiter是main容器,分为上下两部分 -->

    <el-container>
        <!-- 头部区域 -->
    <el-header>
        <layout-header/>
    </el-header>
    <el-main>Main</el-main>
  </el-container>

</el-container>

</template>

<script>
// 引入侧边栏
import layoutAside from '../../components/home/layout-side'
// 引入main内容的header
import layoutHeader from '../../components/home/layout-header'
export default {
  components: {
    'layout-side': layoutAside,
    'layout-header': layoutHeader
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
