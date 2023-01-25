Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'posts/index'
      post 'posts/create'
      get '/show/:id', to: 'posts#show'
      delete '/destroy/:id', to: 'posts#destroy'
      patch '/update/:id', to: 'posts#update'
      get '/edit/:id', to: 'posts#edit'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
