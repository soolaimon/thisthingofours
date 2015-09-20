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
    document.title = this.props.thing.name || 'This Thing of Ours';
    this.getMoviesFromServer();
  },
  render: function () {
    var movieNodes = this.state.data.map(function(movie) {
      return(
        <MovieTile movie={movie}>
        </MovieTile>
      ); 
    });

    return (
      <div className="container">
        <h1>{ this.props.thing.name}</h1>
        { movieNodes }
      </div>
    );
  }
});

var MovieTile = React.createClass({
  render: function () {
    return (
      <div className="movie-tile col-md-3">
      <img src={ this.props.movie.rt_poster_detailed}></img>
        <h4>{ this.props.movie.title }</h4>
        <p>{ this.props.movie.description }</p>
      </div>
    );
  }
});