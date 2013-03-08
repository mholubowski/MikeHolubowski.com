class TrueFalsePlayersController < ApplicationController

  def new
  	
  end

  def create
  	@trueFalsePlayer = TrueFalsePlayer.create(params[:true_false_player])
    if @trueFalsePlayer.save
      respond_to do |format|
        format.html do    
          redirect_to projects_true_false_path
        end
        format.js
      end
     else
      # render 'new'
    end
  end

end
