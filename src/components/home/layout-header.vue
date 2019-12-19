<template>

    <el-row type="flex" justify="space-between" class="layoutHeader" align="middle">
        <!-- 左部分 -->
        <el-col :span="7" class="left" type="flex" >
           <i class="el-icon-s-unfold"></i>
           <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <!-- 右部分 -->
         <el-col :span="4" class="right" >
            <el-row type="flex" align="middle" justify="end" class="right-img">

                <img src="../../assets/img/avatar.jpg" alt="">
                <el-dropdown trigger="click" class="right-loginout">
                <span class="el-dropdown-link">
                    不一样的烟火

                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item >个人信息</el-dropdown-item>
                    <el-dropdown-item >git地址</el-dropdown-item>
                    <el-dropdown-item >退出</el-dropdown-item>

                </el-dropdown-menu>
                </el-dropdown>

            </el-row>
         </el-col>
    </el-row>

</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layoutHeader{
    height: 60px;
     .left{

         i{
             margin-right: 5px;

         }

     }
     .right{
         .right-img{

             img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
             }

         }
         .right-loginout{
             margin-left: 5px;
         }
     }
}

</style>
