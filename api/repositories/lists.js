export default $axios => {
  const all = () => $axios.get(`/api/lists/`)
  const create = payload => $axios.post(`/api/lists/`, payload)

  return {
    all,
    create
  }
}
