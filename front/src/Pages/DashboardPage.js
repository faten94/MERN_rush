import React, { Component } from "react";
import makeToast from "../Toaster";
import axios from "axios";

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.textRef = React.createRef();
    this.hashtagRef = React.createRef();
  }

  state = {
    twittes: [],
    authors: [],
    authors2: [],
    all: false
  };

  sendTwitte = (e) => {
    e.preventDefault();
    const text = this.textRef.current.value;
    const hashtag = this.hashtagRef.current.value;

    axios
      .post("http://localhost:5000/user/dashboard",
        {
          text,
          hashtag,
        },
        {
          headers: { Authorization: ` ${localStorage.getItem("CC_Token")}` }
        }
      )
      .then((response) => {
        // makeToast("success", response.data.message);
      })
      .catch((err) => {
        console.log(err);
        //   if (
        //     err &&
        //     err.response &&
        //     err.response.data &&
        //     err.response.data.message
        //   )
        //      makeToast("error", err.response.data.message);
      })

    //  console.log(localStorage.getItem("CC_Token"));
  }

  logoutUser = () => {
    localStorage.removeItem("CC_Token");
    this.props.history.push('/login')
  }

  getAllUsers = () => {
    axios
      .post("http://localhost:5000/user/id_author",
        {

        }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        this.setState({ authors: data }, () => {
          this.state.twittes.forEach(twitte => {
            this.state.authors.forEach(author => {
              if (twitte.id_author === author._id) {
                this.state.authors2.push(
                  {
                    text: twitte.text,
                    hashtag: twitte.hashtag,
                    author: author.name
                  }
                )
              }
            });
          })
        })
        this.setState({ authors2: this.state.authors2 }, () => {
          this.setState({ all: true })
        });
      })
      .catch((err) => {
        console.log(err);
        //   if (
        //     err &&
        //     err.response &&
        //     err.response.data &&
        //     err.response.data.message
        //   )
        //      makeToast("error", err.response.data.message);
      })

    //  console.log(this.state.twittes[0].id_author);

  }

  async componentDidMount() {
    console.log("toto");
    await this.getTwitte();
    await this.getAllUsers();

    console.log("this.getTwitte : ", this.state.twittes);

    console.log("this.getAuthors : ", this.state.authors);
    // if(this.state.twittes!==[]){
    //     };

    console.log("this.state.authors2 :", this.state.authors2);
    //this.setState({authors2: this.state.authors2});
    // this.setState({ authors2: this.state.authors2 })
  }



  // this.getNameById_Author();


  getTwitte = (res) => {
    axios
      .get("http://localhost:5000/user/dashboard")
      .then((response) => {
        const data = response.data
        console.log(data);
        this.setState({ twittes: data })
      })
      .catch((err) => {
        console.log(err);
        //   if (
        //     err &&
        //     err.response &&
        //     err.response.data &&
        //     err.response.data.message
        //   )
        //      makeToast("error", err.response.data.message);
      })

  }

  displayTwittes = (authors2) => {
    console.log("author2 passe dans le render:", authors2);
    const numbers = authors2;
    console.log("json", JSON.stringify(numbers));
    const listItems = numbers.map((twitt) => {
      return (<div>
        <p>{twitt.text}</p>
        <span>{twitt.hashtag}</span>
        <p>{twitt.author}</p>
      </div>
      )
    });
    console.log("liistItems", numbers);
    return (listItems);
  };


  render() {
    let authors2 = this.state.authors2
    return (
      <div>
        <button id="buttonLogout" onClick={this.logoutUser}> Se deconnecter</button>
        <br></br>
        <label>Twitte</label>
        <input
          type="text"
          name="Twitte"
          id="Twitte"
          placeholder="ecrivez un texte de 144 caractéres max"
          ref={this.textRef}
        />
        <input
          type="text"
          name="hashtag"
          id="Hashtag"
          placeholder="ecrivez vos hashtag"
          ref={this.hashtagRef}
        />
        <button onClick={this.sendTwitte}>submit</button>
        <div className="postedTwittes">
          <p>okok</p>
          {this.state.all === true ? this.displayTwittes(authors2) : <span></span>}
        </div>
      </div >
    );
  };
};

export default DashboardPage;
