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
      expect(response).to be_successful
      expect(response).to have_http_status(200)
    end

    it "投稿一覧を取得できる" do
      json = JSON.parse(response.body)
      expect(json[0]["content"]).to eq @post1.content
      expect(json[1]["content"]).to eq @post2.content
    end
  end
end
