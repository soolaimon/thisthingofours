require './app'
require 'dotenv'
require 'yaml'

run Sinatra::Application
set :public_folder, "./"

