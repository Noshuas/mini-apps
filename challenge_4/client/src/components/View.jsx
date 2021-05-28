class View extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      classes: 'view'
    }
  }

  onMouseEnter(){
    this.setState({
      classes: 'view ' + this.props.currentPlayer
    })
  }

  onMouseLeave(){
    this.setState({
      classes: 'view'
    })
  }

  render(){
    return (
      <div className={this.state.classes}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        onClick={this.onMouseLeave.bind(this)}
      ></div>
    )
  }
}

export default View;