class SetPlayersController < ApplicationController

  def new
  	
  end

  def create
  	@setPlayer = SetPlayer.create(params[:set_player])
    if @setPlayer.save
      respond_to do |format|
        format.html do    
          flash.now[:success] = "Successful document upload!"
          redirect_to projects_set_path
        end
        format.js
      end
     else
      flash.now[:error] = "Please try again"
      render 'new'
    end
  end

end
