Rails.application.routes.draw do
  default_url_options :host => "localhost:3000"

  root to: 'pages#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # config/routes.rb 
  namespace :api do
    namespace :v1 do
      resources :products
    end
  end

  post '/rails/active_storage/direct_uploads', to: 'direct_uploads#create'

end
