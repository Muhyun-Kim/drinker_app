import React from "react";

const Auth = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Google</button>
      </div>
    </div>
  );
};

export default Auth;
