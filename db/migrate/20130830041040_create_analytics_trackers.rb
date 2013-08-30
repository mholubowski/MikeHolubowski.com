class CreateAnalyticsTrackers < ActiveRecord::Migration
  def change
    create_table :analytics_trackers do |t|
      t.integer :twitter_views
      t.integer :hacker_news_views
      t.integer :reddit_views
      t.integer :facebook_views
      t.integer :other_views
      t.integer :total_views
      t.references :post
      t.datetime :last_viewed_at

      t.timestamps
    end
    add_index :analytics_trackers, :post_id
  end
end
