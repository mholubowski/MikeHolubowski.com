class SetPlayersController < ApplicationController

  def new
  	
  end

  def create
  	@setPlayer = SetPlayer.create(params[:set_player])
    if @setPlayer.save
      respond_to do |format|
        format.html do    
          redirect_to projects_set_path
        end
        format.js
      end
     else
      # render 'new'
    end
  end

end
