import TheHeader from "element-plus-admin/components/layout/header/index.vue";
import TheSidebar from "element-plus-admin/components/layout/sidebar/index.vue";
import TheMain from "element-plus-admin/components/layout/main/index.vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { computed } from "vue";

export default {
  components: {
    TheHeader,
    TheSidebar,
    TheMain,
  },
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
