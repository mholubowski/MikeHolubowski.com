class Admin::PostsController < ApplicationController
  layout 'who_blogs_anyway'

  def show
    @post = Post.find(params[:id])
  end

  def index
    @posts = Post.order('id DESC')
  end

  def table_view
    @posts = Post.order('id DESC')
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
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    # TODO add error handling
    @post.update_attributes(params[:post])
  end

  def destroy
  end

  def render_markdown
    # binding.pry
    content = params[:content]
    render text: Post.render_markdown(content)
  end
end
