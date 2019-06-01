import createRepository from '~/api/repositories'

export default (ctx, inject) => {
  inject('repo', { ...createRepository(ctx.$axios) })
}
