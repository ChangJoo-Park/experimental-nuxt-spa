import { mongo } from '../database'

const findAll = () => {
  console.log('database => ', mongo)
  console.log('findAll')
}

export default {
  findAll
}
