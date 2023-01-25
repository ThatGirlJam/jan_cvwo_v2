class Api::V1::CommentsController < ApplicationController
  before_action :set_comment, only: %i[show destroy update edit]

  def index
    comment = Comment.all.order(created_at: :desc)
    render json: comment
  end

  def create
    comment = Comment.create!(post_params)
    if comment
      render json: comment
    else
      render json: comment.errors
    end
  end

  def show
    render json: @comment
  end

  def destroy
    @comment&.destroy
    render json: { message: 'Comment deleted!' }
  end

  def update
    comment = Comment.find(params[:id])
    if comment.update(comment_params)
        render json: comment
    else
        render json: comment.errors
    end
  end

  def edit
    render json: @comment
  end

  private

  def post_params
    params.permit(:content, :commenter)
  end

  def set_post
    @comment = Comment.find(params[:id])
  end
end
