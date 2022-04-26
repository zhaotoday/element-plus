<template>
  <c-login>
    <template #header>
      <c-login-header>
        <img src="./images/logo.png" />
        福州力软信息科技有限公司
      </c-login-header>
    </template>
    <template #main>
      <div class="b-login u-shadow u-br2">
        <div class="b-login__title">管理员登录</div>
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
    <template #footer>
      <b-footer>
        福建省智慧医工联合工程研究中心 &nbsp;&nbsp; fjmec.cn &nbsp;&nbsp;
        闽ICP备2021009415号-1
      </b-footer>
    </template>
  </c-login>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
