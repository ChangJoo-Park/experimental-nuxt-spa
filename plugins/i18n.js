import Vue from 'vue'
import VueI18n from 'vue-i18n'

/**
 * Locale EN
 */
/**
 * Locale KO
 */
const ko = {
  common: {
    welcome: '환영합니다.',
    email: '이메일',
    password: '비밀번호',
    username: '사용자 이름'
  },
  auth: {
    signin: '로그인',
    signout: '로그아웃',
    signup: '가입',
    doLogin: '시작하기',
    doSignup: '가입하기',
    needSignUp: '아직 계정이 없으신가요?',
    alreadySignUp: '이미 가입하셨나요?'
  },
  item: {
    title: '내용',
    note: '메모',
    dueAt: '마감일',
    priority: {
      high: '높음',
      medium: '중간',
      low: '낮음'
    },
    action: {
      save: '저장',
      edit: '수정',
      done: '완료',
      todo: '할일'
    }
  }
}

// Tell Vue to use our plugin
Vue.use(VueI18n)

export default ({ app }) => {
  // Set the i18n instance on app
  // This way we can use it globally in our components through this.$i18n
  app.i18n = new VueI18n({
    // Set the initial locale
    locale: 'ko',

    // Set the fallback locale in case the current locale can't be found
    fallbackLocale: 'ko',

    // Associate each locale to a content file
    messages: {
      en: {},
      ko
    }
  })
}
