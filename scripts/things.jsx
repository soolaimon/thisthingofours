var TimelineThing = React.createClass({

  handleClick: function () {
    React.unmountComponentAtNode(document.getElementById('movie-list'));
    React.render(
      <MovieList url={'/things/' + this.props.thing + '/movies.json'}/>,
      document.getElementById('movie-list')
    );

  },

  render: function () {
    return(
      <div clasName="timeline-year" onClick={this.handleClick}>{ this.props.thing }</div>
    )
  }

});

var Timeline = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    $.ajax({
      url: '/thing_ids.json',
      dataType: 'json',
      cache: false,
      type: 'GET',
      success: function (data){
        console.log(data)
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error('/thing_ids.json', status, err.toString());
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
