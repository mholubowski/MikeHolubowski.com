class AddNameAndHighScoreToTrueFalsePlayers < ActiveRecord::Migration
  def change
    add_column :true_false_players, :name, :string
    add_column :true_false_players, :high_score, :integer
  end
end
