'use strict'

const Antl = use('Antl')

class UserUpdate {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'string',
      password: 'confirmed',
      preferences: 'array'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UserUpdate
