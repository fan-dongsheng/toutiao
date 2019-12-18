<template>
<div class="login">
    <el-card class="login-card">
        <div class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </div>

        <el-form>

            <el-form-item style="margin-top:20px;">
                <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>

            <el-form-item >
                <el-input style="width:60%" placeholder="请输入验证码"></el-input>
                <el-button plain style="float:right">发送验证码</el-button>
            </el-form-item>
             <el-form-item >
            <el-checkbox>我已阅读并同意用户协议和条款</el-checkbox>
            </el-form-item >
            <el-form-item >
            <el-button type="primary" style="width:100%;">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>

</div>
</template>

<script>
export default {

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
