class Post < ActiveRecord::Base
  attr_accessible :body, :reference, :status, :title, :url_alias
end
