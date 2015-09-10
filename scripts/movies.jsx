var MovieList = React.createClass({
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
    this.getMoviesFromServer();
  },
  render: function () {
    console.log(this.state.data);
    var movieNodes = this.state.data.map(function(movie) {
      return(
        <MovieTile movie={movie}>
        </MovieTile>
      ); 
    });

    return (
      <div className="container">
        <h1>Some Movies</h1>
        { movieNodes }
      </div>
    );
  }
});


var MovieTile = React.createClass({
  render: function () {
    return (
      <div className="movietile col-md-3">
        <h4>{ this.props.movie.title }</h4>
      </div>
    );
  }
});

React.render(
  <MovieList url="/movies/"/>,
  document.getElementById('movie-list')
);