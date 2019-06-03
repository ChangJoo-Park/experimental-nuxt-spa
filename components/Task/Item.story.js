import { storiesOf } from '@storybook/vue'
import Item from './Item.vue'
const dummy = {
  _id: '5cf3bb61e32bb24db4a2dcc6',
  title: '아이템 이름 헬로월드',
  userId: '5cf32a57f658e339bcf29cb4',
  startDate: null,
  endDate: null,
  startTime: null,
  endTime: null,
  list: [],
  assigned: null,
  done: false,
  projectId: null,
  priority: 'medium'
}

storiesOf('Item', module).add('기본 태스크 아이템', () => ({
  components: { Item },
  data: function() {
    return {
      item: dummy
    }
  },
  template: `<item :item="item" />`
}))
