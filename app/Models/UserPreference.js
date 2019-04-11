'use strict'

const Model = use('Model')

class UserPreference extends Model {
  user () {
    this.belongsTo('App/Models/User')
  }
}

module.exports = UserPreference
