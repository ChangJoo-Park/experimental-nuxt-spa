export default $axios => {
  const signin = payload => $axios.post(`/api/auth/signin`, payload)
  const signup = payload => $axios.post(`/api/auth/signup`, payload)
  return { signin, signup }
}
