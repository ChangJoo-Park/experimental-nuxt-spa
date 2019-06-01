import { storiesOf } from '@storybook/vue';
import Logo from './Logo.vue'

storiesOf('Logo', module)
  .add('Logo Component', () => ({
    components: { Logo },
    template: '<logo />',
  }));
