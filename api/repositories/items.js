export default $axios => {
  const all = () => {
    return $axios.get(`/api/items/`)
  }

  const getCompleted = () => {
    return $axios.get(`/api/items?done=true`)
  }
  const getActivated = () => {
    return $axios.get(`/api/items?done=false`)
  }

  const findOne = (uuid, option) => {
    return $axios.get(`/api/items/${uuid}`)
  }

  const create = title => $axios.post(`/api/items/`, { title })

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
    all,
    getCompleted,
    getActivated,
    findOne,
    create,
    patchOne,
    destroyOne,
    toggleItemDone,
    changePriority
  }
}
