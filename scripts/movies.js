var MovieList = React.createClass({displayName: "MovieList",
  getInitialState: function () {
      return { data: [] };
  },
  thingIsCurrent: function() {
    return this.props.thing.id === new Date().getFullYear();
  },
  getMoviesFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function (data){
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    }); 
  }, 
  componentDidMount: function () {
    document.title = this.props.thing.name || 'This Thing of Ours';
    this.getMoviesFromServer();
  },
  render: function () {
    var movieNodes = this.state.data.map(function(movie) {
      return(
        React.createElement(MovieTile, {movie: movie}
        )
      ); 
    });

    if (this.thingIsCurrent()) {
      movieNodes.push(
        React.createElement(MovieTile, null
        )
      )
    }



    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("h1", null,  this.props.thing.name), 
         movieNodes 
      )
    );
  }
});

var MovieTile = React.createClass({displayName: "MovieTile",
  addMovie: function () {
    console.log("add movie");
  },
  showMovieDetails: function () {
    console.log("NEED TO SHOW DETAILS, YO")
  },
  render: function () {
    if (this.props.movie) {
      return (
        React.createElement("div", {onClick: this.showMovieDetails, className: "movie-tile col-md-3"}, 
        React.createElement("img", {src:  this.props.movie.rt_poster_detailed}), 
          React.createElement("h4", null,  this.props.movie.title), 
          React.createElement("p", null,  this.props.movie.description)
        )
      );
    } else {
      return(
        React.createElement("div", {onClick: this.addMovie, className: "movie-tile col-md-3 new-movie-tile"}, 
          React.createElement("i", {className: "fa fa-plus fa-5x"})
        )
      );
    }
  }
});

