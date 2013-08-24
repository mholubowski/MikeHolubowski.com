class Admin::PostsController < ApplicationController
  layout 'who_blogs_anyway'

  def show
  end

  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(params[:post]) do |p|
      p.user = current_user
    end

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
