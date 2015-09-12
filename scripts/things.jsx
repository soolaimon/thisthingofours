var TimelineThing = React.createClass({

  handleClick: function () {
    React.unmountComponentAtNode(document.getElementById('movie-list'));
    React.render(
      <MovieList thing={this.props.thing} url={'/things/' + this.props.thing.id + '/movies.json'}/>,
      document.getElementById('movie-list')
    );

  },

  render: function () {
    return(
      <div className="timeline-year" onClick={this.handleClick}>{ this.props.thing.id }</div>
    )
  }

});

var Timeline = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    $.ajax({
      url: '/things.json',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function (data){
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('/things.json', status, err.toString());
      }.bind(this)
    }); 

  },
  render: function () {
    var things = this.state.data.map(function(thing) {
      return (
        <TimelineThing thing={thing}>
        </TimelineThing>
      );
    });

    return (
      <div className="left-nav">
        {things}
      </div>
    );
  }
});

React.render(
  <Timeline/>,
  document.getElementById('thing-sidebar')
);
