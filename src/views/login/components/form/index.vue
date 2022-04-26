<template>
  <div class="b-form__wrap u-shadow u-br2">
    <div class="b-form__title">管理员登录</div>
    <el-form
      class="b-form"
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
    >
      <el-form-item prop="username">
        <el-input
          size="large"
          v-model="cForm.model.username"
          @keyup.enter="submit"
        >
          <template #prefix>
            <i
              class="c-iconfont c-iconfont--user-filled fs16"
              style="margin-left: -6px; margin-right: 6px"
            ></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          size="large"
          autocomplete="new-password"
          v-model="cForm.model.password"
          @keyup.enter="submit"
        >
          <template #prefix>
            <i
              class="c-iconfont c-iconfont--lock-filled fs16"
              style="margin-left: -6px; margin-right: 6px"
            ></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="large"
          @click="submit"
          style="width: 100%; margin-top: 10px"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script src="./script.js"></script>
