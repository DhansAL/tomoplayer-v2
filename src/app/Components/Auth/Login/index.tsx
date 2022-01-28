import { Alert, Button, Form } from "solid-bootstrap";
import { createEffect, createSignal } from "solid-js";
import { authStore } from "../../../store/auth";
import { loginUser, logoutUser } from "../../../apiEvents/auth/login";

export const Login = () => {
  const [username, setUsername] = createSignal(null);
  const [password, setPassword] = createSignal(null);
  const [auth, setAuth] = createSignal(authStore().authenticate);
  const [resMessage, setResMessage] = createSignal(authStore().message);

  createEffect(() => {
    setAuth(authStore().authenticate);
    setResMessage(authStore().message);
  });

  const handleLogin = () => {
    loginUser(username(), password());
    setUsername(null);
    setPassword(null);
  };

  const handlelogout = () => {
    logoutUser();
  };

  return (
    <>
      <div class="w-25">
        <h5>Authentication</h5>
        {/* fix alert show only when message is there maybe onclose set messsage  = null */}
        <Alert variant="warning">{resMessage()}</Alert>
        {auth() ? (
          <Button variant="danger" onClick={handlelogout}>
            logout
          </Button>
        ) : (
          <Form>
            <Form.Group className="mb-2" >
              <Form.Control
                htmlSize={1}
                size="sm"
                value={username()}
                onchange={(e) => setUsername(e.currentTarget.value)}
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-2" >
              <Form.Control
                size="sm"
                type="password"
                value={password()}
                onchange={(e) => setPassword(e.currentTarget.value)}
                placeholder="Password"
              />

              <hr />
              <Button variant="success" onClick={handleLogin}>
                login
              </Button>
            </Form.Group>
          </Form>
        )}
      </div>
    </>
  );
};
