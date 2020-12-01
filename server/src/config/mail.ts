interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  // Incluir aqui um email de domínio - Configurado na AWS
  defaults: {
    from: {
      email: 'equipe@gobarber.com.br',
      name: 'Equipe GoBarber',
    },
  },
} as IMailConfig;
