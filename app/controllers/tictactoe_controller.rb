class TictactoeController < ApplicationController
  def save_game
    @game = Game.new(game_params)

    print(@game)
    if @game.save
      # Successfully saved
      render json: { message: 'Game saved successfully' }
    else
      # Handle validation errors or other issues
      render json: { error: 'Failed to save game' }, status: :unprocessable_entity
    end
  end

  private

  def game_params
    params.require(:tictactoe).permit(:current_player, :board, :winner)
  end
end
