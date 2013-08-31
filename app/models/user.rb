class User < ActiveRecord::Base
  has_many :posts, :dependent => :destroy

  attr_accessible :name, :email, :password

  before_create :create_auth_token
  # before_save :encrypt_password # callback calls encrypt method before password is saved

  validates :name, presence: true, length: { maximum: 50 }

  validates :email, presence: true,
                    uniqueness: { case_sensitive: false }

  validates_presence_of :password, :on => :create

  def password
    @password ||= Password.new(self.password_digest)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_digest = @password
  end

  # def self.authenticate(email, password)
  #   user = find_by_email(email)
  #   if user && user.password == BCrypt::Engine.hash_secret(password, user.password_salt)
  #     user
  #   else
  #     nil
  #   end
  # end

  private

  def create_auth_token
    self.auth_token = SecureRandom.hex(10)
  end

end
