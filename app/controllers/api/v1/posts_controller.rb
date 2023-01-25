class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[show destroy update edit]

  def index
    post = Post.all.order(created_at: :desc)
    render json: post
  end

  def create
    post = Post.create!(post_params)
    if post
      render json: post
    else
      render json: post.errors
    end
  end

  def show
    render json: @post
  end

  def destroy
    @post&.destroy
    render json: { message: 'Post deleted!' }
  end

  def update
    post = Post.find(params[:id])
    if post.update(post_params)
        render json: post
    else
        render json: post.errors
    end
  end

  def edit
    render json: @post
  end

  private

  def post_params
    params.permit(:title, :image, :category, :bod)
  end

  def set_post
    @post = Post.find(params[:id])
  end
end
