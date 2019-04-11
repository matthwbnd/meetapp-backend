'use strict'

const User = use('App/Models/User')

class UserController {
  async index ({ auth }) {
    return auth.user.first_login
  }

  async store ({ request }) {
    const data = request.only(['name', 'email', 'password'])

    const user = await User.create(data)

    return user
  }

  async show ({ auth }) {
    const user = await User.findOrFail(auth.user.id)

    await user.load('preferences')

    return user
  }

  async update ({ request, auth }) {
    const user = await User.findOrFail(auth.user.id)
    const { preferences, ...data } = request.only([
      'name',
      'password',
      'preferences'
    ])

    user.merge(data)

    if (preferences && preferences.length > 0) {
      await user.preferences().sync(preferences)
      await user.merge({ first_login: false })
    }

    await user.save()
    await user.load('preferences')

    return user
  }
}

module.exports = UserController
