import helpers from "jt-helpers";
import { useConsts } from "@/composables/use-consts";

export const useHelpers = () => {
  const { ApiUrl } = useConsts();

  return {
    ...helpers,
    getFileUrl({ id }) {
      return `${ApiUrl}/public/files/${id}`;
    },
  };
};
