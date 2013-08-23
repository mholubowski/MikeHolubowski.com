class Admin::PostsController < ApplicationController
  layout 'who_blogs_anyway'

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(params[:post])
    if @post.save
      redirect_to post_path(@post)
    else
      render :new
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
