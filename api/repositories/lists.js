export default $axios => {
  const all = () => $axios.get(`/api/lists/`)
  const create = payload => $axios.post(`/api/lists/`, payload)
  const destroyOne = uuid => $axios.delete(`/api/lists/${uuid}`)
  return {
    all,
    create,
    destroyOne
  }
}
