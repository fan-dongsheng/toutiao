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

                <el-dropdown trigger="click" class="right-loginout"  @command="handleCommand">
                <span class="el-dropdown-link">
                    {{userInfo.name}}

                </span>
                <el-dropdown-menu slot="dropdown">
                    <!-- 这里是下拉菜单的指令方法,在每个标签添加command属性; -->
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>

                </el-dropdown-menu>
                </el-dropdown>

            </el-row>
         </el-col>
    </el-row>

</template>

<script>
import eventBus from '../../untils/eventBus'
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
    // 调用封装的用户个人而信息;
    this.getInfo()
    // 监听账户管理页面的修改,需要在实例创建后就监听;
    eventBus.$on('uploadSuccess', () => {
      // 这里就是监听数据成功之后,再刷新一遍;
      this.getInfo()
    })
  },
  methods: {
    // 获取用户个人信息封装;
    getInfo () {
    // 先获取令牌
    // 这里删除原因是 因为配置了axios 拦截功能,直接就携带了令牌;请求在config中;
    // let token = window.localStorage.getItem('user_token')

      this.$axios({
      // url,headers都是小写;

        url: '/user/profile'

        // 需要传请求头参数;
        // 这里删除原因是 因为配置了axios 拦截功能,直接就携带了令牌;请求在config中;
        // headers: {
        //   // 这里是一个请求头,需要将token令牌传入,Bearer 这个在后面有个空格
        //   Authorization: `Bearer ${token}`

      // }
      }).then(res => {
      // 返回的数据在data中,将userInfo赋值
      // 这里res.data 是拦截返回的是data,所以少用一个data
        this.userInfo = res.data
      })
    },
    // 用element组件 的 下拉指令,在下拉菜单添加方法指令
    handleCommand (command) {
      // 指令出发后要判断commond值;
      if (command === 'loginout') {
        // 退出,要删除token,跳转到login
        window.localStorage.removeItem('user_token')
        this.$router.push('/login')
      } else if (command === 'git') {
        // 跳转外部链接用herf
        window.location.href = 'https://github.com/fan-dongsheng/heimatoutiao'
      } else if (command === 'info') {
        this.$router.push('/home/account')
      }
    }
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
