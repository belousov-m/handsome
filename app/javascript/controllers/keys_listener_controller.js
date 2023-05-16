import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  upHandler(event) {
    console.log('event', event.target.querySelector('#up-link'));
    event.target.querySelector('#up-link').click()
  }

  downHandler(event) {
    event.target.querySelector('#down-link').click()
  }

  rightHandler(event) {
    event.target.querySelector('#right-link').click()
  }

  leftHandler(event) {
    event.target.querySelector('#left-link').click()
  }

  escHandler(event) {
    event.target.querySelector('#esc-link').click()
  }
}