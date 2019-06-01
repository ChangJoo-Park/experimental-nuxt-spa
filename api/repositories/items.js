export default $axios => {
  const all = () => {
    return $axios.get(`/api/items/`)
  }

  const findOne = (uuid, option) => {
    return $axios.get(`/api/items/${uuid}`)
  }

  const create = payload => {
    return $axios.post(`/api/items/`, payload)
  }

  const patchOne = (uuid, option) => {
    return $axios.patch(`/api/items/${uuid}`)
  }

  const destroyOne = (uuid, option) => {
    return $axios.delete(`/api/items/${uuid}`)
  }

  return { all, findOne, create, patchOne, destroyOne }
}
