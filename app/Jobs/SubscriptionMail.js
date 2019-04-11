'use strict'

const Mail = use('Mail')

class SubscriptionMail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'SubscriptionMail-job'
  }

  async handle ({ name, email, meetup }) {
    console.log(`Job: ${SubscriptionMail.key}`)
    await Mail.send(
      ['emails.confirm_subscription'],
      { name, meetup },
      message => {
        message
          .to(email)
          .from('no-reply@meetapp.com.br', 'Meetapp')
          .subject('Confirmação de inscrição de meetup')
      }
    )
  }
}

module.exports = SubscriptionMail
