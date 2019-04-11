'use strict'

const Meetup = use('App/Models/Meetup')
const moment = require('moment')

class MeetupController {
  async index ({ request, response, auth }) {
    const { filter, title } = request.only(['filter', 'title'])
    const page = request.input('page') || 1
    const today = moment().format('YYYY-MM-DD HH:mm:ss')
    let meetups = null

    switch (filter) {
      case 'notSub':
        meetups = Meetup.query()
          .where('date', '>', today)
          .whereDoesntHave('subscriptions', builder => {
            builder.where('user_id', auth.user.id)
          })
          .withCount('subscriptions')
          .orderBy('date', 'asc')
          .paginate(page, 4)
        return meetups
      case 'nearMeetups':
        meetups = Meetup.query()
          .where('date', '>', today)
          .whereHas('subscriptions', builder => {
            builder.where('user_id', auth.user.id)
          })
          .withCount('subscriptions')
          .orderBy('date', 'asc')
          .paginate(page, 4)
        return meetups
      case 'recommended':
        // Buscando as preferências do usuário
        const user = await auth.getUser()
        const userPreferences = await user.preferences().fetch()
        const preferences =
          userPreferences.toJSON().map(preference => preference.id) || []
        meetups = Meetup.query()
          .where('date', '>', today)
          .whereDoesntHave('subscriptions', builder => {
            builder.where('user_id', auth.user.id)
          })
          .whereHas(
            'preferences',
            builder => {
              builder.whereIn('preference_id', preferences)
            },
            '>',
            0
          )
          .withCount('subscriptions')
          .orderBy('date', 'asc')
          .paginate(page, 4)
        return meetups
      default:
        if (title) {
          meetups = await Meetup.query()
            .where('title', 'LIKE', `%${title}%`)
            .where('date', '>', today)
            .withCount('subscriptions')
            .paginate(page, 4)
          return meetups
        } else {
          meetups = await Meetup.query()
            .where('date', '>', today)
            .withCount('subscriptions')
            .with('preferences')
            .orderBy('date', 'asc')
            .paginate(page, 4)
          return meetups
        }
    }
  }

  async store ({ request, response, auth }) {
    // Buscando os campos preenchidos pelo usuário
    const { preferences, ...data } = request.only([
      'title',
      'description',
      'localization',
      'date',
      'image',
      'preferences'
    ])

    // Criando as informações do meetup na tabela 'meetups'
    const meetup = await Meetup.create({
      user_id: auth.user.id,
      title: data.title,
      description: data.description,
      localization: data.localization,
      date: data.date,
      file_id: data.image
    })

    // Salvando as preferências na tabela 'meetups_preferences'
    if (preferences && preferences.length > 0) {
      await meetup.preferences().attach(preferences)
    }
    await meetup.loadMany(['preferences', 'file'])

    return meetup
  }

  async show ({ params }) {
    const meetup = await Meetup.findOrFail(params.id)

    const subs = await meetup.subscriptions().fetch()
    const subsCount = subs.rows.length

    return { meetup, subsCount }
  }
}

module.exports = MeetupController
