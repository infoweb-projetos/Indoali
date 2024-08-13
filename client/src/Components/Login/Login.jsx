import React from 'react'
import './Login.css'

import logo from '/img/logowhite.svg'

const Login = () =>{
    return(
        <div>
        <figure style={{ marginBottom: '26px' }}>
          <img
            src={logo}
            width="282px"
            alt="Logotipo do Indoalí"
          />
        </figure>
        <form>
          <div className="info" style={{ marginBottom: '30px' }}>
            <label htmlFor="email"></label>
            <input
              type="text"
              id="email"
              placeholder="E-mail ou username"
              required
            />
          </div>
          <div className="info" style={{ marginBottom: '10px' }}>
            <label htmlFor="password"></label>
            <input
              type="password"
              id="password"
              placeholder="Senha"
              required
            />
          </div>
          <div id="log-links">
            <p>
              <a href="/register">Criar Conta</a>
            </p>
            <p>
              <a href="esqueceusenha.html">Esqueceu sua senha?</a>
            </p>
          </div>
          <div id="input-enviar" style={{ marginTop: '26px' }}>
            <input
              id="enviar"
              type="submit"
              value="Entrar"
            />
          </div>
        </form>
      </div>
    )
}

export default Login