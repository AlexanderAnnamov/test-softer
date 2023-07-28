import React from "react";

const YaAuth = () => {
  React.useEffect(() => {
    window.onload = function () {
      window.YaAuthSuggest.init(
        {
          client_id: "c46f0c53093440c39f12eff95a9f2f93",
          response_type: "token",
          redirect_uri: "https://examplesite.com/suggest/token",
        },
        "https://examplesite.com",
        {
          view: "button",
          parentId: "yaAuth",
          buttonView: "main",
          buttonTheme: "light",
          buttonSize: "m",
          buttonBorderRadius: 0,
        }
      )
        .then(function (result) {
          return result.handler();
        })
        .then(function (data) {
          console.log("Сообщение с токеном: ", data);
          document.body.innerHTML += `Сообщение с токеном: ${JSON.stringify(
            data
          )}`;
        })
        .catch(function (error) {
          console.log("Что-то пошло не так: ", error);
          document.body.innerHTML += `Что-то пошло не так: ${JSON.stringify(
            error
          )}`;
        });
    };
  }, []);

  return <div id="yaAuth"></div>;
};

export default YaAuth;
