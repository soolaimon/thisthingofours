class ChangeWatchedOnToWatchedIn < ActiveRecord::Migration
  def change
    remove_column :movies, :watched_on
    add_column :movies, :watched_in, :datetime
  end
end
