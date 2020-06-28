<template>
  <div v-if="name === 'global'">
    <c-global :name="props.name" :primary-color="props.primaryColor"></c-global>
  </div>
  <div v-else-if="name === 'search'">
    <div class="bgc21 u-pt24">
      <c-search
        :placeholder="props.placeholder"
        link="/pages/products/search/index"
      ></c-search>
    </div>
  </div>
  <div v-else-if="name === 'ads'">
    <div class="b-swiper u-pt24">
      <div class="b-swiper-wrap bgc11">
        <c-swiper
          :items="toSwiperItems(data.items)"
          :width="702"
          :height="280"
        ></c-swiper>
      </div>
    </div>
  </div>
  <div v-else-if="name === 'notices'">
    <div class="b-wrap">
      <div class="u-pt24">
        <c-notice :items="data.items"></c-notice>
      </div>
    </div>
  </div>
  <div v-else-if="name === 'entries'">
    <div class="b-wrap">
      <div class="u-pt24">
        <c-entries :items="data.items"></c-entries>
      </div>
    </div>
  </div>
  <div v-else-if="name === 'shortcuts'">
    <div class="b-wrap">
      <div class="u-pt24">
        <c-shortcuts :items="data.items"></c-shortcuts>
      </div>
    </div>
  </div>
  <div v-else-if="name === 'brands'">
    <div class="b-wrap">
      <c-brands :title="props.title" :items="data.items"></c-brands>
    </div>
  </div>
  <div v-else-if="name === 'richText'">
    <div class="b-wrap">
      <div class="u-pt24">
        <c-rich-text :content="props.content"></c-rich-text>
      </div>
    </div>
  </div>
  <div v-else-if="name === 'imageLink'">
    <div class="b-wrap">
      <div class="u-pt24">
        <c-image-link
          :image-id="props.imageId"
          :link="props.link"
          :max-width="props.maxWidth"
        ></c-image-link>
      </div>
    </div>
  </div>
  <div v-else-if="name === 'products'">
    <div class="b-wrap">
      <div class="u-pt24">
        <c-products
          :modifier="props.modifier"
          :title="props.title"
          :items="data.items"
          show-more
        ></c-products>
      </div>
    </div>
  </div>
  <div v-else-if="name === 'outerProducts'">
    <div class="b-wrap">
      <div class="u-pt24">
        <c-outer-products
          :modifier="props.modifier"
          :title="props.title"
          :items="data.items"
        ></c-outer-products>
      </div>
    </div>
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
export default class Comp extends Vue {
  toSwiperItems(items) {
    return items.map(item => ({
      image: this.getImageUrl({ id: item.pictureId, width: 702, height: 280 }),
      url: item.link
    }));
  }
}
</script>
