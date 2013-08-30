class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :num
  helper_method :current_user, :logged_in?, :markdown

  def num
    @num = params[:num]
  end

  def logged_in?
    current_user.present?
  end

  def must_be_logged_in
    reject_unauthorized(logged_in?, login_path)
  end

  def reject_unauthorized(authorized, path=login_path)
    respond_to do |format|
      format.html { return redirect_to path unless authorized }
      format.json { return render json: {}  unless authorized }
    end
  end

  private

  def current_user
    @current_user ||= User.find_by_auth_token(session[:auth_token]) if session[:auth_token]
  end

  def markdown(text)
    @markdown ||= Redcarpet::Markdown.new(Redcarpet::Render::HTML,
      autolink: true, no_intra_emphasis: true, fenced_code_blocks: true)
    @markdown.render(text).html_safe
  end

end
