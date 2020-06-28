<template>
  <div class="p-login">
    <Tabs>
      <TabPane label="微信登录">
        <div id="login-container"></div>
      </TabPane>
      <TabPane label="账号登录">
        <Form
          class="b-form"
          ref="form"
          :model="cForm.model"
          :rules="cForm.rules"
          label-position="top"
        >
          <Form-item prop="phoneNumber" label="手机号">
            <Input
              size="large"
              prefix="md-person"
              placeholder="请输入手机号"
              v-model.trim="cForm.model.phoneNumber"
              @on-enter="login"
            />
          </Form-item>
          <Form-item prop="password" label="密码">
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
            <p class="b-tip">
              提示：初始登录密码为：123456，为了确保数据安全，登录后请立即前往校区设置修改密码。
            </p>
          </Form-item>
        </Form>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  cForm = {
    model: {},
    rules: {
      phoneNumber: [
        {
          required: true,
          message: "手机号不能为空"
        },
        {
          pattern: /^1\d{2}\s?\d{4}\s?\d{4}$/,
          message: "手机号格式错误"
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

  created() {
    this.$route.query.error && this.$Message.error(this.$route.query.error);
  }

  mounted() {
    new window.WxLogin({
      id: "login-container",
      appid: "wxbf39f93acfb04056",
      scope: "snsapi_login",
      redirect_uri:
        "https%3A%2F%2Fmall.tongnianjihua.com%2Fpublic%2Fschools%2Fredirect%3Ftype%3DAdmin",
      state: "",
      style: "",
      href: ""
    });
  }

  login() {
    this.$refs.form.validate(async valid => {
      if (valid) {
        const {
          data: { manager, token }
        } = await this.$store.dispatch("public/schools/postAction", {
          action: "accountLogin",
          body: this.cForm.model
        });

        this.$auth.login({
          schoolId: manager.school.id,
          user: manager,
          token: token
        });
        this.$Message.success("登录成功");
        window.location.href = `/?schoolId=${manager.school.id}#/`;
      }
    });
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
