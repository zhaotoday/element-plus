<template>
  <div class="p-wx-login">登录中，请稍后...</div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  async mounted() {
    try {
      const {
        data: { manager, token }
      } = await this.$store.dispatch("public/schools/postAction", {
        showError: false,
        action: "wxLogin",
        body: { type: "App", code: this.$route.query.code }
      });

      this.$auth.login({
        schoolId: manager.school.id,
        user: manager,
        token: token
      });
      this.$Message.success("登录成功");
      window.location.href = `/?schoolId=${manager.school.id}#/`;
    } catch (error) {
      this.$router.replace({
        path: "/login",
        query: { error: error.message }
      });
    }
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
