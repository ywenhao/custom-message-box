<template>
  <el-dialog
    class="basic-dialog"
    :model-value="visible"
    :title="title"
    :width="width"
    :top="top"
    :append-to-body="appendToBody"
    :close-on-click-modal="!loading"
    :close-on-press-escape="!loading"
    :show-close="!loading"
    @closed="handleClosed"
  >
    <slot></slot>
    <template v-if="hasFooter" #footer>
      <slot name="footer">
        <el-button
          class="w-[74px]"
          :loading="loading"
          type="primary"
          :disabled="confirmButtonDisabled"
          @click="emit('submit')"
        >
          {{ confirmButtonText }}
        </el-button>
        <el-button
          class="ml-6 w-[74px]"
          :loading="loading"
          :disabled="cancelButtonDisabled"
          @click="emit('closed')"
        >
          {{ cancelButtonText }}
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
interface IProps {
  title: string
  visible: boolean
  loading?: boolean
  appendToBody?: boolean
  width?: number
  top?: string
  hasFooter?: boolean
  singleButton?: boolean
  cancelButtonDisabled?: boolean
  confirmButtonDisabled?: boolean
  cancelButtonText?: string
  confirmButtonText?: string
}

interface IEmits {
  (event: 'closed'): void
  (event: 'submit'): void
  (event: 'update:visible', value: boolean): void
}

withDefaults(defineProps<IProps>(), {
  hasFooter: true,
  cancelButtonText: '取消',
  confirmButtonText: '确定',
  confirmButtonDisabled: false,
  cancelButtonDisabled: false,
})
const emit = defineEmits<IEmits>()

function handleClosed() {
  emit('update:visible', false)
  emit('closed')
}
</script>

<style lang="scss" scoped></style>
