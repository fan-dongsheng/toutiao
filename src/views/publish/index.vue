<template>
    <el-card >
        <!-- //表头 -->
        <bread-crumb slot="header">
        <template slot="title">发表文章</template>
        </bread-crumb>
        <!-- 表单数据内容 -->
        <el-form label-width="80px">
            <el-form-item label="标题" >
                <el-input placeholder="文章名称"></el-input>
            </el-form-item>
             <el-form-item label="内容" >
                <el-input type="textarea" ></el-input>
            </el-form-item>
            <el-form-item label="封面">
                <el-radio-group >
                    <el-radio :label="3">单图</el-radio>
                    <el-radio :label="6">三图</el-radio>
                    <el-radio :label="9">无图</el-radio>
                    <el-radio :label="1">自动</el-radio>
                </el-radio-group>
            </el-form-item>
           <el-form-item label="频道:">
               <el-select></el-select>
           </el-form-item>
           <el-form-item>
                <el-button type="primary">发布</el-button>
                <el-button>存入草稿</el-button>
           </el-form-item>

        </el-form>

    </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
