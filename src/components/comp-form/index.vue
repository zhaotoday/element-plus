<template>
  <div v-if="name === 'global'">
    <c-global-form :props="props" :data="data"></c-global-form>
  </div>
  <div v-else-if="name === 'search'">
    <c-search-form :props="props" :data="data"></c-search-form>
  </div>
  <div v-else-if="name === 'ads'">
    <c-swiper-form :props="props" :data="data"></c-swiper-form>
  </div>
  <div v-else-if="name === 'notices'">
    <c-notice-form :props="props" :data="data"></c-notice-form>
  </div>
  <div v-else-if="name === 'entries'">
    <c-entries-form :props="props" :data="data"></c-entries-form>
  </div>
  <div v-else-if="name === 'brands'">
    <c-brands-form :props="props" :data="data"></c-brands-form>
  </div>
  <div v-else-if="name === 'richText'">
    <c-rich-text-form :props="props" :data="data"></c-rich-text-form>
  </div>
  <div v-else-if="name === 'imageLink'">
    <c-image-link-form :props="props" :data="data"></c-image-link-form>
  </div>
  <div v-else-if="name === 'products'">
    <c-products-form :props="props" :data="data" :type="type"></c-products-form>
  </div>
  <div v-else-if="name === 'outerProducts'">
    <c-outer-products-form :props="props" :data="data"></c-outer-products-form>
  </div>
  <div v-else-if="name === 'shortcuts'">
    <c-shortcuts-form :props="props" :data="data"></c-shortcuts-form>
  </div>
  <div v-else>
    xx
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

@Component({
  props: {
    name: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    props: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    }
  }
})
export default class CompForm extends Vue {}
</script>
