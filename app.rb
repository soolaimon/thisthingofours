require 'sinatra'
require 'sinatra/activerecord'
require './environments'
require 'sinatra/json'
require './models/movie'
require './models/thing'
require 'pry'

get '/' do
  erb :index
end

get '/things' do
  erb :things
end

get '/things.json' do
  json Thing.all.reverse
end

get '/things/:id/movies.json' do
  json Thing.find(params[:id]).movies
end

get '/movie_search' do
  movies = Movie.search_rt(params[:query])
  movies.map! do |m| 
    movie = Movie.new
    movie.assign_rt_attributes(m)
    movie
  end
  json movies
end

