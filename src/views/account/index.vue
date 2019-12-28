<template>

        <el-card style="position: relative;">
            <bread-crumb slot="header">
                <template slot="title">账户信息</template>

            </bread-crumb>
            <el-upload
                class="upload-img"
                action=""
                :show-file-list="false">
                <img :src="formData.photo ?formData.photo :defaultImg " alt="">
            </el-upload>
            <!-- //form表单 -->
            <el-form label-width="100px" :model="formData">
                <el-form-item  label="用户名" style="width:400px;">
                    <el-input v-model="formData.name"></el-input>

                </el-form-item >
                    <el-form-item  label="简介" style="width:400px;">
                        <el-input v-model="formData.intro"></el-input>

                </el-form-item >
                    <el-form-item  label="邮箱" style="width:400px;">
                        <el-input v-model="formData.email"></el-input>

                </el-form-item >
                    <el-form-item  label="手机号" style="width:400px;">
                        <el-input v-model="formData.mobile" disabled ></el-input>

                </el-form-item >

                    <el-form-item >
                        <el-button type="primary">保存信息</el-button>

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
      defaultImg: require('../../assets/img/404.png')
    }
  },
  methods: {
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
