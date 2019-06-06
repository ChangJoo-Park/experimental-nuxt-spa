// FIXME: queryString 만들기 수정
const makeItemsQuery = query => {
  const { done = '', list = null } = query
  const doneQuery = done ? `done=${done}` : ''
  const listQuery = list ? `list=${list}` : ''
  const joinQuery = [doneQuery, listQuery].filter(q => !!q).join('&')
  return joinQuery ? `?${joinQuery}` : ''
}
export default $axios => {
  const all = query => {
    return $axios.get(`/api/items${makeItemsQuery(query)}`)
  }

  const getCompleted = query => {
    return $axios.get(`/api/items${makeItemsQuery(query)}`)
  }
  const getActivated = query => {
    return $axios.get(`/api/items${makeItemsQuery(query)}`)
  }

  const findOne = (uuid, option) => {
    return $axios.get(`/api/items/${uuid}`)
  }

  const create = (title, list) => $axios.post(`/api/items/`, { title, list })

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
