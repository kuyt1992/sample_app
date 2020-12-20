FROM ruby:2.7.2

# 必要なパッケージのインストール（基本的に必要になってくるものだと思うので削らないこと）       
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
# 作業ディレクトリの作成、設定
RUN mkdir /myapp
##作業ディレクトリ名をAPP_ROOTに割り当てて、以下$APP_ROOTで参照
ENV APP_ROOT /myapp
WORKDIR $APP_ROOT

# ホスト側（ローカル）のGemfileを追加する
COPY Gemfile $APP_ROOT/Gemfile
COPY Gemfile.lock $APP_ROOT/Gemfile.lock

# Gemfileのbundle install
RUN bundle install
COPY . $APP_ROOT

# # コンテナが起動するたびに実行されるスクリプトを追加
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3001

# メインプロセス開始
CMD ["rails", "server", "-b", "0.0.0.0"]
