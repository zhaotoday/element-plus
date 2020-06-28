import { Vue, Component, Watch } from "vue-property-decorator";

@Component({
  props: {
    autoFocus: {
      type: Boolean,
      default: false
    },
    showSubmit: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: ""
    },
    defaultValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  }
})
export default class Search extends Vue {
  value = "";

  @Watch("defaultValue", { immediate: true })
  onDefaultValueChange(newVal) {
    this.value = newVal;
  }

  navigateToLink() {
    if (this.link) {
      this.$wx.navigateTo({ url: this.link });
    }
  }

  confirm() {
    this.$emit("confirm", this.value);
  }
}
