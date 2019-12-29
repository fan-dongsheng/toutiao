<template>
  <div class="coverimg">
      <div @click="openDialog(index)" class="coveritem" v-for="(item,index) in list" :key="index">
          <!-- //地址为动态的 -->
          <img :src="item?item :defaultImg" alt="">
      </div>
       <!-- 这里是一个弹层,用来点击弹出素材框 ,弹层是给body 加的-->
          <el-dialog :visible="dialogVisible" @close="closeDialog">
              <!-- 用一个组件显示图片素材 -->

              <select-img @tranImg="receiveImg"></select-img>
          </el-dialog>
  </div>
</template>

<script>
export default {
  // 父传子,传给谁,在谁的标签上加属性
  // 用props 接收父传过来的list;
  props: ['list'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      indexTrans: -1 // 发布文章图片预览需要传的下标
    }
  },
  methods: {
    // 接收子元素传来的url;
    receiveImg (url) {
      this.$emit('transGrand', url, this.indexTrans) // 继续传值给祖父元素;
      // 传递完事之后要,关闭弹层;
      this.closeDialog()
    },
    // 图片素材弹层点击;
    openDialog (index) {
      this.dialogVisible = true
      this.indexTrans = index
    },
    closeDialog () {
      this.dialogVisible = false
    }
  }

}
</script>
<style lang="less" scoped>
.coverimg{
    display: flex;
    margin-top: 30px;
    .coveritem{
        width: 240px;
        height: 240px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        padding: 5px;
        margin: 5px;
        img{
            width: 100%;
            height: 100%;
        }

    }
}

</style>
