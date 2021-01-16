Rails.application.routes.draw do
  get 'api/users', to: "users#index"
  post 'api/users' => 'users#create'
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
