<template>
  <el-form ref="form" :model="cForm.model" :rules="cForm.rules">
    <el-form-item prop="content">
      <div style="position: relative; z-index: 2">
        <c-editor
          :key="`${currentPath}:editor`"
          style="height: 650px"
          v-model:value="cForm.model.content"
          @change="form.validateField('content')"
        />
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script src="./script.js"></script>
