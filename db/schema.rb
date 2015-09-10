# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150831032131) do

  create_table "movies", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "watched_at"
    t.date     "scheduled_for"
    t.integer  "thing_id"
    t.integer  "rt_id"
    t.string   "rt_poster_profile", default: "http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default.gif"
    t.string   "rt_poster_thumb",   default: "http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default.gif"
    t.datetime "watched_in"
  end

end
