var TimelineThing = React.createClass({displayName: "TimelineThing",

  handleClick: function () {
    React.unmountComponentAtNode(document.getElementById('movie-list'));
    React.render(
      React.createElement(MovieList, {url: '/things/' + this.props.thing + '/movies.json'}),
      document.getElementById('movie-list')
    );

  },

  render: function () {
    return(
      React.createElement("div", {clasName: "timeline-year", onClick: this.handleClick},  this.props.thing)
    )
  }

});

var Timeline = React.createClass({displayName: "Timeline",
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
        React.createElement(TimelineThing, {thing: thing}
        )
      );
    });

    return (
      React.createElement("div", {className: "left-nav"}, 
        things
      )
    );
  }
});

React.render(
  React.createElement(Timeline, null),
  document.getElementById('thing-sidebar')
);
