class GamesController < ApplicationController
  def index
    @game = Game.take
  end

  def new
    
  end
end
