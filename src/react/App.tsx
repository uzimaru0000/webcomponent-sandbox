import * as React from "react";

export default () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isDark, setIsDark] = React.useState(false);

  const style = {
    border: "5px solid #5ED4F3",
    background: isDark ? "#333" : "white",
    color: isDark ? "white" : "black"
  };

  return (
    <div style={style}>
      <div>This is react</div>
      <div>
        <button className="button">
          <span>ClickMe!</span>
          <ripple-effect />
        </button>
      </div>
      <div>
        <x-input
          type="email"
          placeholder="email"
          value={email}
          style={{ "--color": isDark ? "white" : "black" }}
          onInput={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <x-input
          type="password"
          placeholder="password"
          value={password}
          style={{ "--color": isDark ? "white" : "black" }}
          onInput={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <x-toggle onClick={() => setIsDark(!isDark)} defaultChecked={isDark} />
      </div>
      <div>
        <div>{email}</div>
        <div>{password}</div>
      </div>
    </div>
  );
};
