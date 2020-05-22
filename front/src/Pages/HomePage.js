import React from "react";

const HomePage = (props) => {
  if (localStorage.getItem("CC_Token")) {
    props.history.push("/dashboard");
    return null;
  }
  else {
    return (
      <div>
        <a href="/login">Se connecter</a>
        <br></br>
        <a href="/register">S'inscrire</a>
        <br></br>
      </div>
    )
  };

}

export default HomePage;
