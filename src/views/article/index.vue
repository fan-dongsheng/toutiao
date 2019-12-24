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
                <el-radio-group v-model="formData.status" :span='18'>

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
                <el-select v-model="formData.channel_id" placeholder="请选择">
                    <el-option
                    v-for="item in channels"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-col>

        </el-row>
        <el-row class="searchTool">
             <el-col :span="2">
                 <span >时间选择</span>
             </el-col>
            <el-col :span="18">
                    <el-date-picker
                        v-model="formData.dateRange"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>

        </el-row>

    </el-card>

</template>

<script>
export default {
  data () {
    return {
      formData: {
        // 文章状态
        status: 5,
        channel_id: '',
        dateRange: [] // 这是日期的空数组;

      },
      // 定义一个频道空数组,勇于接受数据
      channels: []
    }
  },
  methods: {
    // 频道列表
    getChannel () {
      this.$axios({
        url: '/channels'

      }).then(res => {
        this.channels = res.data.channels
      })
    }

  },
  created () {
    this.getChannel()
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

</style>
