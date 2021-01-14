namespace :db do
  desc "Apply ridgepole schemafile"
  task apply: :environment do
    ridgepole('--apply')
  end

  desc "Export ridgepole schemafile"
  task export: :environment do
    ridgepole('--export')
  end

  private

  # def config_file
  #   if Rails.env.development?
  #     'config/database.yml'
  #   elsif Rails.env.staging?
  #     'config/database.staging.yml'
  #   elsif Rails.env.production?
  #     'config/database.production.yml'
  #   else
  #     raise 'no configuration specified'
  #   end
  # end

  def ridgepole(*options)
    command = ['bundle exec ridgepole --file db/Schemafile', "-c config/database.yml", "-E #{Rails.env}"]
    system (command + options).join(' ')

    # unless Rails.env.production?
    #   Rake::Task['db:schema:dump'].invoke
    #   Rake::Task['db:test:prepare'].invoke
    #   Rails.root.join('db/schema.rb').delete
    # end
  end
end
