<template>

        <el-card style="position: relative;">
            <bread-crumb slot="header">
                <template slot="title">账户信息</template>

            </bread-crumb>
            <el-upload
                class="upload-img"
                action=""
                :show-file-list="false">
                <img src="../../assets/img/404.png" alt="">
            </el-upload>
            <!-- //form表单 -->
            <el-form label-width="100px">
                <el-form-item label="用户名" style="width:400px;">
                    <el-input ></el-input>

                </el-form-item >
                    <el-form-item label="简介" style="width:400px;">
                        <el-input ></el-input>

                </el-form-item >
                    <el-form-item label="邮箱" style="width:400px;">
                        <el-input ></el-input>

                </el-form-item >
                    <el-form-item label="手机号" style="width:400px;">
                        <el-input  ></el-input>

                </el-form-item >
                    <el-form-item >
                        <el-button type="primary">保存信息</el-button>

                </el-form-item>
            </el-form>

        </el-card>

</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.upload-img{

    position: absolute;
    right: 300px;

    img{
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
}

</style>
