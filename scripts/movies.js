var MovieList = React.createClass({displayName: "MovieList",
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
      React.createElement("div", {className: "container"}, 
        React.createElement("h1", null, "Some Movies")
      )
    );
  }
});
React.render(
  React.createElement(MovieList, {url: "/movies/"}),
  document.getElementById('movie-list')
);