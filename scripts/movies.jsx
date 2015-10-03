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
  getInitialState: function () {
    return {movie: null, results: []}
  },
  setMovie: function(movie) {
    this.setState({movie: movie, results: []});
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
        this.setState({results: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },


  render: function () {
    var form = this;
    var results = this.state.results.map(function(movie, index) {
      return (
        <MovieTile movieSet={form.setMovie} movie={movie}></MovieTile>
      );
    })
    return(
      <div>
        <div>
          <input className="form-control" type="text" ref="title" onKeyUp={this.search} placeholder="Search Film"/>
          <input type="hidden" ref="rt_id" value={this.state.movie_id}/>
        </div>
        <div>
          <ul className="result-list">
            {results}
          </ul>
        </div>
      </div>
    );
  }

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
  handleClick: function() {
    if (this.props.movieSet) {
      this.props.movieSet(this.props.movie);
    }
    else {
      showMovieDetails();
    }

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
    console.log(this.props.movie);
    if (this.props.movie) {

      var cast = $.parseJSON(this.props.movie.cast.replace(/=>/g, ':')).map(function(member, index){
        return member["name"]
      }).join(" , ");

      return (
        <div>
          <div onClick={this.handleClick} className="movie-tile col-md-3">
          <img src={ this.props.movie.rt_poster_detailed}></img>
            <h4>{ this.props.movie.title } ({this.props.movie.release_year})</h4>
            <p>{cast}</p>
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
                <MovieForm thing_id={this.props.thing.id} url='/movie_search'>
                </MovieForm>
              </div>
            </div>
          </Modal>
        </div>
      );
    }
  }
});

