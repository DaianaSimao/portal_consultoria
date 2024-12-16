Rails.application.routes.draw do
  root 'pages#index'
  resources :contacts, only: [:create]
end
