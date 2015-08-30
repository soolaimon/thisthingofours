class CreateMovie < ActiveRecord::Migration
  def change
    create_table "movies" do |t|
      t.string :title
      t.text :description
      t.datetime :watched_at
      t.date :scheduled_for
      t.integer :thing_id
      t.integer :thing_id
      t.integer :rt_id
      t.string   "rt_poster_profile", default: "http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default.gif"
      t.string   "rt_poster_thumb",   default: "http://d3biamo577v4eu.cloudfront.net/static/images/redesign/poster_default.gif"
    end
  end
end
