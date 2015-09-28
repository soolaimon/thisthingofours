require_relative '../lib/rotten_tomatoes'

class Movie < ActiveRecord::Base
  include RottenTomatoes

  belongs_to :thing

  def assign_rt_attributes(params = nil)
    params = params || Movie.get_from_rt(rt_id)
    rt_attributes = {
      rt_id: params.delete("id"),
      rt_poster_profile: params["posters"]["profile"],
      rt_poster_thumb: params["posters"]["thumbnail"],
      rt_poster_detailed: params["posters"]["detailed"],
      rt_poster_original: params["posters"]["original"],
      release_year: params["year"],
      critics_score: params["ratings"]["critics_score"],
      rt_synopsis: params["synopsis"],
      rt_link: params["links"]["alternate"],
      director: params["abridged_directors"]
    }

    params.each_pair { |k, v| rt_attributes[k.to_sym] = v if self.respond_to?(k.to_sym) }
    assign_attributes(rt_attributes)
  end

end
