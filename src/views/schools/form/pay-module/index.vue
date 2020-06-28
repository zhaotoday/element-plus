<template>
  <div>
    <Table
      class="c-form__input"
      size="small"
      border
      stripe
      highlight-row
      :columns="column"
      :data="dicts.PayModule"
    >
    </Table>
    <c-form ref="form" :form-model.sync="formModel"></c-form>
  </div>
</template>

<script src="./script.js"></script>
