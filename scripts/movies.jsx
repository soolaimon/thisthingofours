var Modal = ReactModal;
Modal.setAppElement(document.body);
var MovieList = React.createClass({
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
        <MovieTile movie={movie}>
        </MovieTile>
      ); 
    });

    if (this.thingIsCurrent()) {
      movieNodes.push(
        <MovieTile thing={this.props.thing}>
        </MovieTile>
      )
    }



    return (
      <div className="container">
        <h1>{ this.props.thing.name}</h1>
        { movieNodes }
      </div>
    );
  }
});

var MovieForm = React.createClass({

});

var MovieTile = React.createClass({
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
        <div>
          <div onClick={this.showMovieDetails}className="movie-tile col-md-3">
          <img src={ this.props.movie.rt_poster_detailed}></img>
            <h4>{ this.props.movie.title }</h4>
            <p>{ this.props.movie.description }</p>
          </div>

        </div>
      );
    } else {
      return(
        <div>
          <div onClick={this.openModal} className="movie-tile col-md-3 new-movie-tile">
            <i className="fa fa-plus fa-5x"></i>
          </div>
          <Modal
            thing={this.props.thing}
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={modalStyles}>
            <div className="modal-content">
              <div className="modal-header">
                <h1>Add a Movie</h1>
              </div>
              <div className="modal-body">
                <MovieForm thing={this.props.thing}>
                </MovieForm>
              </div>
            </div>
          </Modal>
        </div>
      );
    }
  }
});

