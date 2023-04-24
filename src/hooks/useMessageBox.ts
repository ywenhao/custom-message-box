import { inject, reactive, watch, provide } from 'vue'

export interface CustomMessageBox {
  visible: boolean
  loading: boolean
  title: string
  width: number
  content: string
  isHtml: boolean
  top: string
  confirmButtonText: string
  cancelButtonText: string
  close: () => void
  submit: () => void
}

const MESSAGE_BOX = Symbol('MESSAGE_BOX')

/**
 * @example
 * ```ts
 *   setMessageBox({
      isHtml: true,
      content: `<span class="block h-[58px]">
        确定将该用户密码重置为
        <span class="text-primary">abcd.1234</span>
        吗？
      </span>`,
      title: '提示',
      async submit() {
        try {
          await resetUserPasswordApi({ id: user.id! })
          ToastUtils.success('重置成功')

          setMessageBox({ visible: false })
        } finally {
          setMessageBox({ loading: false })
        }
      }
    })
 * ```
 * @returns
 */
export function useMessageBox() {
  const result = inject(MESSAGE_BOX) as ReturnType<typeof useCreateMessageBox>
  return result
}

export function useCreateMessageBox() {
  const initState: CustomMessageBox = {
    visible: false,
    loading: false,
    title: '',
    width: 380,
    top: '30vh',
    isHtml: false,
    content: '',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    close: () => {},
    submit: () => {},
  }

  const state = reactive<CustomMessageBox>({ ...initState })

  const reset = () => {
    Object.assign(state, initState)
  }

  let submitCache: null | (() => void) = null
  let closeTimer: null | number = null

  const setMessageBox = (value: Partial<CustomMessageBox>) => {
    Object.assign(state, value)

    if (value.content) {
      state.visible = true
    }

    if (!value.submit && !value.close) {
      return
    }

    if (value.submit) {
      submitCache = value.submit
    }

    state.submit = () => {
      state.loading = true
      submitCache && submitCache()
    }

    state.close = () => {
      if (closeTimer) return
      state.visible = false
      value.close?.()

      closeTimer = setTimeout(() => {
        reset()
        closeTimer && clearTimeout(closeTimer)
        closeTimer = null
      }, 200)
    }
  }

  watch(
    () => state.visible,
    (val) => {
      if (!val) {
        submitCache = null
        state.close()
      }
    }
  )

  const result = { state, setMessageBox, reset }

  provide(MESSAGE_BOX, result)

  return result
}
