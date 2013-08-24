# http://serverfault.com/questions/384063/how-can-i-avoid-heroku-stopping-my-dyno
desc "Populate db with blog data"
task :populate => :environment do
  User.create(email:'mike.holubowski@gmail.com', name: 'Mike Holubowski', password: 'Mike12321')
  user = User.last

  titles = ['The Economics of Surfing', 'Why I code for America', 'My Economics degree taught me to forget about my Economics degree', 'Why I\'m training for a triathalon']

  body = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, nulla incidunt tempora iure asperiores nihil officia ullam laboriosam distinctio maiores libero impedit sint animi nobis ad eum deserunt quae in!'
  titles.each do |title|
    post = Post.new do |p|
      p.user = user
      p.title = title
      p.body = body
      p.url_alias = 'temp-url-alias'
      p.status = ['inactive','active'].shuffle.first
    end

    post.save
    puts "Created: #{title}"
  end
end
