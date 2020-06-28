<template>
  <div
    class="c-search"
    :class="{ 'has-submit': showSubmit }"
    @click="navigateToLink"
  >
    <div class="c-search__input-wrap bgc31">
      <div v-if="link" class="c-search__input fs28">
        <span v-if="value">
          {{ value }}
        </span>
        <span v-else class="c36">
          {{ placeholder }}
        </span>
      </div>
      <input
        v-else
        class="c-search__input fs28"
        placeholder-class="c36"
        :placeholder="placeholder"
        confirm-type="search"
        :auto-focus="autoFocus"
        v-model="value"
        @focus="$emit('focus')"
        @confirm="confirm"
      />
    </div>
    <div class="c-search__submit fs28" @click="confirm">
      搜索
    </div>
  </div>
</template>

<script src="./script.js"></script>
