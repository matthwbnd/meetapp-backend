'use strict'

const Preference = use('App/Models/Preference')

class PreferenceSeeder {
  async run () {
    const preferences = [
      {
        title: 'backend'
      },
      {
        title: 'frontend'
      },
      {
        title: 'mobile'
      },
      {
        title: 'devops'
      },
      {
        title: 'management'
      },
      {
        title: 'marketing'
      }
    ]

    await Preference.createMany(preferences)
  }
}

module.exports = PreferenceSeeder
