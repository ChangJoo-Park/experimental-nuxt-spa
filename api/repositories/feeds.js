export default $axios => {
  const all = () => $axios.get(`/api/feeds/`)
  const create = payload => $axios.post(`/api/feeds/`, payload)

  return {
    all,
    create
  }
}
