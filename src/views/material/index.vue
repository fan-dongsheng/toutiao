<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">素材管理</template>
        </bread-crumb>
           <el-tabs v-model="activeName" @tab-click="changeActive">

                <el-tab-pane label="全部素材" name="all">
                     <div class="imgAll">

                 <el-card  :body-style="{ padding: '0px' }" v-for="item in list" :key="item.id" class="img-card">
                     <img :src="item.url" alt="">
                    <div style="" class="bottom ">

                            <i class="el-icon-star-on bottom-l"></i>

                        <i class="el-icon-delete-solid bottom-i" ></i>

                    </div>
                </el-card>
                 </div>
                </el-tab-pane>
                <el-tab-pane label="收藏素材" name="collect" >
                     <div class="imgAll">

                 <el-card  :body-style="{ padding: '0px' }" v-for="item in list" :key="item.id" class="img-card">
                     <img :src="item.url" alt="">
                    <!-- <div style="" class="bottom ">

                            <i class="el-icon-star-on bottom-l"></i>

                        <i class="el-icon-delete-solid bottom-i" ></i>

                    </div> -->
                </el-card>
            </div>
                </el-tab-pane>

            </el-tabs>

    </el-card>
</template>

<script>
export default {

  data () {
    return {
      // 激活选中name,c-model 双向绑定
      activeName: 'all',
      list: []
    }
  },
  methods: {
    // tabs方法,获取切换tab实例;
    changeActive () {
      this.getMaterial()
    },
    // 获取图片
    getMaterial () {
      this.$axios({
        url: '/user/images',
        // collect改成动态的,
        params: { collect: this.activeName === 'collect' }

      }).then(res => {
        this.list = res.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }

}
</script>

<style lang="less" scoped>
.imgAll{
    display: flex;
    flex-wrap: wrap;
    .img-card {
        width: 200px;
        height: 240px;
        margin: 20px 20px;

        img {
            width: 100%;
            height: 200px;

        }
        .bottom{
            font-size: 20px;
            background: #f4f5f6;
            width: 100%;

            padding: 10px 10px 3px 10px;
            overflow: hidden;
            .bottom-l{
                 float: left;
                margin-left: 10px;
            }

            .bottom-i{
                float: right;
                margin-right: 10px;
            }

        }
    }
}
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

</style>
