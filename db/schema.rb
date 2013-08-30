# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130830041040) do

  create_table "analytics_trackers", :force => true do |t|
    t.integer  "twitter_views"
    t.integer  "hacker_news_views"
    t.integer  "reddit_views"
    t.integer  "facebook_views"
    t.integer  "other_views"
    t.integer  "total_views"
    t.integer  "post_id"
    t.datetime "last_viewed_at"
    t.datetime "created_at",        :null => false
    t.datetime "updated_at",        :null => false
  end

  add_index "analytics_trackers", ["post_id"], :name => "index_analytics_trackers_on_post_id"

  create_table "high_scores", :force => true do |t|
    t.string   "game"
    t.integer  "score"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "posts", :force => true do |t|
    t.string   "title"
    t.text     "body"
    t.string   "status"
    t.string   "url_alias"
    t.integer  "user_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "set_players", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "name"
    t.integer  "high_score"
  end

  create_table "true_false_players", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "name"
    t.integer  "high_score"
  end

  create_table "users", :force => true do |t|
    t.string   "password_digest"
    t.string   "auth_token"
    t.string   "email"
    t.string   "name"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

end
