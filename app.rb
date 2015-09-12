require 'sinatra'
require 'sinatra/activerecord'
require './environments'
require 'sinatra/json'
require './models/movie'
require './models/thing'


get '/' do
  erb :index
end

get '/things' do
  erb :things
end

get '/thing_ids.json' do
  json Thing.all.pluck(:id)
end

get '/things.json' do
  json Thing.all
end

get '/things/:id/movies.json' do
  json Thing.find(params[:id]).movies
end
