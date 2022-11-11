<template>
  <div class="checkbox" :class="classes">
    <input
      v-bind="$attrs"
      :id="id"
      :checked="modelValue"
      class="checkbox__input"
      type="checkbox"
      @change="updateChecked"
    />
    <label class="checkbox__label" :for="id"><slot></slot></label>
  </div>
</template>

<script lang="ts">
import './BaseCheckbox.scss';

import { defineComponent } from 'vue';

export default defineComponent({
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: 'primary',
      validator(value: string) {
        return ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark'].includes(
          value.toLowerCase(),
        );
      },
    },
    id: {
      type: String,
    },
    isSwitch: {
      type: Boolean,
      default: false,
    },
    class: {
      type: String,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup() {
    return {};
  },
  computed: {
    classes() {
      return {
        [`--${this.color}`]: true,
        '--switch': this.isSwitch,
        [this.class ?? '']: true,
      };
    },
  },

  methods: {
    updateChecked(event: Event) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).checked);
    },
  },
});
</script>

<style scoped></style>
