class ProjectController < ApplicationController

	def outfit
	end

	def ivlaundry
	end

	def alliedgreeks
	end

	def followalong
	end

	def efp 
	end

	def alliance
	end

	def mikeho
	end

	def set
		@players = SetPlayer.all(
			order: 'high_score DESC',
			limit: 10)
	end
	
end
