<template>
        <!-- 评论组件 -->
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">
               评论列表
            </template>
        </bread-crumb>
        <!-- 这里是一个table表格  -->
            <!-- :data="list" 是表格的方法返回数据,,根据prop属性,遍历数组; -->
        <el-table :data="list">
            <el-table-column prop="title" label="标题" width="500"></el-table-column>
            <el-table-column :formatter='formatterCont' prop="cnommet_status" label="评论状态"></el-table-column>
            <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
            <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
            <el-table-column label="操作" >
              <!-- //这里使用作用于插槽取数据; 通过slot-scoped-获取table的数据-->
              <template slot-scope="obj">
                <!-- //获取评论状太;是布尔值,需要判断 -->

                  <el-button size="small" type="text">修改</el-button>
                  <el-button size="small" type="text">{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
              </template>

            </el-table-column>

        </el-table>

    </el-card>
</template>

<script>
export default {
  data () {
    return {
      //
      list: []
    }
  },
  methods: {
    getComment () {
      // 掉接口get
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(res => {
        // 返回数据res中的 文章列表获取是一个数组;results
        this.list = res.data.results// 指挥显示标题内容,  评论状态是布尔值,需要用formatter 格式化内容
      })
    },
    formatterCont (row, column, cellValue, index) {
      // row 每行行数据  column 每列数据  cellvalue 当前单元格值  index 下标;
      // 判断当前的单元格值为;必须return
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }

}
</script>

<style>

</style>
