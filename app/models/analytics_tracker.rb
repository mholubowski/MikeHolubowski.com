class AnalyticsTracker < ActiveRecord::Base
  belongs_to :post
  attr_accessible :facebook_views, :hacker_news_views, :other_views, :reddit_views, :total_views, :twitter_views, :last_viewed_at

  def track(params)
    # pull apart the request object to inc appropriate views
    referrer = params[:referrer]
    if referrer.nil?
      self.increment(:other_views, 1)
      self.increment(:total_views, 1)
    else
      self.increment(:referrer.to_sym, 1)
      self.increment(:total_views, 1)
    end
    self.last_viewed_at = Time.now
    self.save
  end
end
