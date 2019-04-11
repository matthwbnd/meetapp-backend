'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.get('/', 'UserController.index')
  Route.get('profile', 'UserController.show')
  Route.put('profile', 'UserController.update').validator('UserUpdate')

  Route.post('files', 'FileController.store').validator('FileCreate')

  Route.resource('meetups', 'MeetupController')
    .apiOnly()
    .validator(new Map([[['meetups.store'], ['Meetup']]]))
  Route.post('meetups/:id/subscribe', 'MeetupSubscriptionController.store')
  Route.delete('meetups/:id/subscribe', 'MeetupSubscriptionController.destroy')
}).middleware(['auth'])
