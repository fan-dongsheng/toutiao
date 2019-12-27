<template>
  <div class="coverimg">
      <div class="coveritem" v-for="(item,index) in list" :key="index">
          <!-- //地址为动态的 -->
          <img :src="item?item :defaultImg" alt="">

      </div>
  </div>
</template>

<script>
export default {
  // 父传子,传给谁,在谁的标签上加属性
  // 用props 接收父传过来的list;
  props: ['list'],
  defaultImg: require('../../assets/img/pic_bg.png')

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
