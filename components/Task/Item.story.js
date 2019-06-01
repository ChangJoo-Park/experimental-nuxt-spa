import { storiesOf } from '@storybook/vue';
import Item from './Item.vue'

storiesOf('Item', module)
  .add('기본 태스크 아이템', () => ({
    components: { Item },
    template: '<item />',
  }));
