import {filter} from './node_modules/lodash-es/lodash.js'

const users = [{name: '1', age: 20}, {name: '1', age: 10}]
const filterUsers = filter(users, user => user.age > 10);

console.log(1, filterUsers)