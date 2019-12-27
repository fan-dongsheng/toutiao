<template>
  <div >
    <el-tabs v-model="activeName" >
      <el-tab-pane label="素材库" name="materical">
          <!-- 图片预览 -->
        <div  class="select-img">
          <el-card class="tabs-img" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
        <!-- //分页 -->
        <div class="pagination">
              <el-pagination
                    @current-change="changePage"
                    class="pagination-foot"
                    background
                    layout="prev, pager, next"
                    :current-page="page.currentPage"
                    :page-size="page.pageSize"
                    :total="page.total">
                </el-pagination>
        </div>

      </el-tab-pane>
      <el-tab-pane label="上传图片" name="upload"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'materical',

      list: [], // 接收图片空数组;
      page: {
        total: 100, // 总页数
        pageSize: 8, // 每页显示数
        currentPage: 1 // 当前页
      }
    }
  },
  methods: {
    // 监听分页
    changePage (newPage) {
      this.page.currentPage = newPage // newpage是分页监听的一个回调参数
      this.getAllImages()
    },

    // 获取所有图片数据
    getAllImages () {
      this.$axios({
        url: '/user/images',
        params: { collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }

      }).then(res => {
        this.list = res.data.results
        this.page.total = res.data.total_count
      })
    }
  },
  created () {
    this.getAllImages()
  }
}
</script>

<style lang='less' scoped>
.select-img {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

  .tabs-img {
    margin: 5px;
    width: 130px;
    height: 130px;
    img{
    width: 100%;
    height: 100%;
    }

  }
}
.pagination{
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

}
</style>
