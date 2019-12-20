<template>

    <el-row type="flex" justify="space-between" class="layoutHeader" align="middle">
        <!-- 左部分 -->
        <el-col :span="7" class="left" type="flex" >
           <i class="el-icon-s-unfold"></i>
           <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <!-- 右部分 -->
         <el-col :span="4" class="right" >
            <el-row type="flex" align="middle" justify="end" class="right-img">
                <!-- 变量加上双冒号就可以直接使用data数据了 -->
                <!-- 这里的img由于是动态的,不会自动转成静态存储或者base64,就会报错 ,如果没有图片就要使用默认的;-->
                <!-- 解决方法就是,先在data方法中将图片编译完成,再传过来 -->
                <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="">
                <el-dropdown trigger="click" class="right-loginout">
                <span class="el-dropdown-link">
                    {{userInfo.name}}

                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >个人信息</el-dropdown-item>
                    <el-dropdown-item >git地址</el-dropdown-item>
                    <el-dropdown-item >退出</el-dropdown-item>

                </el-dropdown-menu>
                </el-dropdown>

            </el-row>
         </el-col>
    </el-row>

</template>

<script>
export default {
  // 获取用户的头像,用户名,用user/profile接口;
  // 需要给data一个数据用于接收 后端返回的数据 userInfo
  data () {
    return {
      userInfo: {
      },
      // 这里是将默认图片就行编译,如果返回数据中没有图片,就要使用默认,用于获取,用require转成变量
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  created () {
    // 先获取令牌
    let token = window.localStorage.getItem('user_token')

    this.$axios({
      // url,headers都是小写;

      url: '/user/profile',

      // 需要传请求头参数;
      headers: {
        // 这里是一个请求头,需要将token令牌传入,Bearer 这个在后面有个空格
        Authorization: `Bearer ${token}`

      }
    }).then(res => {
      // 返回的数据在data中,将userInfo赋值
      this.userInfo = res.data.data
    })
  }

}
</script>

<style lang="less" scoped>
.layoutHeader{
    height: 60px;
     .left{

         i{
             margin-right: 5px;

         }

     }
     .right{
         .right-img{

             img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
             }

         }
         .right-loginout{
             margin-left: 5px;
         }
     }
}

</style>
