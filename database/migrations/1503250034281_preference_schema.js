'use strict'

const Schema = use('Schema')

class PreferenceSchema extends Schema {
  up () {
    this.create('preferences', table => {
      table.increments()
      table.string('title').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('preferences')
  }
}

module.exports = PreferenceSchema
