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
      label-width="80px"
    >
      <el-form-item label="广告标题" prop="title">
        <el-input v-model.trim="cForm.model.title" />
      </el-form-item>
      <el-form-item label="广告图片" prop="imageFileId">
        <c-upload
          :key="`${cForm.id}:imageFileId`"
          v-model:value="cForm.model.imageFileId"
          @change="validateField('imageFileId')"
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
