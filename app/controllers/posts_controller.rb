class PostsController < ApplicationController
  def index
    @posts = Post.order('id DESC')
  end

  def show
    @post = Post.find(params[:id])
    @post.track(params)
  end
end
