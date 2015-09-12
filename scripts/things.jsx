var TimelineThing = React.createClass({

  handleClick: function () {
    console.log("TODO HANDLECLICK");
  },
  
  render: function () {
    <div onClick={this.handleClick()}>{ this.props.thing.id }</div>
  }

});

var Timeline = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  render: function () {
    var things = this.props.data.map(function(thing) {
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