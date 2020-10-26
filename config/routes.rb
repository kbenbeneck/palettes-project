Rails.application.routes.draw do
  resources :tones, only: [:index]
  resources :palettes, only: [:index, :show]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
