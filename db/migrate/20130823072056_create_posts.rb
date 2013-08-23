class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :body
      t.string :status
      t.string :url_alias
      t.belongs_to :user

      t.timestamps
    end
  end
end
