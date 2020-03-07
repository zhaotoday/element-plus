import { Vue, Component } from "vue-property-decorator";

@Component
export default class RouteParamsMixin extends Vue {
  alias = "";
  id = 0;

  async beforeRouteUpdate(to, from, next) {
    this.alias = to.params.alias;
    this.id = to.params.id;

    next();
  }

  async created() {
    const { alias, id } = this.$route.params;

    this.alias = alias;
    this.id = id;
  }
}
