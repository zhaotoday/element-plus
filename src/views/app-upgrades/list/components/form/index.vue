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
      label-width="100px"
    >
      <el-form-item label="平台" prop="platform">
        <c-enum-select
          class="c-select--full"
          placeholder="请选择平台"
          :items="enums.AppPlatform"
          v-model:value="cForm.model.platform"
        />
      </el-form-item>
      <el-form-item label="包类型" prop="packageType">
        <c-enum-select
          class="c-select--full"
          placeholder="请选择包类型"
          :items="enums.AppPackageType"
          v-model:value="cForm.model.packageType"
        />
      </el-form-item>
      <el-form-item label="版本名称" prop="versionName">
        <el-input v-model.trim="cForm.model.versionName" />
      </el-form-item>
      <el-form-item label="版本号" prop="versionCode">
        <el-input v-model.trim="cForm.model.versionCode" />
      </el-form-item>
      <el-form-item label="更新日志" prop="log">
        <el-input type="textarea" :rows="5" v-model="cForm.model.log" />
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
          placeholder="请选择状态"
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
