import {useStore} from "vuex";
import {computed} from "vue";

export const useItems=()=>{
    const { dispatch } = useStore();

    const getItems = (options) => dispatch("table/updateTitle", options);
}
