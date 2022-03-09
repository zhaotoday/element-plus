<template>
  <el-dialog title="订单详情" v-model="cDialog.visible" width="550px">
    <el-form
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
      label-position="right"
      label-width="120px"
    >
      <el-form-item label="商品分类名称" prop="name">
        <el-input v-model.trim="cForm.model.name" />
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script src="./script.js"></script>
