class App extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      page: 0,
      button: 'Checkout',
      session: null
    }
  }
  //test
  supplyForm () {
    var Form = `Form${this.state}`;
    if (state) {
      return Form;
    }
  }

  submit () {
    var form = document.getElementById('form');
    formData = new FormData(form);
    var url = form.action;
    var options = {
      method: form.attributes.method.value,
      body: formData,
      headers: {
        session: this.state.session
      }
    }
    fetch(url, options)
      .then(res=>{
          return res.text()
      })
      .then(session=>{
        this.setState({
          session: session
        })
      })
  }

  get () {
    var options = {
      method: 'get',
      headers: {
        session: this.state.session
      }
    }
    fetch('/overview', options)
      .then(response=>response.json())
      .then(result => {
        console.log(result);
        debugger;
        var accountInfo = result.account.split('%');
        accountInfo.forEach((info, i)=>{
          var field = document.getElementById('overview' + i);
          field.innerHTML = info;
        })
        var addressInfo = result.addr.split('%');
        addressInfo.forEach((info, i)=>{
          var field = document.getElementById('overview' + (i + 3));
          field.innerHTML = info;
        })
        var cardInfo = result.credit.split('%');
        cardInfo.forEach((info, i)=>{
          var field = document.getElementById('overview' + (i + 9))
          field.innerHTML = info;
        })
      })
  }

  triggerNextPage (e) {

    var page = this.state.page;
    var button = this.state.button;
    var nextPage, nextButton;
    if (page !== 4) {
      this.submit();
    }

    switch(true){
      case (page === 3):
        nextPage = 4
        nextButton = 'Confirm Purchase';
        break;
      case (page === 4):
        nextPage = 0;
        nextButton = 'Checkout';
        break;
      default:
        nextPage = page + 1;
        nextButton = 'Continue';
        break;
    }

    this.setState({
      page: nextPage,
      button: nextButton
    })
  }

  componentDidUpdate(){
    if (this.state.page === 4) {
      this.get();
    }
  }

  render(){{
    var Page = [Page0, Page1, Page2, Page3, Page4][this.state.page]
    var fields = ['Name:','Email:','Password:','Line 1:', 'Line 2:', 'City:','State:','Zip:','Phone:','Credit Card #:', 'Exp:', 'CVV:', 'Billing Zip:']
    }
    return(
    <div>
      <Page name={fields}/>
      <Btn click={this.triggerNextPage.bind(this)} name={this.state.button}/>
    </div>
    )
  }
}

var Btn = props => (
  <button onClick={props.click}>{props.name}</button>
)

var Page0 = props => (
  <div>
    <h1>Click button to procede to checkout</h1>
    <form action="/create" method='post' id="form"></form>
  </div>
)
var Page1 = props => (
  <form action="/account" method='put' id="form">
    <h6>Account Info</h6>
    <div>
      <label for="name">name:</label><br/>
      <input name="name" type="text" required/>
    </div>
    <div>
      <label for="email">email:</label><br/>
      <input name="email" type="email" required/>
    </div>
    <div>
      <label for="password">password:</label><br/>
      <input name="password" type="password" required/>
    </div>
  </form>
)
var Page2 = props => (
  <form action="/address" method='put' id="form">
    <h6>Address</h6>
    <div>
      <label for="line1">Line 1:</label><br/>
      <input type="text" name="line1" required/>
    </div>
    <div>
      <label for="line2">Line 2:</label><br/>
      <input type="text" name="line2"/>
    </div>
    <div>
      <label for="city">City:</label><br/>
      <input type="text" name="city" required/>
    </div>
    <div>
      <label for="state">State:</label><br/>
      <input type="text" name="state" required/>
    </div>
    <div>
      <label for="zip">Zip</label><br/>
      <input type="number" name="zip" required/>
    </div>
    <div>
      <label for="phone">Phone:</label><br/>
      <input type="number" name="phone" required/>
    </div>
  </form>
)
var Page3 = props => (
  <form action="/cc" method='put' id="form">
    <div>
      <label for="cc">Credit Card #:</label><br/>
      <input type="number" name="cc" required/>
    </div>
    <div>
      <label for="exp">Expiration Date:</label><br/>
      <input type="number" name="exp" required/>
    </div>
    <div>
      <label for="cvv">CVV:</label><br/>
      <input type="number" name="cvv" required/>
    </div>
    <div>
      <label for="zip">Billing Zip:</label><br/>
      <input type="number" name="zip" required/>
    </div>
  </form>
)
var Page4 = props => (
  <div>
    <h5>{props.name[0]}</h5><br/>
    <p id="overview0"></p><br/>
    <h5>{props.name[1]}</h5><br/>
    <p id="overview1"></p><br/>
    <h5>{props.name[2]}</h5><br/>
    <p id="overview2"></p><br/>
    <h5>{props.name[3]}</h5><br/>
    <p id="overview3"></p><br/>
    <h5>{props.name[4]}</h5><br/>
    <p id="overview4"></p><br/>
    <h5>{props.name[5]}</h5><br/>
    <p id="overview5"></p><br/>
    <h5>{props.name[6]}</h5><br/>
    <p id="overview6"></p><br/>
    <h5>{props.name[7]}</h5><br/>
    <p id="overview7"></p><br/>
    <h5>{props.name[8]}</h5><br/>
    <p id="overview8"></p><br/>
    <h5>{props.name[9]}</h5><br/>
    <p id="overview9"></p><br/>
    <h5>{props.name[10]}</h5><br/>
    <p id="overview10"></p><br/>
    <h5>{props.name[11]}</h5><br/>
    <p id="overview11"></p><br/>
    <h5>{props.name[12]}</h5><br/>
    <p id="overview12"></p><br/>
    <h5>{props.name[13]}</h5><br/>
    <p id="overview13"></p><br/>
  </div>

)

ReactDOM.render(<App/>, document.getElementById('app'))
