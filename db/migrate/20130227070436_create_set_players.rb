class CreateSetPlayers < ActiveRecord::Migration
  def change
    create_table :set_players do |t|

      t.timestamps
    end
  end
end
