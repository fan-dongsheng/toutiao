<template>
<div>
      <!-- 上部图标 -->
            <div class="home-aside-title">
                <img :src="flod?smallImg:bigImg" alt="" style="height:30px">
            </div>
            <!-- 这是导航 -->
            <!-- menu的方法 router路由模式, :router='true' 或者router; 并在每个元素加index 作为 path 进行路由跳转-->
            <!-- 菜单栏 显示隐藏 collapse -->
            <el-menu router background-color= "#323745" text-color="#adafb5"  active-text-color="#ffd04b"

                    :collapse="flod"
                    style="border-right:0;"
                    :style="width=flod?'60px':'230px'"
                    >
                <el-menu-item index="/home" >
                    <template>
                        <i class="el-icon-s-home"></i>
                        <span>首页 </span>
                    </template>
                </el-menu-item>
                    <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-s-order"></i>
                                <span>内容管理 </span>

                                </template>
                            <el-menu-item index="/home/publish">发布文章</el-menu-item>
                            <el-menu-item index="/home/articles">内容列表</el-menu-item>
                            <el-menu-item index="/home/comment">评论列表</el-menu-item>
                            <el-menu-item index="/home/material">素材管理</el-menu-item>

                    </el-submenu>
                     <el-submenu index="3">
                            <template slot="title">
                                 <i class="el-icon-s-flag"></i>
                                <span>粉丝管理 </span>

                                </template>
                            <el-menu-item index="/home/picture">图文数据</el-menu-item>
                            <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
                            <el-menu-item index="/home/fanslife">粉丝画像</el-menu-item>
                            <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>

                    </el-submenu>
                    <el-menu-item index="/home/account" >
                     <i class="el-icon-s-custom"></i>
                        <span>账户信息 </span>

                    </el-menu-item>

            </el-menu>
            </div>
</template>

<script>
import eventBus from '../../untils/eventBus'
export default {
  data () {
    return {
      // 侧边栏,数据
      flod: false,
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')

    }
  },
  created () {
    // 监听侧边栏布尔值改变;
    eventBus.$on('flodChange', () => {
      this.flod = !this.flod
      // 监听flod变化,然后将事件传递给父元素的home侧边栏,改变其宽度;
      this.$emit('flodChanges')
    })
  }

}
</script>

<style >
  .home-aside-title{
                    text-align: center;
                    padding: 10px 0;
                    background-color: #2e2f32;

                }

</style>
