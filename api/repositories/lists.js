export default $axios => {
  const all = () => $axios.get(`/api/lists/`)
  const findOne = (uuid, state) =>
    $axios.get(`/api/lists/${uuid}?state=${state}`)
  const create = payload => $axios.post(`/api/lists/`, payload)
  const destroyOne = uuid => $axios.delete(`/api/lists/${uuid}`)
  return {
    all,
    create,
    findOne,
    destroyOne
  }
}
