class AddCastToMovie < ActiveRecord::Migration
  def change
    add_column :movies, :cast, :string, array: true, default: []
  end
end
