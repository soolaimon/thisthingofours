var MovieList = React.createClass({displayName: "MovieList",
  getInitialState: function () {
      return { data: [] };
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

    return (
      React.createElement("div", {className: "container"}, 
        React.createElement("h1", null,  this.props.thing.name), 
         movieNodes 
      )
    );
  }
});

var MovieTile = React.createClass({displayName: "MovieTile",
  render: function () {
    return (
      React.createElement("div", {className: "movie-tile col-md-3"}, 
      React.createElement("img", {src:  this.props.movie.rt_poster_detailed}), 
        React.createElement("h4", null,  this.props.movie.title), 
        React.createElement("p", null,  this.props.movie.description)
      )
    );
  }
});