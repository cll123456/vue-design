export default {
  TextComp: defineAsyncComponent(
    () => import('@/components/logicComps/commons/TextComp/index.vue'),
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as { [key: string]: any }
