<template>

        <el-card style="position: relative;">
            <bread-crumb slot="header">
                <template slot="title">账户信息</template>

            </bread-crumb>
            <!-- 上传图片 -->
            <el-upload
                class="upload-img"
                action=""
                :show-file-list="false">
                <img :src="formData.photo ?formData.photo :defaultImg " alt="">
            </el-upload>
            <!-- //form表单 -->
            <el-form ref="myForm" label-width="100px" :model="formData" :rules="rules">
                <el-form-item prop="name" label="用户名" style="width:400px;">
                    <el-input v-model="formData.name"></el-input>

                </el-form-item >
                    <el-form-item  label="简介" style="width:400px;">
                        <el-input v-model="formData.intro"></el-input>

                </el-form-item >
                    <el-form-item prop="email" label="邮箱" style="width:400px;">
                        <el-input v-model="formData.email"></el-input>

                </el-form-item >
                    <el-form-item  label="手机号" style="width:400px;">
                        <el-input v-model="formData.mobile" disabled ></el-input>

                </el-form-item >

                    <el-form-item >
                        <el-button type="primary" @click="refInfo">保存信息</el-button>

                </el-form-item>
            </el-form>

        </el-card>

</template>

<script>

export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '', // 简介
        photo: '',
        email: '',
        mobile: ''

      },
      // 默认图片地址;
      defaultImg: require('../../assets/img/404.png'),
      // 校验数据;
      rules: {
        name: [{ required: true, message: '请输入用户名' }, { min: 1, max: 7, message: '用户名的长度为1-7' }],
        email: [{ required: true, message: '请输入email邮箱' },
          { pattern: /^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/, mseeage: '邮箱格式不正确' }]

      }
    }
  },
  methods: {
    // 手动校验整个表单;
    refInfo () {
      this.$refs.myForm.validate(
        (isOk) => {
          if (isOk) {
          // 校验成功调用接口;
            this.$axios({
              url: '/user/profile',
              method: 'patch',
              data: this.formData
            }).then(() => {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
            })
          }
        })
    },
    // 获取用户个人信息;
    async getUser () {
      let res = await this.$axios({
        url: '/user/profile'
      })
      this.formData = res.data
    }
  },
  created () {
    this.getUser()
  }

}
</script>

<style lang="less" scoped>
.upload-img{

    position: absolute;
    right: 300px;

    img{
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
}

</style>
