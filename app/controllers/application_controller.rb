class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :num

  def num
    @num = params[:num]
  end
end
