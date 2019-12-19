<template>
<!-- //页面布局,分为左右两部分,页面再分为上下两部分 -->
<el-container class="home-container">
    <el-aside width="230px">Aside</el-aside>
    <!-- //这个contaiter是main容器,分为上下两部分 -->
    <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>

</el-container>

</template>

<script>
export default {

}
</script>

<style lang="less">
        .home-container{
            height: 100vh;
        }

</style>
