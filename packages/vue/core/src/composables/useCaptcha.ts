/**
 * @fileoverview 验证码发送与倒计时管理
 * @module composables/use-captcha
 */

import { computed, onScopeDispose, readonly, ref } from "vue";

/**
 * 验证码配置选项
 */
interface CaptchaOptions {
  /** 发送按钮文本，默认 `"获取验证码"` */
  sendText?: string;
  /** 倒计时文本模板，`{seconds}` 会被替换为剩余秒数，默认 `"{seconds}s 后获取"` */
  waitText?: string;
  /** 倒计时时长（秒），默认 `120` */
  duration?: number;
  /** 发送前的校验逻辑，抛出异常则中止发送 */
  validate: () => Promise<void> | void;
  /** 发送验证码的请求 */
  request: () => Promise<void> | void;
  /** 错误回调，未提供时默认 `console.error` */
  onError?: (error: unknown) => void;
}

/**
 * 验证码发送与倒计时管理
 *
 * @param options - 配置选项
 * @returns 验证码相关状态（readonly refs / computed refs）和操作方法
 *
 * @example
 * ```vue
 * <script setup>
 * const { buttonText, canSend, loading, send } = useCaptcha({
 *   validate: () => formRef.value?.validate('phone'),
 *   request: () => api.post('/captcha', { phone: form.phone }),
 * })
 * </script>
 *
 * <template>
 *   <button :disabled="!canSend" :loading="loading" @click="send">
 *     {{ buttonText }}
 *   </button>
 * </template>
 * ```
 */
export function useCaptcha(options: CaptchaOptions) {
  const {
    sendText = "获取验证码",
    waitText = "{seconds}s 后获取",
    duration = 120,
    validate,
    request,
    onError = (err) => console.error("发送验证码失败:", err),
  } = options;

  const remainingSeconds = ref(0);
  const loading = ref(false);
  let timer: ReturnType<typeof setInterval> | null = null;

  /** 是否正在倒计时 */
  const counting = computed(() => remainingSeconds.value > 0);

  /** 按钮显示文本，倒计时中显示剩余秒数，否则显示发送文本 */
  const buttonText = computed(() =>
    counting.value
      ? waitText.replace("{seconds}", String(remainingSeconds.value))
      : sendText,
  );

  /** 是否可以发送（非倒计时中且非发送中） */
  const canSend = computed(() => !counting.value && !loading.value);

  function clearTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function startCountdown() {
    remainingSeconds.value = duration;
    timer = setInterval(() => {
      if (--remainingSeconds.value <= 0) {
        clearTimer();
      }
    }, 1000);
  }

  /**
   * 发送验证码
   *
   * @remarks 依次执行 `validate` → `request`，成功后启动倒计时；
   * 任一步骤抛出异常则调用 `onError` 并重新抛出
   */
  async function send() {
    if (!canSend.value) return;

    loading.value = true;
    try {
      await validate();
      await request();
      startCountdown();
    } catch (error) {
      onError(error);
      throw error;
    } finally {
      loading.value = false;
    }
  }

  /**
   * 重置为初始状态
   *
   * @remarks 清除倒计时并重置所有状态
   */
  function reset() {
    clearTimer();
    remainingSeconds.value = 0;
    loading.value = false;
  }

  onScopeDispose(clearTimer);

  return {
    /** 按钮显示文本 */
    buttonText,
    /** 是否正在倒计时 */
    counting,
    /** 是否正在发送 */
    loading: readonly(loading),
    /** 是否可以发送 */
    canSend,
    /** 剩余秒数 */
    remainingSeconds: readonly(remainingSeconds),
    /** 发送验证码 */
    send,
    /** 重置状态 */
    reset,
  };
}
