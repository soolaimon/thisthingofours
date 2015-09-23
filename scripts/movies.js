var Modal = ReactModal;
Modal.setAppElement(document.body);
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
        React.createElement(MovieTile, {thing: this.props.thing}
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

var MovieResult = React.createClass({displayName: "MovieResult",
  render: function () {
    return (
      React.createElement("li", {className: "movie-result"}, this.props.movie.title)
    );
  }
});

var MovieForm = React.createClass({displayName: "MovieForm",
  getInitialState: function () {
    return {movie_id: null, data: []}
  },
  search: function () {
    var query = React.findDOMNode(this.refs.title).value
    if (query.length < 3) {
      return;
    }

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      data: {query: query},
      success: function(data) {
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  setMovie: function (id) {
    this.setState({movie_id: id})
  },

  render: function () {
    var results = this.state.data.map(function(movie, index) {
      return (
        React.createElement(MovieResult, {movie: movie})
      );
    });
    return(
      React.createElement("div", null, 
        React.createElement("div", null, 
          React.createElement("input", {className: "form-control", type: "text", ref: "title", onKeyUp: this.search, placeholder: "Search Film"}), 
          React.createElement("input", {type: "hidden", ref: "rt_id", value: this.state.movie_id})
        ), 
        React.createElement("div", null, 
          React.createElement("ul", null, 
            results
          )
        )
      )
    );
  }

});


var MovieTile = React.createClass({displayName: "MovieTile",
  getInitialState: function() {
    return { modalIsOpen: false };
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  showMovieDetails: function () {
    console.log("NEED TO SHOW DETAILS, YO")
  },
  render: function () {
    const modalStyles = {
      overlay : {
        position        : 'fixed',
        backgroundColor : '#eee'
      },
      content : {

      }
    }
    if (this.props.movie) {
      return (
        React.createElement("div", null, 
          React.createElement("div", {onClick: this.showMovieDetails, className: "movie-tile col-md-3"}, 
          React.createElement("img", {src:  this.props.movie.rt_poster_detailed}), 
            React.createElement("h4", null,  this.props.movie.title), 
            React.createElement("p", null,  this.props.movie.description)
          )

        )
      );
    } else {
      return(
        React.createElement("div", null, 
          React.createElement("div", {onClick: this.openModal, className: "movie-tile col-md-3 new-movie-tile"}, 
            React.createElement("i", {className: "fa fa-plus fa-5x"})
          ), 
          React.createElement(Modal, {
            thing: this.props.thing, 
            isOpen: this.state.modalIsOpen, 
            onRequestClose: this.closeModal, 
            style: modalStyles}, 
            React.createElement("div", {className: "modal-content"}, 
              React.createElement("div", {className: "modal-header"}, 
                React.createElement("h1", null, "Add a Movie")
              ), 
              React.createElement("div", {className: "modal-body"}, 
                React.createElement(MovieForm, {thing_id: this.props.thing.id, url: "/movie_search"}
                )
              )
            )
          )
        )
      );
    }
  }
});

