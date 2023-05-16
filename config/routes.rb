Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'rounds#index'

  # resources :games
  # resources :players
  # resources :questions
  resources :rounds do
    member do
      post :correct_answer
      post :prev_correct_answer
      post :incorrect_answer
      post :go_to_bank
      post :reset
    end
  end
end
