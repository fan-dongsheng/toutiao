<template>
    <el-card >
        <!-- //表头 -->
        <bread-crumb slot="header">
        <template slot="title">发表文章</template>
        </bread-crumb>
        <!-- 表单数据内容,校验规则 rules -->
        <el-form ref="publishRef" :model="formData" :rules="rules" label-width="80px">
            <el-form-item  prop="title" label="标题" >
                <el-input v-model="formData.title" placeholder="文章名称" style="width:400px"></el-input>
            </el-form-item>
             <el-form-item prop="content" label="内容" >
                <el-input v-model="formData.content" type="textarea" ></el-input>
            </el-form-item>
            <el-form-item prop="type" label="封面">
                <el-radio-group v-model="formData.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
           <el-form-item prop="channel_id" label="频道:">

               <el-select v-model="formData.channel_id" >
                   <el-option
                        v-for="item in channels"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>

               </el-select>

           </el-form-item>
           <el-form-item>
                <el-button @click="publishArtical" type="primary">发布</el-button>
                <el-button @click="publishArtical">存入草稿</el-button>
           </el-form-item>

        </el-form>

    </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 频道列表
      channels: [],
      // 数据对象
      formData: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: null // 频道id

      },
      rules: {
        // 校验规则
        title: [{ required: true, message: '标题不能为空' }, { min: 5, max: 50, message: '输入范围为5--50' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道分类不能为空' }]

      }
    }
  },
  methods: {
    // 手动校验方法;
    publishArtical () {
      // 通过ref获取form实例;
      this.$refs.publishRef.validate(function (isOk) {
        if (isOk) {
          console.log('校验成功')
        }
      })
    },
    // 获取频道列表,得用created调用
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.channels = res.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }

}
</script>

<style lang="less" scoped>

</style>
