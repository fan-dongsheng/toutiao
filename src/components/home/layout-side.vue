<template>
<div>
      <!-- 上部图标 -->
            <div class="home-aside-title">
                <img src="../../assets/img/logo_admin.png" alt="" style="height:30px">
            </div>
            <!-- 这是导航 -->
            <!-- menu的方法 router路由模式, :router='true' 或者router; 并在每个元素加index 作为 path 进行路由跳转-->
            <el-menu router background-color= "#323745" text-color="#adafb5"  active-text-color="#ffd04b" style="width:231px;">
                <el-menu-item index="/home" >首页</el-menu-item>
                    <el-submenu index="2">
                            <template slot="title">内容管理</template>
                            <el-menu-item index="/home/publish">发布文章</el-menu-item>
                            <el-menu-item index="/home/articles">内容列表</el-menu-item>
                            <el-menu-item index="/home/comment">评论列表</el-menu-item>
                            <el-menu-item index="/home/material">素材管理</el-menu-item>

                    </el-submenu>
                     <el-submenu index="3">
                            <template slot="title">粉丝管理</template>
                            <el-menu-item index="/home/picture">图文数据</el-menu-item>
                            <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
                            <el-menu-item index="/home/fanslife">粉丝画像</el-menu-item>
                            <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>

                    </el-submenu>
                    <el-menu-item index="4" >账户信息</el-menu-item>

            </el-menu>
            </div>
</template>

<script>
export default {

}
</script>

<style >
  .home-aside-title{
                    text-align: center;
                    padding: 10px 0;
                    background-color: #2e2f32;

                }

</style>
