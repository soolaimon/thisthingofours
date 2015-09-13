class AddMoreRtColumnsToMovie < ActiveRecord::Migration
  def change
    add_column :movies, :release_year, :integer 
    add_column :movies, :critics_score, :integer
    add_column :movies, :mpaa_rating, :string
    add_column :movies, :rt_synopsis, :text 
    add_column :movies, :imdb_id, :string 
    add_column :movies, :rt_link, :string
    add_column :movies, :runtime, :integer 
    add_column :movies, :director, :string, array: true, default: []
  end
end
