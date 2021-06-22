import { computed } from "vue";
import { useStore } from "vuex";
import { PublicEnumsApi } from "../apis/public/enums";

export const useEnums = () => {
  const { dispatch, state } = useStore();

  const enums = computed(() => state["enums"].data);

  const getEnums = async () => {
    const { version } = await new PublicEnumsApi().POST({
      action: "getVersion",
    });

    if (version !== enums.value.config.version) {
      await dispatch("enums/get");
    }
  };

  return { enums, getEnums };
};
