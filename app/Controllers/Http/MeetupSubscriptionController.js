'use strict'

const MeetupSubscription = use('App/Models/MeetupSubscription')
const Meetup = use('App/Models/Meetup')
const Kue = use('Kue')
const Job = use('App/Jobs/SubscriptionMail')

class MeetupSubscriptionController {
  async store ({ request, response, auth, params }) {
    const user = auth.user.id
    const meetup = params.id

    const checkIfSubscribed = await MeetupSubscription.query()
      .where('meetup_id', meetup)
      .where('user_id', user)
      .fetch()

    const meetupData = await Meetup.find(meetup)

    if (checkIfSubscribed.rows.length >= 1) {
      return response.status(401).send({
        error: {
          message: 'Você já está inscrito neste meetup'
        }
      })
    }

    await MeetupSubscription.create({
      meetup_id: meetup,
      user_id: user
    })

    Kue.dispatch(
      Job.key,
      {
        name: auth.user.name,
        email: auth.user.email,
        meetup: meetupData.title
      },
      { attempts: 3 }
    )

    return response.status(200).send({
      success: {
        message: 'Você está inscrito neste meetup'
      }
    })
  }

  async destroy ({ request, response, auth, params }) {
    const user = auth.user.id
    const meetup = params.id

    const checkIfSubscribed = await MeetupSubscription.query()
      .where('meetup_id', meetup)
      .where('user_id', user)
      .fetch()

    if (checkIfSubscribed.rows.length === 1) {
      await MeetupSubscription.query()
        .where('meetup_id', meetup)
        .where('user_id', user)
        .delete()
      return response.status(200).send({
        success: {
          message: 'Você não está mais inscrito neste meetup'
        }
      })
    }
    return response.status(401).send({
      error: {
        message: 'É preciso de inscrever primeiro!'
      }
    })
  }
}

module.exports = MeetupSubscriptionController
