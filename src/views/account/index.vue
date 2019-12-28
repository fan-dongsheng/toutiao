<template>

        <el-card style="position: relative;">
            <bread-crumb slot="header">
                <template slot="title">账户信息</template>

            </bread-crumb>
            <!-- 上传图片 -->
            <el-upload
                :http-request="uploadImg"
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
import eventBus from '../../untils/eventBus'

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
    // 上传图片;params这是上传自己会返回的一个参数,里面有file;
    // 上传的是file文件,它是formdata类型的 ,需要new一个formdata对象;
    uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data: data
      }).then(res => {
        this.formData.photo = res.data.photo
        eventBus.$emit('uploadSuccess') // 触发事件,监听图片
      })
    },
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
              // 保存完成,需要传递给头部个人信息;这就需要监听事件,用eventBus,创建公共实例,再引入,
              // 触发事件$emit('随意值event',)   监听事件$on("event",function)
              // 在监听页面需要在created之后就创建,
              eventBus.$emit('uploadSuccess') // 触发事件
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
