require_relative '../lib/rotten_tomatoes'

class Movie < ActiveRecord::Base
  include RottenTomatoes

  belongs_to :thing

end
