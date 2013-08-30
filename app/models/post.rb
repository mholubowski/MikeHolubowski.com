class Post < ActiveRecord::Base
  include Redcarpet
  belongs_to :user
  has_one :analytics_tracker
  before_create :create_analytics_tracker

  attr_accessible :body, :status, :title, :url_alias

  def active?
    status == 'active'
  end

  def inactive?
    status == 'inactive'
  end

  def self.render_markdown content
    @redcarpet ||= Markdown.new(Redcarpet::Render::HTML, :autolink => true, :space_after_headers => true)
    @redcarpet.render(content)
  end

  def share_link (site=nil)
    return url if site.nil?
    url + "?refferer=#{site.to_s}"
  end

  def track(request)
    analytics_tracker.track(request)
  end

  private

  def url
    if Rails.env.development?
      "localhost:3000/blog/posts/#{id}"
    else
      "http://www.mikeholubowski.com/blog/posts/#{id}"
    end
  end

  def create_analytics_tracker
    self.analytics_tracker = AnalyticsTracker.create
  end

end
