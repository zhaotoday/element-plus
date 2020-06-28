import { Component, Vue } from "vue-property-decorator";
import dayjs from "dayjs";

@Component
export default class PayModuleMixin extends Vue {
  getSchoolDetail() {
    return this.$store.dispatch("schools/getDetail", {
      id: this.getSchoolId()
    });
  }

  async getPaidModules() {
    const { payModules } = await this.getSchoolDetail();
    const modules = [];

    Object.keys(payModules).forEach(key => {
      if (
        payModules[key].enabled &&
        dayjs(payModules[key].expiresAt).diff() >= 0
      ) {
        modules.push(key);
      }
    });

    return this.isPlatform()
      ? [...this.dicts.PayModule.map(item => item.value), "Product"]
      : [...modules, "Product"];
  }
}
