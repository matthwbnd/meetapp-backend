'use strict'

const Schema = use('Schema')

class MeetupSchema extends Schema {
  up () {
    this.create('meetups', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('localization').notNullable()
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamp('date').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('meetups')
  }
}

module.exports = MeetupSchema
