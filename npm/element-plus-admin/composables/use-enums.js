import { computed } from "@vue/composition-api";
import { store } from "@/store";
import { PublicEnumsApi } from "../apis/public/enums";

export const useEnums = () => {
  const enums = computed(() => store.state["public/enums"].data);

  const getEnums = async () => {
    const { version } = await new PublicEnumsApi().POST({
      action: "getVersion",
    });

    if (version !== enums.value.config.version) {
      await store.dispatch("public/enums/get");
    }
  };

  return { enums, getEnums };
};
