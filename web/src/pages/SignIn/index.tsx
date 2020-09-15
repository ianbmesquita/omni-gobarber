import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu logon</h1>

        <Input type="text" name="email" icon={FiMail} placeholder="E-mail" />

        <Input
          type="password"
          name="password"
          icon={FiLock}
          placeholder="Senha"
        />

        <Button type="submit">Entrar</Button>

        <a href="forgot-password">Esqueci minha senha</a>
      </form>

      <a href="create-account">
        <FiLogIn />
        Criar conta
      </a>
    </Content>

    <Background />
  </Container>
);
export default SignIn;
