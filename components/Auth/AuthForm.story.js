import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'

import AuthForm from './AuthForm.vue'

storiesOf('Auth Form', module)
  .add('SignUp', () => ({
    components: { AuthForm },
    template: '<AuthForm signup @on-submit="action" />',
    methods: { action: action('submitted') }
  }))
  .add('Login', () => ({
    components: { AuthForm },
    template: '<AuthForm @on-submit="action" />',
    methods: { action: action('clicked') }
  }))
