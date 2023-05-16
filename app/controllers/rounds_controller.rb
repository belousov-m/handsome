class RoundsController < ApplicationController
  before_action :set_round, except: %i[index]
  before_action :set_game

  def index
    @resources = Round.all
  end

  def show; end

  def correct_answer
    @round.bank += 100
    @round.save!
  end

  def prev_correct_answer
    return if @round.bank <= 0

    @round.bank -= 100
    @round.save!
  end

  def incorrect_answer
    @round.bank = 0
    @round.save!
  end

  def go_to_bank
    @game.bank += @round.bank
    @game.save!

    @round.bank = 0
    @round.save!
  end

  def reset
    @game.bank = 0
    @game.save!

    @round.bank = 0
    @round.save!
  end

  private

  def set_round
    @round = Round.find(params[:id])
  end

  def set_game
    @game = Game.take
  end
end
