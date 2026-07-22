/* Vue 全局类型声明 - 让编辑器识别 Vue 相关方法 */
import type {
  Ref,
  ComputedRef,
  WritableComputedRef,
  UnwrapRef,
  ShallowRef,
  Reactive,
  DeepReadonly,
  UnwrapNestedRefs,
  App,
  Component,
  VNode,
  ComponentPublicInstance,
  DirectiveBinding,
  PropType,
  ExtractPropTypes,
  ExtractDefaultPropTypes,
  ExtractPublicPropTypes,
  InjectionKey,
  Slot,
  Slots,
  MaybeRef,
  MaybeRefOrGetter,
  EffectScope,
} from "vue";

import type {
  RouteLocationNormalized,
  Router,
  RouteLocationNormalizedLoaded,
  NavigationGuardNext,
  RouteLocationRaw,
} from "vue-router";

declare global {
  // Vue Reactivity API
  const ref: (typeof import("vue"))["ref"];
  const reactive: (typeof import("vue"))["reactive"];
  const computed: (typeof import("vue"))["computed"];
  const readonly: (typeof import("vue"))["readonly"];
  const shallowRef: (typeof import("vue"))["shallowRef"];
  const shallowReactive: (typeof import("vue"))["shallowReactive"];
  const shallowReadonly: (typeof import("vue"))["shallowReadonly"];

  // Vue Utilities
  const unref: (typeof import("vue"))["unref"];
  const toRef: (typeof import("vue"))["toRef"];
  const toRefs: (typeof import("vue"))["toRefs"];
  const toValue: (typeof import("vue"))["toValue"];
  const isRef: (typeof import("vue"))["isRef"];
  const isReactive: (typeof import("vue"))["isReactive"];
  const isReadonly: (typeof import("vue"))["isReadonly"];
  const isProxy: (typeof import("vue"))["isProxy"];
  const isShallow: (typeof import("vue"))["isShallow"];

  // Vue Lifecycle
  const onBeforeMount: (typeof import("vue"))["onBeforeMount"];
  const onMounted: (typeof import("vue"))["onMounted"];
  const onBeforeUpdate: (typeof import("vue"))["onBeforeUpdate"];
  const onUpdated: (typeof import("vue"))["onUpdated"];
  const onBeforeUnmount: (typeof import("vue"))["onBeforeUnmount"];
  const onUnmounted: (typeof import("vue"))["onUnmounted"];
  const onActivated: (typeof import("vue"))["onActivated"];
  const onDeactivated: (typeof import("vue"))["onDeactivated"];
  const onErrorCaptured: (typeof import("vue"))["onErrorCaptured"];
  const onRenderTracked: (typeof import("vue"))["onRenderTracked"];
  const onRenderTriggered: (typeof import("vue"))["onRenderTriggered"];
  const onServerPrefetch: (typeof import("vue"))["onServerPrefetch"];

  // Vue Watchers
  const watch: (typeof import("vue"))["watch"];
  const watchEffect: (typeof import("vue"))["watchEffect"];
  const watchPostEffect: (typeof import("vue"))["watchPostEffect"];
  const watchSyncEffect: (typeof import("vue"))["watchSyncEffect"];

  // Vue Composition API
  const provide: (typeof import("vue"))["provide"];
  const inject: (typeof import("vue"))["inject"];
  const useAttrs: (typeof import("vue"))["useAttrs"];
  const useSlots: (typeof import("vue"))["useSlots"];
  const useTemplateRef: (typeof import("vue"))["useTemplateRef"];
  const getCurrentInstance: (typeof import("vue"))["getCurrentInstance"];
  const getCurrentScope: (typeof import("vue"))["getCurrentScope"];
  const onScopeDispose: (typeof import("vue"))["onScopeDispose"];
  const effectScope: (typeof import("vue"))["effectScope"];

  // Vue Advanced
  const nextTick: (typeof import("vue"))["nextTick"];
  const defineComponent: (typeof import("vue"))["defineComponent"];
  const defineAsyncComponent: (typeof import("vue"))["defineAsyncComponent"];
  const resolveComponent: (typeof import("vue"))["resolveComponent"];
  const createApp: (typeof import("vue"))["createApp"];
  const h: (typeof import("vue"))["h"];
  const markRaw: (typeof import("vue"))["markRaw"];
  const toRaw: (typeof import("vue"))["toRaw"];
  const triggerRef: (typeof import("vue"))["triggerRef"];
  const customRef: (typeof import("vue"))["customRef"];

  // Vue Router
  const useRoute: (typeof import("vue-router"))["useRoute"];
  const useRouter: (typeof import("vue-router"))["useRouter"];
  const onBeforeRouteLeave: (typeof import("vue-router"))["onBeforeRouteLeave"];
  const onBeforeRouteUpdate: (typeof import("vue-router"))["onBeforeRouteUpdate"];
}

// 导出类型以供其他地方使用
export type {
  Ref,
  ComputedRef,
  WritableComputedRef,
  UnwrapRef,
  ShallowRef,
  Reactive,
  DeepReadonly,
  UnwrapNestedRefs,
  App,
  Component,
  VNode,
  ComponentPublicInstance,
  DirectiveBinding,
  PropType,
  ExtractPropTypes,
  ExtractDefaultPropTypes,
  ExtractPublicPropTypes,
  InjectionKey,
  Slot,
  Slots,
  MaybeRef,
  MaybeRefOrGetter,
  EffectScope,
  RouteLocationNormalized,
  Router,
  RouteLocationNormalizedLoaded,
  NavigationGuardNext,
  RouteLocationRaw,
};
