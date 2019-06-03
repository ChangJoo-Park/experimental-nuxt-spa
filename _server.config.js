let mongodb = 'mongodb://localhost:27017/task-management'

if (process.env.NODE_ENV === 'test') {
  mongodb = 'mongodb://localhost:27017/task-management-test'
}
export default {
  mongodb,
  secret: 'BdOsqQYBL(BmHCB.P>O;{lC&>(k?"^'
}
