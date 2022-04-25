<template>
  <b-header />
  <b-footer />
  <el-card class="v-login">
    <template #header>后台管理系统</template>
    <el-form
      class="b-form"
      ref="form"
      label-position="right"
      label-width="90px"
      :model="cForm.model"
      :rules="cForm.rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          size="big"
          v-model="cForm.model.username"
          @keyup.enter="submit"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          size="big"
          v-model="cForm.model.password"
          @keyup.enter="submit"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="big" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
