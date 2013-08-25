class Post < ActiveRecord::Base
  include Redcarpet
  belongs_to :user
  attr_accessible :body, :status, :title, :url_alias


  def self.render_markdown content
    @redcarpet ||= Markdown.new(Redcarpet::Render::HTML, :autolink => true, :space_after_headers => true)
    @redcarpet.render(content)
  end

end
