'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserPreferencesSchema extends Schema {
  up () {
    this.create('user_preferences', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('preference_id')
        .unsigned()
        .references('id')
        .inTable('preferences')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_preferences')
  }
}

module.exports = UserPreferencesSchema
