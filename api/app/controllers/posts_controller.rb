class PostsController < ApplicationController

	def index
		@post = Post.all
		render json: @post
	end

	def create
		@post = Post.create(content: params[:content])
    render json: @post
	end

	def update
		@post = Post.find(params[:id])
		@post.update_attributes(content: params[:content])
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

end
