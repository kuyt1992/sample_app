require 'rails_helper'

RSpec.describe "Posts", type: :request do
  describe "GET /posts" do
    before do
      @post1 = create(:post, content: "test1")
      @post2 = create(:post, content: "テスト投稿2")
      get posts_url
    end

    it "if getting posts list" do
      get posts_path
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it "投稿内容が表示されていること" do
      json = JSON.parse(response.body)
      expect(json).to match(/test1/)
      expect(json).to match(/テスト投稿2/)
    end
  end
end
