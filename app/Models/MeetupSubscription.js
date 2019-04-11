'use strict'

const Model = use('Model')

class MeetupSubscription extends Model {
  meetup () {
    return this.belongsToMany('App/Models/Meetup').pivotTable(
      'meetup_subscriptions'
    )
  }

  user () {
    return this.belongToMany('App/Models/User').pivotTable(
      'meetup_subscriptions'
    )
  }
}

module.exports = MeetupSubscription
