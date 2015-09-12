var TimelineThing = React.createClass({displayName: "TimelineThing",

  handleClick: function () {
    console.log("TODO HANDLECLICK");
  },
  
  render: function () {
    React.createElement("div", {onClick: this.handleClick()},  this.props.thing.id)
  }

});

var Timeline = React.createClass({displayName: "Timeline",
  getInitialState: function () {
    return { data: [] };
  },
  render: function () {
    var things = this.props.data.map(function(thing) {
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