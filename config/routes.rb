Mikeholubowski::Application.routes.draw do

  get "set_player/new"

  get "set_player/create"

  root to: 'home#intro'
  get "greetings/hello"

  match '/bio'      => 'home#bio'
  match '/contact'  => 'home#contact'
  match '/intro'    => 'home#intro'
  match '/projects' => 'home#projects'
  match '/skills'   => 'home#skills'
  match '/style'    => 'home#styleTest'

  match '/projects/alliance'     => 'project#alliance' 
  match '/projects/alliedgreeks' => 'project#alliedgreeks' 
  match '/projects/ball' => 'project#ball' 
  match '/projects/efp'          => 'project#efp' 
  match '/projects/followalong'  => 'project#followalong' 
  match '/projects/ivlaundry'    => 'project#ivlaundry' 
  match '/projects/mikeho'       => 'project#mikeho'
  match '/projects/outfit'       => 'project#outfit'
  match '/projects/set'          => 'project#set'
  match '/projects/true_false'   => 'project#true_false'

  resources :set_players
  resources :true_false_players
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
