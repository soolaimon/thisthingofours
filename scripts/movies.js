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
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
      },
      content : {
        position                   : 'absolute',
        top                        : '40px',
        left                       : '40px',
        right                      : '40px',
        bottom                     : '40px',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px'

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
      console.log(modalStyles);
      return(
        React.createElement("div", null, 
          React.createElement("div", {onClick: this.openModal, className: "movie-tile col-md-3 new-movie-tile"}, 
            React.createElement("i", {className: "fa fa-plus fa-5x"})
          ), 
          React.createElement(Modal, {
            isOpen: this.state.modalIsOpen, 
            onRequestClose: this.closeModal, 
            style: modalStyles
          }, 
            React.createElement("h1", null, "HELLO MODAL")
          )
        )
      );
    }
  }
});

