class Post < ActiveRecord::Base
  belongs_to :user
  attr_accessible :body, :status, :title, :url_alias



end
