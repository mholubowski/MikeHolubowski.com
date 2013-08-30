class Post < ActiveRecord::Base
  include Redcarpet
  belongs_to :user
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

  private

  def url
    if Rails.env.development?
      "localhost:3000/blog/posts/#{id}"
    else
      "http://www.mikeholubowski.com/blog/posts/#{id}"
    end
  end

end
