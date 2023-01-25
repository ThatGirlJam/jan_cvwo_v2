Rails.application.routes.draw do
  resources :comments
  namespace :api do
    namespace :v1 do
      get 'posts/index'
      post 'posts/create'
      get '/show/:id', to: 'posts#show'
      delete '/destroy/:id', to: 'posts#destroy'
      put '/update/:id', to: 'posts#update'
      get '/edit/:id', to: 'posts#edit'
      get 'comments/index'
      post 'comments/create'
      get '/comments/show/:id', to: 'comments#show'
      delete '/comments/destroy/:id', to: 'comments#destroy'
      put '/comments/update/:id', to: 'comments#update'
      get '/comments/edit/:id', to: 'comments#edit'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
