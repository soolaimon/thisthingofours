var MovieList = React.createClass({
  getMoviesFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function (data){
        console.log(data);
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
    return (
      <div className="container">
        <h1>Some Movies</h1>
      </div>
    );
  }
});
React.render(
  <MovieList url="/movies/"/>,
  document.getElementById('movie-list')
);