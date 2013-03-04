desc "This task is called by the Heroku cron add-on"
task :call_page => :environment do
   uri = URI.parse('http://www.mikeholubowski.com/')
   Net::HTTP.get(uri)
   puts 'Pinged the site!'
end