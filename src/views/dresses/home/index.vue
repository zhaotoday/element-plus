<template>
  <div class="p-dresses-home">
    <div class="b-phone">
      <draggable
        draggable=".draggable"
        ghost-class="ghost"
        v-bind="dragOptions"
        :list="components"
        :move="checkDragMove"
        @start="handleDragStart"
        @end="handleDragEnd"
      >
        <c-editable-module
          :is-fixed="isFixed(comp.name)"
          :class="{ draggable: !isFixed(comp.name) }"
          v-for="(comp, index) in components"
          :key="comp.key"
          :active="current === index"
          @select="selectModule(index)"
          @delete="deleteModule(index)"
        >
          <div slot="component">
            <c-comp
              :name="comp.name"
              :props="comp.props"
              :data="comp.data"
            ></c-comp>
          </div>
          <div slot="editor">
            <c-comp-form
              v-if="current === index"
              :name="comp.name"
              :props="comp.props"
              :data="comp.data"
            ></c-comp-form>
            <template v-if="!isFixed(comp.name)">
              <Divider orientation="left">
                插入模块
              </Divider>
              <Form class="c-form c-form--modal" :label-width="80">
                <Form-item label="模块">
                  <div class="b-modules">
                    <Button
                      v-for="item in dicts.SupportedDressComponent"
                      :key="item.value"
                      icon="md-add"
                      :disabled="item.disabled"
                      @click="addModule(item.value)"
                    >
                      {{ item.label }}
                    </Button>
                  </div>
                </Form-item>
              </Form>
            </template>
            <Form class="c-form c-form-modal" :label-width="80">
              <Form-item>
                <Button class="u-mr5" type="primary" @click="submit">
                  保存页面
                </Button>
                <Button
                  class="u-mr5"
                  type="primary"
                  @click="cQrCode.modal = true"
                >
                  获取首页二维码
                </Button>
              </Form-item>
            </Form>
          </div>
        </c-editable-module>
      </draggable>
    </div>
    <Modal width="434" footer-hide v-model="cQrCode.modal" title="首页二维码">
      <div class="b-qrcode-wrap">
        <img :src="`${$consts.PublicApiUrl}/schools/${id}/qrCode`" />
        <a
          class="ivu-btn ivu-btn-primary"
          :href="`${$consts.PublicApiUrl}/schools/${id}/qrCode?attachment=1`"
        >
          下载
        </a>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import draggable from "vuedraggable";

@Component({
  components: {
    draggable
  }
})
export default class extends Vue {
  id = 0;

  current = 0;

  cDrag = {
    index: -1,
    futureIndex: -1
  };

  components = [];

  cQrCode = {
    modal: false
  };

  get dragOptions() {
    return {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost"
    };
  }

  async created() {
    this.id = this.getSchoolId();
    const { homeDressComponents } = await this.getSchoolsDetail();

    if (homeDressComponents) {
      this.$helpers.addStyle(homeDressComponents[0].props.primaryColor);
      this.components = homeDressComponents;
    } else {
      Object.keys(this.dicts.DressComponent).forEach(key => {
        this.components.push(
          this.$helpers.deepCopy(this.dicts.DressComponent[key])
        );
      });
    }
  }

  isFixed(name) {
    return name === "global" || name === "search" || name === "ads";
  }

  selectModule(index) {
    this.current = index;
  }

  async deleteModule(index) {
    this.components.splice(index, 1);
    await this.$helpers.sleep(10);
    this.current = -1;
  }

  async addModule(name) {
    this.components.splice(
      this.current + 1,
      0,
      this.$helpers.deepCopy(this.dicts.DressComponent[name])
    );
    await this.$helpers.sleep(10);
    this.current = this.current + 1;
  }

  getSchoolsDetail() {
    return this.$store.dispatch("schools/getDetail", {
      id: this.getSchoolId()
    });
  }

  checkDragMove(e) {
    const { index, futureIndex } = e.draggedContext;

    this.cDrag.index = index;
    this.cDrag.futureIndex = futureIndex;
  }

  handleDragStart() {
    this.current = -1;
  }

  handleDragEnd() {
    this.current = -1;
  }

  async submit() {
    await this.$store.dispatch("schools/put", {
      id: this.getSchoolId(),
      body: {
        homeDressComponents: this.components
      }
    });
    this.$Message.success("保存成功");
  }
}
</script>

<style lang="scss" src="./style.scss"></style>
