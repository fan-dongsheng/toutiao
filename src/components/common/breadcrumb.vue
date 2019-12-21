<template>
<!-- 面包屑组件封装 -->
  <el-breadcrumb separator=">">
  <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
  <el-breadcrumb-item>
      <!-- //数据是动态的,加一个插槽 -->
      <slot name="title"> </slot>

  </el-breadcrumb-item>

</el-breadcrumb>

</template>

<script>
export default {

}
</script>

<style>

</style>
