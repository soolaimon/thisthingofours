require 'httparty'
require 'dotenv'
Dotenv.load
module RottenTomatoes
  BASE_URL = "http://api.rottentomatoes.com/api/public/v1.0"
  API_KEY = ENV['ROTTEN_TOMATOES_KEY'] 


  def self.included(base)
    base.extend(ClassMethods)
  end


  module ClassMethods
    def get_from_rt(id)
      JSON.parse(HTTParty.get(URI.escape("#{BASE_URL}/movies/#{id}.json?apikey=#{API_KEY}")))
    end
    
    def search_rt(q)
      JSON.parse(HTTParty.get(URI.escape("#{BASE_URL}/movies.json?apikey=#{API_KEY}&q=#{q}")))["movies"]
    end
  end

end