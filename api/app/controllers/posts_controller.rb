class PostsController < ApplicationController

  def index
    @post = Post.all
    render json: @post
  end

  def create
    @post = Post.create(post_params)
    render json: @post
  end

  def update
    @post = Post.find(params[:id])
    @post.update(post_params)
    render json: @post
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      head :no_content, status: :ok
    else
      render json: @issue.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:id, :content)
  end
end
