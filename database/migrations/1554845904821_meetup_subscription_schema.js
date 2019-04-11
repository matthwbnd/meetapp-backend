'use strict'

const Schema = use('Schema')

class MeetupSubscriptionSchema extends Schema {
  up () {
    this.create('meetup_subscriptions', table => {
      table.increments()
      table
        .integer('meetup_id')
        .unsigned()
        .references('id')
        .inTable('meetups')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetup_subscriptions')
  }
}

module.exports = MeetupSubscriptionSchema
