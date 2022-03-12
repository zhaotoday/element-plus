<template>
  <el-dialog
    :title="cForm.id ? '编辑' : '新增'"
    v-model="cDialog.visible"
    width="550px"
  >
    <el-form
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
      label-position="right"
      label-width="120px"
    >
      <el-form-item label="商品分类英文名称" prop="name">
        <el-input v-model.trim="cForm.model.name" />
      </el-form-item>
      <el-form-item label="商品分类中文名称" prop="cnName">
        <el-input v-model.trim="cForm.model.cnName" />
      </el-form-item>
      <el-form-item label="商品分类图标" prop="iconFileId">
        <c-upload
          :key="`${cForm.id}:iconFileId`"
          :data="{
            dir: 'categories',
          }"
          v-model:value="cForm.model.iconFileId"
          @change="validateField('iconFileId')"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="cDialog.visible = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script src="./script.js"></script>
