class HomeController < ApplicationController

	def bio
	end

	def contact
	end

	def intro
		@n = params[:n] || 7
	end

	def home
	end

	def projects
	end

	def rs155	
		render layout: 'rs155_layout'
	end
	
	def skills
	end

	def style_test
	end
	
end
