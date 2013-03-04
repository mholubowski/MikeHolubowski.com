# http://serverfault.com/questions/384063/how-can-i-avoid-heroku-stopping-my-dyno
desc "This task is called by the Heroku cron add-on"
task :call_page => :environment do
   uri = URI.parse('http://www.mikeholubowski.com/')
   Net::HTTP.get(uri)
   puts 'Pinged the site!'
end