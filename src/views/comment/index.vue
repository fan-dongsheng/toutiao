<template>
        <!-- 评论组件 -->
    <el-card v-loading="loading">
        <bread-crumb slot="header">
            <template slot="title">
               评论列表
            </template>
        </bread-crumb>
        <!-- 这里是一个table表格  -->
            <!-- :data="list" 是表格的方法返回数据,,根据prop属性,遍历数组; -->
        <el-table :data="list">
            <el-table-column prop="title" label="标题" width="500"></el-table-column>
            <el-table-column :formatter='formatterCont' prop="comment_status" label="评论状态"></el-table-column>
            <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
            <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
            <el-table-column label="操作" >
              <!-- //这里使用作用于插槽取数据; 通过slot-scoped-获取table的数据-->
              <template slot-scope="obj">
                <!-- //获取评论状太;是布尔值,需要判断 -->

                  <el-button size="small" type="text">修改</el-button>
                  <el-button @click="openORclose(obj.row)" size="small" type="text">{{obj.row.comment_status?'关闭评论':'打开评论'}}</el-button>
              </template>

            </el-table-column>

        </el-table>
        <!-- //分页组件 -->
        <el-row  type="flex" justify="center" align="middle" style="height:80px">
          <el-pagination
          background

          layout="prev, pager, next" :total="page.total"  :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="changePage"
          >
        </el-pagination>
        </el-row>

    </el-card>
</template>

<script>
export default {
  data () {
    return {
      //
      list: [],
      page: {
        total: 0, // 默认总页数
        pageSize: 10, // 显示几页
        currentPage: 1 // 当前页数

      },
      loading: false
    }
  },
  methods: {
    // 分页改变
    changePage (newPage) {
      // newPage是当前的回调函数返回的当前页数

      this.page.currentPage = newPage

      this.getComment()
    },
    async getComment () {
      // 掉接口get
      this.loading = true
      let res = await this.$axios({
        url: '/articles',
        params: { response_type: 'comment', per_page: this.page.pageSize, page: this.page.currentPage }
      })
      // 返回数据res中的 文章列表获取是一个数组;results
      this.list = res.data.results// 指挥显示标题内容,  评论状态是布尔值,需要用formatter 格式化内容

      // 获取总页数
      this.page.total = res.data.total_count
      this.loading = false
    },
    // 获取评论数据
    formatterCont (row, column, cellValue, index) {
      // row 每行行数据  column 每列数据  cellvalue 当前单元格值  index 下标;
      // 判断当前的单元格值为;必须return
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭评论的方法,穿一个参数row,因为需要根据当前的状态去改变;
    async openORclose (row) {
      // 点击确认一下;确认
      let mess = row.comment_status ? '关闭' : '打开' // 状太
      await this.$confirm(`你确定要${mess}吗`)
      await this.$axios({
        method: 'put',
        url: '/comments/status',
        // .tostring 是json-bigint中id转换是一个对象,需要转成字符串;
        params: { article_id: row.id.toString() },
        // 这里是否需要传递参数,如果false就要打开成true
        data: { allow_comment: !row.comment_status }
      })
      // 传递成功之后;要弹出消息提示一下;
      this.$message({
        type: 'success',
        message: '操作成功'
      })
      this.getComment()
      // body 内容  需要传data里;query 参数,传到params
    }
  },
  created () {
    this.getComment()
  }

}
</script>

<style>

</style>
