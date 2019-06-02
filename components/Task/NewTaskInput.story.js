import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import NewTaskInput from './NewTaskInput.vue'

storiesOf('태스크 추가 컴포넌트', module)
  .add('기본 레이아웃', () => ({
    components: { NewTaskInput },
    template: '<new-task-input @on-submit="action" />',
    methods: { action: action('clicked') }
  }));
