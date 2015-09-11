class CreateThings < ActiveRecord::Migration
  def change
    create_table "things" do |t|
      t.string :name
      t.datetime :date
      t.string :location
      t.integer :movie_limit
    end

    add_column :movies, :user_id, :integer

  end
end
