class User < ActiveRecord::Base
  has_many :posts
  attr_accessible :auth_token, :email, :name, :password_digest, :references
end
