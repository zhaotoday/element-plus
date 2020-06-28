import { Component } from "vue-property-decorator";
import GlobalBaseMixin from "view-ui-admin/src/mixins/global";

@Component
export default class GlobalMixin extends GlobalBaseMixin {
  getSchoolId() {
    return this.user.school ? this.user.school.id : 0;
  }

  isPlatform() {
    return this.user.school && this.user.school.id === 1;
  }
}
