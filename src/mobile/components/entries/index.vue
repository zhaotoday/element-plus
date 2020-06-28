<template>
  <div>
    <ul class="c-entries bgc11">
      <li v-for="(item, index) in items" :key="item.id" class="c-entries__item">
        <div class="c-entries__icon" @click="goLink(item)">
          <i
            v-if="item.iconType === 'Code'"
            class="c-iconfont fs48"
            :class="'c-iconfont--' + item.iconCode"
            :style="{ color: $consts.EntryColor[index] }"
          ></i>
          <img
            v-else
            :src="getImageUrl({ id: item.iconId, width: 100, height: 100 })"
          />
          <h2 class="c-entries__title fs24 u-tac">
            {{ item.name }}
          </h2>
        </div>
      </li>
    </ul>
    <c-popup :visible="cFollowOa.visible" @cancel="cFollowOa.visible = false">
      <div slot="content">
        <div class="c-qrcode bgc11">
          <div class="c-close">
            <div
              class="c-close__trigger"
              @click="cFollowOa.visible = false"
            ></div>
          </div>
          <img :src="getImageUrl({ id: cFollowOa.qrCodePictureId })" />
          <h2 class="fs28 u-tac">长按二维码关注公众号</h2>
        </div>
      </div>
    </c-popup>
  </div>
</template>

<script src="./script.js"></script>

<style lang="scss" src="./style.scss"></style>
