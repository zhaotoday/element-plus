import TheHeader from "element-plus-admin/components/layout/header/index.vue";
import TheSidebar from "element-plus-admin/components/layout/sidebar/index.vue";
import TheMain from "element-plus-admin/components/layout/main/index.vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useAuth } from "@/composables/use-auth";
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

    const userName = ref("");

    onMounted(() => {
      userName.value =
        user.value && user.value.account
          ? `${user.value.account}@${user.value.school.name} `
          : "";
    });

    const logout = async () => {
      await router.push("/logout");
      ElMessage.success("退出成功");
    };

    return {
      userName,
      getMenus,
      logout,
    };
  },
};
