<template>
    <el-card class="article">
        <bread-crumb slot="header">
        <template slot="title">文章列表</template>
        </bread-crumb>

        <el-row class="searchTool" >
            <!-- col 栅格 控制列 -->
            <el-col :span='2'>
                <span >文章状态:</span>
            </el-col>
            <el-col :span="18">
                <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 -->
                <el-radio-group
                 @change="changeCondition"
                 v-model="formData.status"
                  :span='18'>

                <el-radio :label="5">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核成功</el-radio>
                <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
            </el-col>

            <!-- //单选组件 -->

        </el-row>

        <el-row class="searchTool">

            <el-col :span="2">
                 <span  >频道列表</span>
            </el-col>
            <el-col :span="18">
                <!-- //定义一个空数组,再调用接口获取数据,返回数据有name,id 设置id和name,
                数组遍历出来,设置一个空变量value,绑定到v-model,默认是空 -->
                <el-select
                @change="changeCondition"
                v-model="formData.channel_id"
                 placeholder="请选择">
                    <el-option

                    v-for="item in channels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-col>

        </el-row>
        <el-row  class="searchTool">
             <el-col :span="2">
                 <span >时间选择</span>
             </el-col>

            <el-col :span="18">
                    <el-date-picker
                    @change="changeCondition"
                    value-format="yyyy-MM-dd"
                        v-model="formData.dateRange"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>

        </el-row>
        <!-- 下部分文章内容 -->
        <el-row class="total">
            <span>共找到{{pageAll.total_count}}条符合的内容</span>

        </el-row>
        <!-- //item.id.toString 返回的id太大,需要bigjson转成字符串 -->
        <el-row v-for="item in list" :key="item.id.toString()" class="content" type="flex" justify="space-between">
            <el-col class="left" :span="14">

                <el-row class="write" type="flex">
                    <!-- //图片在cover数组中,有可能为空就会报错,所以要判断长度,为空就是默认的图片地址 -->
                    <img :src="item.cover.images.length ? item.cover.images[0]: defaultImg" alt="">
                    <div class="mater">
                        <span style="font-size:14px;">{{item.title}}</span>
                        <!-- 抵用过滤器处理数据 -->
                        <el-tag :type="item.status | filterType" class="tag" >{{item.status | filterStatus}}</el-tag>
                        <span style="color:#999">{{item.pubdate}}</span>
                    </div>

                </el-row>
            </el-col>
            <el-col class="right" :span="6">
                <el-row type="flex" justify="end" style="font-size:12px;">
                    <i class="el-icon-edit" @click="editArtical(item.id.toString())">修改</i>
                    <i class="el-icon-delete" @click="delArt(item.id.toString())">删除</i>
                </el-row>

            </el-col>
        </el-row>
        <!-- //分页 -->
        <el-row type="flex" justify="center">
            <el-pagination
              @current-change="changePage"
              background
              layout="prev, pager, next"
              :current-page="pageAll.page"
              :page-size="pageAll.per_page"
              :total="pageAll.total_count">
            </el-pagination>

        </el-row>

    </el-card>

</template>

<script>
import { getArtical, getChannel } from '../../action/articles'
export default {
  data () {
    return {
      // 分页
      pageAll: {
        total_count: 100, // 文章总数
        page: 1, // 当前页数
        per_page: 10 // 每页数量

      },
      formData: {
        // 文章状态
        status: 5,
        channel_id: null,
        dateRange: [] // 这是日期的空数组;

      },
      // 定义一个频道空数组,勇于接受数据
      channels: [],
      // 获取内容的list
      list: [],
      // 修改图片为默认
      defaultImg: require('../../assets/img/404.png')

    }
  },
  filters: {
    // 过滤器 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'

        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'dange'

        default:
          break
      }
    }
  },
  methods: {
    // 修改文章;跳转页面需要传id过来,这就需要用到动态路由,创建一个动态路由;
    editArtical (id) {
      this.$router.push(`/home/publish/${id}`)
    },
    // 删除只能删除草稿
    async delArt (id) {
      await this.$confirm('确定要删除吗?')
      await this.$axios({
        url: `/articles/${id}`,
        method: 'delete'
      })
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      // 删除数据没有改变页数,所以就调用刷新页数就可以
      this.getArticalCondition()
    },
    // 分页绑定,分页需要传2个参数,公用getArtical 就要封装一个方法,用于统一使用参数;
    changePage (newPage) {
      this.pageAll.page = newPage
      this.getArticalCondition()
    },
    // 文章筛选;
    changeCondition () {
      //, 筛选,设定一个参数,包含了搜索的所有参数
      // 筛选需要按照筛选的页数去执行所以从第一开始
      this.pageAll.page = 1
      this.getArticalCondition()
    },
    // 分页和文章筛选统一使用的参数;
    getArticalCondition () {
      let params = {
        page: this.pageAll.page,
        per_page: this.pageAll.per_page,
        // status为5 就得穿空null
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        // 开始时间,如果长度大于0传数组为[0]的时间,
        begin_pubdate: this.formData.dateRange.length ? this.formData.dateRange[0] : null,
        end_pubdate: this.formData.dateRange.length > 1 ? this.formData.dateRange[1] : null
      }
      // 调用获取接口
      this.getArtical(params)
    },

    // 获取内容;
    async getArtical (params) {
      let res = await getArtical(params)
      // let res = await this.$axios({
      //   url: '/articles',
      //   params
      // })
      this.list = res.data.results
      // 分页数据绑定个page
      this.pageAll.total_count = res.data.total_count
    },
    // 频道列表
    async getChannel () {
      let res = await getChannel()
      this.channels = res.data.channels
    }
    // 改装,封装起来
    // async getChannel () {
    //   let res = await this.$axios({
    //     url: '/channels'

    //   })
    //   this.channels = res.data.channels
    // }

  },
  created () {
    this.getChannel()
    this.getArtical()
  }

}

</script>

<style lang="less" scoped>
.article {
    .searchTool {
        height: 50px;
        padding-left: 30px;

    }
}
.total{
    height: 50px;
    margin: 30px 0 10px 0;
    border-bottom: 1px dashed #ccc;
}
.content {
    margin: 10px 0;
    border-bottom: 1px dashed #ccc;
    padding: 10px 0;
    .left {
        .write{
            img{
                width: 180px;
                height: 100px;
            }
            .mater{
                display: flex;
                flex-direction: column;
                margin-left: 10px;
                font-size: 12px;
                //两头撑开
                justify-content: space-between;
                .tag{
                    width: 60px;
                }
            }

        }
    }
    .right {

            .el-icon-edit{
                margin-right: 20px;
                 cursor: pointer;
            }
            .el-icon-delete{
                 cursor: pointer;
            }
    }
}

</style>
