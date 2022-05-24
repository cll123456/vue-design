import { describe, expect, test } from 'vitest'
import TextComp from './index.vue'
import { mount } from '@vue/test-utils'

describe('test textComp', () => {
  test('mount component', async () => {
    expect(TextComp).toBeTruthy()
    const wrapper = mount(TextComp)

    expect(wrapper.text()).toContain('双击编辑文字')
    // 测试双击
    await wrapper.trigger('dblclick')
    expect(wrapper.attributes('contenteditable')).toBe('true')
    // 双击后一定会有属性名select-none
    expect(wrapper.get('[contenteditable="true"]').classes()).toContain(
      'select-none',
    )
    // 测试输入
    wrapper.element.innerHTML = 'test'
    await wrapper.get('[contenteditable="true"]').trigger('input')
    expect(wrapper.text()).toContain('test')
    // 失去焦点后不能输入
    await wrapper.trigger('blur')
    expect(wrapper.attributes('contenteditable')).toBe('false')
  })
})
