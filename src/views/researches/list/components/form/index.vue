<template>
  <el-dialog
    :title="cForm.id ? '编辑' : '新增'"
    v-model="cDialog.visible"
    width="900px"
  >
    <el-form
      ref="formRef"
      :model="cForm.model"
      :rules="cForm.rules"
      label-position="right"
      label-width="60px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="cForm.model.title" />
      </el-form-item>
      <el-form-item label="封面" prop="coverFileId">
        <c-upload
          :key="`${cForm.id}:coverFileId`"
          v-model:value="cForm.model.coverFileId"
          @change="validateField('coverFileId')"
        />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <c-editor
          style="height: 500px"
          v-model:value="cForm.model.content"
          @change="validateField('content')"
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
