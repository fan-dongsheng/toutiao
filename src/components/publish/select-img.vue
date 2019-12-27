<template>
  <div >
    <el-tabs v-model="activeName" >
      <el-tab-pane label="素材库" name="materical">
          <!-- 图片预览 -->
        <div  class="select-img">
          <el-card class="tabs-img" v-for="item in list" :key="item.id">
            <img @click="clickImg(item.url)" :src="item.url" alt />
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
    // 图片预览传递到coverimg
    clickImg (url) {
      // 接收到url就要传到父元素,谁传递就在谁的标签上写事件监听;
      // 在父元素的子标签上添加监听事件,再接收一下;
      // 传过去url值之后,需要绑定在images上,但它是一个由父元素传来的list数组,不能绑定,所以再传一次给coverimg祖父元素;
      // 由于images是一个数组,不知道传给那个index,所以下标也要传过去,下标通过点击弹层传;open
      // 传index需要在data定义一个变量接收一下,便于赋值;
      // images传过去地址,不能直接赋值给数组,vue响应规则,需用map创新数组
      this.$emit('tranImg', url)
    },
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
