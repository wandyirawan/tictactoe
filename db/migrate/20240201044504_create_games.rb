class CreateGames < ActiveRecord::Migration[7.1]
  def change
    create_table :games do |t|
      t.string :current_player
      t.string :board
      t.string :winner

      t.timestamps
    end
  end
end
