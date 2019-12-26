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
                <quill-editor v-model="formData.content" type="textarea" style="height:300px;" ></quill-editor>
            </el-form-item>
            <el-form-item prop="type" label="封面" style="margin-top:100px;">
                <el-radio-group v-model="formData.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                </el-radio-group>
                <cover-img :list="formData.cover.images"></cover-img>
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
               <!-- //click 不传参数默认为undefined ,undefined进去方法后为false -->
                <el-button @click="publishArtical()" type="primary">发布</el-button>
                <el-button @click="publishArtical(true)">存入草稿</el-button>
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
  // 监听路由的变化,因为路由相同的时候,会复用组件;需要监听改变;
  // params是to的参数,根据参数来控制,路由变化;有参数,就使用参数,没有就使用空参数
  // Object.keys 将对象的键转为数组,判断参数的个数
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        // 有参数=>进行响应修改
        this.getArticalById(to.params.articleId)
      } else {
        // 没参数=>发布
        this.formData = {
          title: '', // 文章标题
          content: '', // 文章内容
          cover: {
            type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
            images: []
          },
          channel_id: null // 频道id
        }
      }
    },
    // watch监听 封面的变化 images, 需要监听type,通过type的变化来确定images的变化
    'formData.cover.type': function () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    }

  },
  methods: {
    // 修改文章,获取id的方法;
    // 修改文章思路: 1.点击修改之后,通过router.params获取id,如果有id就去修改,没有就是发布;
    // 2.自调用获取id的方法,通过回调函数,赋值给formData数据就可以
    // 3.获取完指定文章数据之后就需要,调用接口,点击发布,但是发布按钮和修改是同一个方法,
    // 所以需要修改方法,判断id有就修改,没有就发布
    getArticalById (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(res => {
        this.formData = res.data
      })
    },
    // 手动校验方法;
    publishArtical (draft) {
      // 通过ref获取form实例;
      this.$refs.publishRef.validate((isOk) => {
        // 在这里就需要分成两个接口一个修改,一个发布;
        if (isOk) {
          console.log('校验成功')
          // 校验成功就调用请求接口;
          // 先把获取的id拿过来,用来判断;
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft: draft },
            data: this.formData
          }).then(res => {
            this.$router.push('/home/articles')
          })

        //   this.$axios({
        //     url: '/articles',
        //     method: 'post',
        //     // 改进参数, 用 点击事件方法传参,过来,草稿默认为true,发表为false
        //     params: { draft: draft },
        //     data: this.formData
        //   }).then(() => {
        //     this.$router.push('articles')
        //   })
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
    this.getChannels() // 获取频道列表
    let { articleId } = this.$route.params // 用解构赋值,获取id;
    // 判断如果有id就修改,没有就发布;
    articleId && this.getArticalById(articleId)
  }

}
</script>

<style lang="less" scoped>

</style>
