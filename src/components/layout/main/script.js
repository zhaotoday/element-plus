import { Component, Vue } from "vue-property-decorator";
import TheHeader from "./header";

@Component({
  components: {
    TheHeader
  }
})
export default class TheMain extends Vue {}
