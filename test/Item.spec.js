import { mount } from '@vue/test-utils'
import Item from '@/components/Task/Item.vue'

describe('Item', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Item)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
