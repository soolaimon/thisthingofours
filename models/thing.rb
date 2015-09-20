class Thing < ActiveRecord::Base
  has_many :movies

  def current?
   Date.today.year == id
  end
end