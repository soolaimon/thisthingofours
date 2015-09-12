var TimelineThing = React.createClass({displayName: "TimelineThing",

  handleClick: function () {
    React.unmountComponentAtNode(document.getElementById('movie-list'));
    React.render(
      React.createElement(MovieList, {thing: this.props.thing, url: '/things/' + this.props.thing.id + '/movies.json'}),
      document.getElementById('movie-list')
    );

  },

  render: function () {
    return(
      React.createElement("div", {className: "timeline-year", onClick: this.handleClick},  this.props.thing.id)
    )
  }

});

var Timeline = React.createClass({displayName: "Timeline",
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
