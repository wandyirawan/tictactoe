class Game < ApplicationRecord
  validates :current_player, presence: true
  validates :board, presence: true
end
