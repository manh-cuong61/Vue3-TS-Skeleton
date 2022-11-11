<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    size: {
      type: String,
      default: 'md',
      validator(value: string) {
        return ['md', 'sm', 'lg'].includes(value.toLowerCase());
      },
    },
    modelValue: [String, Number],
  },
  setup() {
    return {};
  },
  computed: {
    classes() {
      return {
        form__textarea: true,
        [`--${this.size}`]: true,
        'box-readonly': this.$attrs.disabled,
      };
    },
  },
  methods: {
    updateInput(event: Event) {
      if (this.$attrs.disabled || this.$attrs.readonly) return;

      this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
    },
  },
});
</script>

<template>
  <textarea :class="classes" type="text" :value="modelValue" @input="updateInput"></textarea>
</template>

<style scoped></style>
