import Cookies from 'js-cookie'

export default function({ $axios }) {
  $axios.onRequest(config => {
    console.log('axios')
    config.headers.common.authorization = Cookies.get('authorization')
  })
}
