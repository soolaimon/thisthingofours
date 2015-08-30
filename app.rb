require 'sinatra'
require 'sinatra/activerecord'
require './environments'

get '/' do
  send_file './views/index.html'
end