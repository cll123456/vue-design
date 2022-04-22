import { describe, expect, test } from 'vitest'
import CommonMenuComp from './index.vue'
import { mount } from '@vue/test-utils'

function delay(time: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(1)
    }, time)
  })
}

describe('test commonMenuComp', () => {
  test('mount filterStr not exist', async () => {
    expect(CommonMenuComp).toBeTruthy()
    const wrapper = mount(CommonMenuComp, {
      props: {
        filterStr: '',
      },
    })
    // 延迟一会儿，等待dom更新
    await delay(10)

    expect(wrapper.get('div').get('div').classes()).toContain('flex-c')
  })

  test('mount filterStr exist', () => {
    expect(CommonMenuComp).toBeTruthy()
    const wrapper = mount(CommonMenuComp, {
      props: {
        filterStr: 'test',
      },
    })
    // 不存在组件，需要显示空的
    expect(wrapper.findAll('.el-empty').length).toBe(1)
  })
})
