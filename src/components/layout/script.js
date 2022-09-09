import TheHeader from "element-plus-admin/components/layout/header/index.vue";
import TheSidebar from "element-plus-admin/components/layout/sidebar/index.vue";
import TheMain from "element-plus-admin/components/layout/main/index.vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useAuth } from "element-plus-admin/composables/use-auth";
import { getMenus } from "./utils/get-menus";

export default {
  components: {
    TheHeader,
    TheSidebar,
    TheMain,
  },
  setup() {
    const router = useRouter();
    const { user } = useAuth();

    const logout = async () => {
      await router.push("/logout");
      ElMessage.success("退出成功");
    };

    return {
      user,
      getMenus,
      logout,
    };
  },
};
