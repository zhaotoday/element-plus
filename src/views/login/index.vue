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

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  cForm = {
    model: {},
    rules: {
      username: [
        {
          required: true,
          message: "账号不能为空"
        }
      ],
      password: [
        {
          required: true,
          message: "密码不能为空"
        }
      ]
    }
  };

  login() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const { data } = await this.$store.dispatch(
          "public/managers/postAction",
          {
            action: "login",
            body: this.cForm.model
          }
        );

        this.$auth.login({ user: data.manager, token: data.token });
        this.$Message.success("登录成功");
        this.$router.push(this.$route.query.redirect || "/");
      }
    });
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
