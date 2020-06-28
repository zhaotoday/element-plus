<template>
  <div>
    <c-title :title="title"></c-title>
    <ul class="c-brands o-grid o-grid--12">
      <li
        v-for="(item1, index1) in page(items, 4)"
        :key="index1"
        class="o-grid__row"
      >
        <div
          v-for="item2 in item1"
          :key="item2.id"
          class="o-grid__col o-grid__col--3"
          @click="goLink(item2.link)"
        >
          <div class="c-brands__item bgc11">
            <img
              class="c-brands__icon"
              :src="getImageUrl({ id: item2.logoId })"
            />
            <h2 class="c-brands__title fs24 u-tac">{{ item2.name }}</h2>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
