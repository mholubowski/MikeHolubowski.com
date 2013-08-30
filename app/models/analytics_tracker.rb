class AnalyticsTracker < ActiveRecord::Base
  belongs_to :post
  attr_accessible :facebook_views, :hacker_news_views, :other_views, :reddit_views, :total_views, :twitter_views, :last_viewed_at

  def track(params)
    # TODO even if referrer != one of the above websites, it doesn't inc other
    referrer = params[:referrer]
    unless referrer && known_sites.include?(referrer.to_sym)
      self.increment(:other_views, 1)
      self.increment(:total_views, 1)
    else
      method = referrer+'_views'
      self.increment(method.to_sym, 1)
      self.increment(:total_views, 1)
    end
    self.last_viewed_at = Time.now
    self.save
  end

  def known_sites
    [:facebook, :hacker_news, :reddit, :twitter]
  end
end
