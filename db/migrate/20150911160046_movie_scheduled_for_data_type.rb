class MovieScheduledForDataType < ActiveRecord::Migration
  def change
    change_column :movies, :scheduled_for, :integer
  end
end
