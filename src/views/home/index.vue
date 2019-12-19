<template>
<!-- //页面布局,分为左右两部分,页面再分为上下两部分 -->
<el-container class="home-container">
    <!-- 侧边栏部分 -->
    <el-aside  class="home-aside" width="230px">
      <layout-side/>

    </el-aside>
    <!-- 主内容部分,这个contaiter是main容器,分为上下两部分 -->
    <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>

</el-container>

</template>

<script>
import layoutAside from '../../components/home/layout-side'
export default {
  components: {
    'layout-side': layoutAside
  }

}
</script>

<style lang="less">
        .home-container{
            height: 100vh;
            .home-aside{
                background-color: #323745;
                .home-aside-title{
                    text-align: center;
                    padding: 10px 0;
                    background-color: #2e2f32;
                    img{
                        height: 30px;

                    }
                }
            }

        }

</style>
