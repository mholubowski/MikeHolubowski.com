class User < ActiveRecord::Base
  attr_accessible :auth_token, :email, :name, :password_digest, :references
end
