import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
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
        const {
          data: { manager, token }
        } = await this.$store.dispatch("public/managers/postAction", {
          action: "login",
          body: this.cForm.model
        });

        this.$auth.login({ user: manager, token });
        this.$Message.success("登录成功");
        this.$router.push(this.$route.query.redirect || "/");
      }
    });
  }
}
