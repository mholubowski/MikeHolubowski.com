class AddNameAndHighScoreToSetPlayers < ActiveRecord::Migration
  def change
    add_column :set_players, :name, :string
    add_column :set_players, :high_score, :integer
  end
end
