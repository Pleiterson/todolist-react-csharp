import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { useAuth } from "../../contexts/useAuth";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { login as loginService } from "../../services/authService";
import styles from "../../styles/Login.module.scss";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginService(username, password);
      login(data.token, data.id);
      console.log("Login bem-sucedido: ", data);

      navigate("/home"); 
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      const message = error?.response?.data?.message ?? (error instanceof Error ? error.message : String(err));
      console.error("Erro ao logar:", message);
      alert(message);
    }
  };

  return (
    <main className={ styles.loginWrapper }>
      <section className={ styles.loginContainer }>
        <h2>Login</h2>

        <article>
          <InputText
            placeholder="Usuário"
            value={ username }
            onChange={ (e) => setUsername(e.target.value) }
          />
        </article>

        <article>
          <Password
            toggleMask
            feedback={ false }
            placeholder="Senha"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
        </article>

        <Button label="Entrar" className={ `button-yellow ${ styles.enter }` } onClick={ handleLogin } />
      </section>
    </main>
  );
};
