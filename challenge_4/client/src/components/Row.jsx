class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var classes = 'row ' + this.props.color;

    return (
        <div row={this.props.row} className={classes} color={this.props.color}></div>
    )
  }
}







export default Row;