/* begin example code
function MyClientModule() {
    const msgDiv = document.querySelector("div#messages");
  
    function checkForErrors() {
      // From  https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
  
      console.log("urlParams", params.msg);
      if (params.msg) {
        msgDiv.querySelector("#content").innerHTML = params.msg;
        msgDiv.style.display = "block";
      }
    }
  
    async function checkIfLoggedIn() {
      const res = await fetch("/getuser");
      const user = await res.json();
  
      const spanIsAuth = document.querySelector("span#isAuth");
  
      if (user.user) {
        spanIsAuth.innerHTML = " Authenticated!";
      } else {
        spanIsAuth.innerHTML = " 😭 ";
      }
  
      return user.user !== undefined;
    }
  
    checkForErrors();
    checkIfLoggedIn();
  }
  
  MyClientModule();
// end example code
  */