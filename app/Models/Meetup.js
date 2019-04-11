'use strict'

const Model = use('Model')

class Meetup extends Model {
  static get dates () {
    return super.dates.concat(['date'])
  }

  file () {
    return this.belongsTo('App/Models/File')
  }

  preferences () {
    return this.belongsToMany('App/Models/Preference').pivotModel(
      'App/Models/MeetupPreference'
    )
  }

  subscriptions () {
    return this.hasMany('App/Models/MeetupSubscription')
  }

  users () {
    return this.belongsToMany('App/Models/Meetup')
  }
}

module.exports = Meetup
