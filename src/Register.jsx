import { useRef, useState, useEffect } from "react";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{3,23}$/;
const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$]).{8,25}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [passwd, setPasswd] = useState("");
  const [validPasswd, setValidPasswd] = useState(false);
  const [passwdFocus, setPasswdFocus] = useState(false);

  const [matchPasswd, setMatchPasswd] = useState("");
  const [validMatchPasswd, setValidMatchPasswd] = useState(false);
  const [matchPasswdFocus, setMatchPasswdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    // console.log('valid username:',result)
    // console.log('username:',user)
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PASSWD_REGEX.test(passwd);
    // console.log('valid password:',result)
    // console.log('password:',passwd)
    setValidPasswd(result);
  }, [passwd]);

  // useEffect(()=>{
  //   console.log('confirm password:',matchPasswd)
  // },[matchPasswd])

  useEffect(() => {
    const match = passwd === matchPasswd;
    // console.log(`'password match?',${passwd},${matchPasswd},${match}`)
    setValidMatchPasswd(match);
  }, [passwd, matchPasswd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, passwd, matchPasswd]);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!USER_REGEX.test(user) || !PASSWD_REGEX.test(passwd)) {
      setErrMsg("Invalid Entry");
      return;
    }
    // TODO: use API response
    console.log(user, passwd);
    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Succesful signup</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSignup}>
            {/* username */}
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <FaCheck />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FaTimes />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              aria-invalid={validName ? false : true}
              aria-describedby="uidnote"
            />
            {userFocus && user && !validName && (
              <p
                id="uidnote"
                className={"instructions"}
              >
                <FaInfoCircle />
                4 to 24 characters. <br />
                Must begin with a letter. <br />
                Letters, numbers, underscore, hyphen allowed.
              </p>
            )}
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            {/* passwd field */}
            <label htmlFor="password">
              Password:
              <span className={validPasswd ? "valid" : "hide"}>
                <FaCheck />
              </span>
              <span className={validPasswd || !passwd ? "hide" : "invalid"}>
                <FaTimes />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPasswd(e.target.value)}
              required
              onFocus={() => setPasswdFocus(true)}
              onBlur={() => setPasswdFocus(false)}
              aria-invalid={validPasswd ? false : true}
              aria-describedby="passwdnote"
            />
            {passwdFocus && passwd && !validPasswd && (
              <p
                id="passwdnote"
                className={"instructions"}
              >
                <FaInfoCircle />
                8 to 25 characters. <br />
                Must include uppercase and lowercase letters, a number and a
                special character <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>,{" "}
                <span aria-label="at symbol">@</span>,{" "}
                <span aria-label="hashtag">#</span>, or{" "}
                <span aria-label="dollar sign">$</span>,
                <span aria-label="percent">%</span>.
              </p>
            )}
            {/* passwd confirm field */}
            <label htmlFor="confirm_password">
              Confirm password:
              <span
                className={validMatchPasswd && matchPasswd ? "valid" : "hide"}
              >
                <FaCheck />
              </span>
              <span
                className={
                  validMatchPasswd || !matchPasswd ? "hide" : "invalid"
                }
              >
                <FaTimes />
              </span>
            </label>
            <input
              type="password"
              id="confirm_password"
              onChange={(e) => setMatchPasswd(e.target.value)}
              required
              onFocus={() => setMatchPasswdFocus(true)}
              onBlur={() => setMatchPasswdFocus(false)}
              aria-invalid={validMatchPasswd ? false : true}
              aria-describedby="confirmpasswdnote"
            />
            {matchPasswdFocus && !validMatchPasswd && (
              <p
                id="confirmpasswdnote"
                className={"instructions"}
              >
                <FaInfoCircle />
                Must match the first password field
              </p>
            )}
            {/* button */}
            <button disabled={!validName || !validMatchPasswd}>Sign Up</button>
          </form>
          <p>
            Already registered?
            <br />
            <a href="#">Sign In</a>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
