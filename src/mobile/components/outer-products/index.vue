<template>
  <div
    class="c-products bgc11"
    :class="{
      'c-products--horizontal': modifier === 'horizontal',
      'c-products--vertical': modifier === 'vertical'
    }"
  >
    <c-title
      :title="title"
      :show-more="showMore"
      @more="$emit('more')"
    ></c-title>
    <div
      v-for="(item1, index1) in page(items, 2)"
      :key="index1"
      class="c-products__row"
    >
      <div
        v-for="item2 in item1"
        :key="item2.id"
        class="c-products__col bgc11"
        @click="navigateTo(`/pages/products/detail/index?id=${item2.id}`)"
      >
        <img
          v-if="modifier === 'horizontal'"
          class="c-products__picture"
          :src="getImageUrl({ id: item2.pictureId, width: 311, height: 207 })"
        />
        <img
          v-else
          class="c-products__picture"
          :src="getImageUrl({ id: item2.pictureId, width: 300, height: 180 })"
        />
        <div class="c-products__title fs28 u-tac">{{ item2.name }}</div>
        <div class="u-tac">
          <span class="c22 fs32">¥{{ item2.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="../products/style.scss"></style>
