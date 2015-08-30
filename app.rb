require 'sinatra'
require 'sinatra/activerecord'
require './environments'
require 'sinatra/json'
require './models/movie'


get '/' do
  send_file './views/index.html'
end

get '/movies/' do
  json  movies: Movie.all 
end
