<!-- https://flatpickr.js.org/examples/ -->
<template>
  <flat-pickr
    v-model="date"
    class="form__input"
    :class="{ 'box-readonly': disabled }"
    :config="config"
    :disabled="disabled"
  ></flat-pickr>
</template>

<script lang="ts">
import './BaseDatePicker.scss';

import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    altFormat: {
      type: String,
    },
    altInput: Boolean,
    dateFormat: {
      type: String,
      default: 'Y-m-d',
    },
    enableTime: Boolean,
    noCalendar: Boolean,
    time24hr: Boolean,
    value: String,
    onChange: Function,
  },
  setup() {
    return {};
  },
  data() {
    return {
      date: null,
    };
  },
  computed: {
    config() {
      return {
        wrap: true,
        altFormat: this.altFormat,
        altInput: this.altInput,
        dateFormat: this.dateFormat,
        enableTime: this.enableTime,
        noCalendar: this.noCalendar,
        time_24hr: this.time24hr,
      };
    },
  },
  methods: {
    // onChange() {
    // }
  },
});
</script>
