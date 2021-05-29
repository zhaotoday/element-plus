import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  name: "TheHeader",
  setup() {
    const { state } = useStore();
    const router = useRouter();

    const user = computed(() => state.auth.user);

    const logout = async () => {
      await router.push("/logout");
      ElMessage.success("退出成功");
    };

    return {
      user,
      logout,
    };
  },
};
