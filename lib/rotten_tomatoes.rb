require 'httparty'
require 'dotenv'
Dotenv.load
module RottenTomatoes
  BASE_URL = "http://api.rottentomatoes.com/api/public/v1.0"
  API_KEY = ENV['ROTTEN_TOMATOES_KEY'] 


  def self.included(base)
    base.extend(ClassMethods)
  end

  def get(id)
    JSON.parse(HTTParty.get(URI.escape("#{BASE_URL}/movies/#{id}.json?apikey=#{API_KEY}")))
  end

  module ClassMethods
    def search(q)
      JSON.parse(HTTParty.get(URI.escape("#{BASE_URL}/movies.json?apikey=#{API_KEY}&q=#{q}")))
    end
  end

end