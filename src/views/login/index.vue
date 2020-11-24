<template>
  <Card class="p-login" dis-hover>
    <p slot="title">后台管理系统</p>
    <Form
      class="b-form"
      ref="form"
      :model="cForm.model"
      :rules="cForm.rules"
      :label-width="0"
      label-position="left"
    >
      <Form-item prop="username">
        <Input
          size="large"
          prefix="md-person"
          placeholder="请输入账号"
          v-model.trim="cForm.model.username"
          @on-enter="login"
        />
      </Form-item>
      <Form-item prop="password">
        <Input
          type="password"
          size="large"
          prefix="md-lock"
          placeholder="请输入密码"
          v-model.trim="cForm.model.password"
          @on-enter="login"
        />
      </Form-item>
      <Form-item>
        <Button type="primary" size="large" long @click="login">
          登录
        </Button>
      </Form-item>
    </Form>
  </Card>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
