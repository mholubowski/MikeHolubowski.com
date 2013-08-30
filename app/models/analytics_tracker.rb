class AnalyticsTracker < ActiveRecord::Base
  belongs_to :post
  attr_accessible :facebook_views, :hacker_news_views, :other_views, :reddit_views, :total_views, :twitter_views
end
