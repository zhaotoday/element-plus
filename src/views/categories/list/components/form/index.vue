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
      <el-form-item label="商品分类名称" prop="name">
        <el-input v-model.trim="cForm.model.name" />
      </el-form-item>
      <el-form-item label="商品分类图片" prop="imageFileId">
        <c-upload
          :key="`${cForm.id}:imageFileId`"
          :cos-config="{
            cosApi: tencentCloudCosApi,
            filesApi,
            uploadTo: UploadTo.TencentCloudOss,
            region: 'ap-shanghai',
            bucket: 'test-1251051722',
          }"
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
