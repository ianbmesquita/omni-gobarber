import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />

    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faça seu cadastro</h1>

        <Input type="text" name="name" icon={FiUser} placeholder="Nome" />

        <Input type="text" name="email" icon={FiMail} placeholder="E-mail" />

        <Input
          type="password"
          name="password"
          icon={FiLock}
          placeholder="Senha"
        />

        <Button type="submit">Cadastrar</Button>
      </form>

      <a href="login">
        <FiArrowLeft />
        Voltar para Logon
      </a>
    </Content>
  </Container>
);
export default SignUp;
