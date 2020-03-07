import { Vue, Component } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: mapState({
    dicts: state => state["public/dicts"].list
  })
})
export default class DictsMixin extends Vue {
  getDictsList() {
    return this.$store.dispatch("public/dicts/getList", {});
  }

  async loadDicts() {
    if (!this.dicts.config) {
      await this.getDictsList();
    }
  }

  async updateDicts() {
    await this.loadDicts();

    const { config } = this.dicts;
    const {
      data: { version }
    } = await this.$store.dispatch("public/dicts/postAction", {
      action: "getVersion"
    });

    if (version !== config.version) await this.getDictsList();
  }
}
