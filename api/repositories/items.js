import qs from 'qs'

export default $axios => {
  const find = query => {
    return $axios.get(`/api/items?${qs.stringify(query)}`)
  }

  const findOne = (uuid, option) => {
    return $axios.get(`/api/items/${uuid}`)
  }

  const create = (title, list) => $axios.post(`/api/items/`, { title, list })

  const updateOne = (uuid, option) => {
    const payload = Object.assign({}, option)
    delete payload._id
    return $axios.put(`/api/items/${uuid}`, payload)
  }
  const patchOne = (uuid, option) => {
    return $axios.patch(`/api/items/${uuid}`, option)
  }

  const destroyOne = (uuid, option) => {
    return $axios.delete(`/api/items/${uuid}`)
  }

  const toggleItemDone = (uuid, done) => {
    return $axios.patch(`/api/items/${uuid}`, {
      done: !done
    })
  }

  const changePriority = (uuid, priority) => {
    return $axios.patch(`/api/items/${uuid}`, {
      priority
    })
  }

  return {
    find,
    findOne,
    create,
    updateOne,
    patchOne,
    destroyOne,
    toggleItemDone,
    changePriority
  }
}
