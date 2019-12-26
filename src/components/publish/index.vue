<template>
  <div class="coverimg">
      <div class="coveritem" v-for="(item,index) in list" :key="index">

          <img src="../../assets/img/pic_bg.png" alt="">

      </div>
  </div>
</template>

<script>
export default {
  // 父传子,传给谁,在谁的标签上加属性
  // 用props 接收父传过来的list;
  props: ['list']

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
