require_relative '../lib/rotten_tomatoes'

class Movie < ActiveRecord::Base
  include RottenTomatoes

end
