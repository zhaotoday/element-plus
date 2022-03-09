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
      <el-form-item label="版本号" prop="versionName">
        <el-input v-model.trim="cForm.model.versionName" />
      </el-form-item>
      <el-form-item label="版本代码" prop="versionCode">
        <el-input v-model.trim="cForm.model.versionCode" />
      </el-form-item>
      <el-form-item label="更新日志" prop="logo">
        <el-input type="textarea" :rows="5" v-model.trim="cForm.model.log" />
      </el-form-item>
      <el-form-item label="应用文件" prop="fileId">
        <c-upload
          :key="`${cForm.id}:fileId`"
          v-model:value="cForm.model.fileId"
          @change="validateField('fileId')"
        />
      </el-form-item>
      <el-form-item label="状态">
        <c-enum-select
          class="c-select--full"
          placeholder="请选择年段"
          :items="enums.PublishStatus"
          v-model:value="cForm.model.status"
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
