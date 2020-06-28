<template>
  <div>
    <Divider orientation="left">富文本</Divider>
    <Form class="c-form c-form--dress" :label-width="80">
      <Form-item label="内容" prop="content">
        <c-editor
          :html="props.content"
          @change="
            html => {
              $set(props, 'content', html);
            }
          "
        ></c-editor>
      </Form-item>
    </Form>
  </div>
</template>

<script src="./script.js"></script>
