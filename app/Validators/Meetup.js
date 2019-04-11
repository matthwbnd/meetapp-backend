'use strict'

const Antl = use('Antl')

class Meetup {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      description: 'required',
      localization: 'required',
      date: 'required|date',
      image: 'required|integer',
      preferences: 'required|array'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Meetup
