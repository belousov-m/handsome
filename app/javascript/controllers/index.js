// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import KeysListenerController from "./keys_listener_controller"
import TimerController from "./timer_controller"
application.register("keys_listener", KeysListenerController)
application.register("timer", TimerController)
