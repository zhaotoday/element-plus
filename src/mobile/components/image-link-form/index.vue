<template>
  <div>
    <Divider orientation="left">图片链接</Divider>
    <Form class="c-form c-form--dress" :label-width="80">
      <Form-item label="图片" prop="imageId">
        <c-uploader
          class="c-form__input"
          :default-file-ids="props.imageId"
          @change="
            value => {
              $set(props, 'imageId', +value);
            }
          "
        ></c-uploader>
      </Form-item>
      <Form-item label="链接" prop="link">
        <Input
          class="c-form__input"
          v-model.trim="props.link"
          placeholder="请输入链接"
          search
          enter-button="选择链接"
          @on-search="$refs.linkSelect.show()"
        >
        </Input>
      </Form-item>
      <Form-item label="最大宽度" prop="maxWidth">
        <Select
          class="c-form__input"
          placeholder="请选择最大宽度"
          clearable
          v-model="props.maxWidth"
        >
          <Option
            v-for="item in $consts.ImageMaxWidth"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          >
            {{ item.label }}
          </Option>
        </Select>
      </Form-item>
    </Form>
    <c-link-select ref="linkSelect" @select="handleSelect"></c-link-select>
  </div>
</template>

<script src="./script.js"></script>
