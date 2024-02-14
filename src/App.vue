<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { useEnums } from "element-plus-admin/composables/use-enums";

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    const { getEnums } = useEnums();

    onMounted(async () => {
      await getEnums();
    });

    return {
      locale: zhCn,
    };
  },
});
</script>
