<template>
  <basic-dialog
    :visible="state.visible"
    :loading="state.loading"
    :title="state.title"
    :width="state.width"
    :top="state.top"
    :cancel-button-text="state.cancelButtonText"
    :confirm-button-text="state.confirmButtonText"
    @closed="state.close"
    @submit="state.submit"
  >
    <div v-if="state.isHtml" v-html="state.content"></div>
    <template v-else>{{ state.content }}</template>
  </basic-dialog>
</template>

<script setup lang="ts">
import BasicDialog from './BasicDialog.vue'
import { useMessageBox } from '@/hooks/useMessageBox'

const { state } = useMessageBox()
</script>

<style lang="scss" scoped></style>
