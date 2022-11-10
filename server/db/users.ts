import connection from './connection'
import { generateHash } from 'authenticare/server'
import { User } from '../../common/User'


export function createUser(user: User, db = connection) {
  const newUser = { ...user }
  if (newUser.password)
    return generateHash(newUser.password).then((passwordHash) => {
      newUser.hash = passwordHash
      delete newUser.password
      return db('users').insert(newUser)
    })
}

export function userExists(username: string, db = connection) {
  return db('users')
    .where('username', username)
    .then((users) => users.length > 0)
}

export function getUserByUsername(username: string, db = connection) {
  return db('users').where('username', username).first()
}
