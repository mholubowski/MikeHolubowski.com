Mikeholubowski::Application.routes.draw do

  root to: 'home#intro'

  resources :sessions, only: [:new, :create, :destroy]
  match '/logout' => 'sessions#destroy'
  match '/login'  => 'sessions#new'

  scope '/blog' do
    resources :posts, only: [:index, :show]
  end

  match '/admin' => 'admin/posts#index', as: 'admin_root'
  match '/render_markdown' => 'admin/posts#render_markdown'
  namespace :admin do
    resources :posts
    match '/table_view' => 'posts#table_view', as: 'posts_table_view'
    post "posts/render_markdown"
  end

  get "greetings/hello"

  match '/bio'      => 'home#bio'
  match '/contact'  => 'home#contact'
  match '/intro'    => 'home#intro'
  match '/rs155'    => 'home#rs155'
  match '/projects' => 'home#projects'
  match '/skills'   => 'home#skills'
  match '/style'    => 'home#style_test'

  match '/projects/alliance'         => 'project#alliance'
  match '/projects/alliedgreeks'     => 'project#alliedgreeks'
  match '/projects/ato_rally_poster' => 'project#ato_rally_poster'
  match '/projects/ball'             => 'project#ball'
  match '/projects/efp'              => 'project#efp'
  match '/projects/followalong'      => 'project#followalong'
  match '/projects/ivlaundry'        => 'project#ivlaundry'
  match '/projects/mikeho'           => 'project#mikeho'
  match '/projects/outfit'           => 'project#outfit'
  match '/projects/set'              => 'project#set'
  match '/projects/true_false'       => 'project#true_false'

  get "set_player/new"
  get "set_player/create"
  resources :set_players
  resources :true_false_players

end
