<template>
  <el-dialog
    :title="cForm.id ? '编辑' : '新增'"
    v-model="cDialog.visible"
    width="900px"
  >
    <el-form
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
      label-position="right"
      label-width="80px"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model.trim="cForm.model.name" />
      </el-form-item>
      <el-form-item label="商品图片" prop="imageFileIds">
        <c-upload
          :key="`${cForm.id}:imageFileIds`"
          :cos-config="{
            cosApi: tencentCloudCosApi,
            filesApi,
            uploadTo: UploadTo.TencentCloudOss,
            region: 'ap-shanghai',
            bucket: 'test-1251051722',
          }"
          multiple
          v-model:value="cForm.model.imageFileIds"
          @change="validateField('imageFileIds')"
        />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input-number v-model="cForm.model.price" />
      </el-form-item>
      <el-form-item label="商品详情" prop="content">
        <c-editor
          :key="`${cForm.id}:content`"
          :cos-config="{
            cosApi: tencentCloudCosApi,
            filesApi,
            uploadTo: UploadTo.TencentCloudOss,
            region: 'ap-shanghai',
            bucket: 'test-1251051722',
          }"
          v-model:value="cForm.model.content"
          style="height: 400px"
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
