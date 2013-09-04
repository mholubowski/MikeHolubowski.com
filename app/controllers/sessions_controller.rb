class SessionsController < ApplicationController

  layout 'who_blogs_anyway'

  def new
    return redirect_to admin_posts_path if logged_in?
  end

  def create
    user = User.find_by_email(params[:email])
    if user.password == params[:password]
      session[:auth_token] = user.auth_token
      return redirect_to admin_posts_path
    else
      flash.now[:error] = "Invalid email or password."
      return render :new
    end
  end

  def destroy
    if !logged_in?
      return redirect_to login_path
    else
      reset_session
      flash[:success] = "Logged out!"
      return redirect_to login_path
    end
  end

end
