import { Component, Vue } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
  methods: mapActions({
    resetState: "resetState"
  })
})
export default class GlobalMixin extends Vue {}
