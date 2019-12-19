<template>
<div class="login">
    <el-card class="login-card">
        <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>

        <el-form ref="myForm" :model="loginForm" :rules="loginRules">

            <el-form-item style="margin-top:20px;" prop="mobile">
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item prop="code">
                <el-input v-model="loginForm.code" style="width:60%" placeholder="请输入验证码"></el-input>
                <el-button  plain style="float:right">发送验证码</el-button>
            </el-form-item>
             <el-form-item prop="check">
            <el-checkbox v-model="loginForm.check">我已阅读并同意用户协议和条款</el-checkbox>
            </el-form-item >
            <el-form-item >
            <el-button @click="submitLogin" type="primary" style="width:100%;">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>

</div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [{
          // 第一个规则是必须输入手机号
          required: true, message: '请输入手机号'
        },
        {
          // 第二个规则是正则表达式,判断手机号
          pattern: /^1[3456789]\d{9}$/, message: '手机号格式不正确'

        }],
        code: [{
          required: true, message: '请输入验证码'
        },
        {
          pattern: /^\d{6}$/, message: '验证码格式不正确'
        }
        ],
        check: [{
          validator: function (rule, value, callback) {
            // value 是要校验的字段值
            if (value) {
              callback() // 通过就去执行回调
            } else {
              callback(new Error('必须勾选'))
            }
          }

        }]

      }
    }
  },
  methods: {
    // 手动校验,需要在e-form添加ref属性,然后添加方法
    submitLogin () {
      // 获取e-form 实例,validate是一个函数,有两个参数
      this.$refs.myForm.validate(function (isok) {
        if (isok) {
          console.log('前端校验成功,准备调用接口,传到后端')
        } else {

        }
      })
    }
  }

}
</script>

<style lang="less">
    .login{
        background: url('../../assets/img/login_bg.jpg');
        background-size: cover;  //自适应宽高
        height : 100vh;
        // box-sizing: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-card{

            width: 440px;
            height: 350px;
            .title{
                    text-align: center;
                img{
                    height: 40px;
                }

            }

        }
    }

</style>
