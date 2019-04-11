'use strict'

const Model = use('Model')

class File extends Model {
  meetup () {
    return this.hasOne('App/Models/Meetup')
  }
}

module.exports = File
