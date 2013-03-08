class CreateTrueFalsePlayers < ActiveRecord::Migration
  def change
    create_table :true_false_players do |t|

      t.timestamps
    end
  end
end
