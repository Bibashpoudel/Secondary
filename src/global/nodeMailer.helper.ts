import * as ejs from 'ejs';

async function newAccount(requirements: any, transporter: any) {
  try {
    const FROM_NAME = 'abc';
    const SENDER = process.env.email;

    const data = await ejs.renderFile('./public/ejs/sendPassword.ejs', {
      fullName: 'BIbash Poudel',
      email: 'pdlbibash77@gmail.com',
      password: 'Bibash',
    });

    const mainOptions = {
      from: `"${FROM_NAME}" "<${SENDER}>" `,
      to: 'pdlbibash77@gmail.com',
      subject: 'New account information',
      html: data,
    };
    await transporter.sendMail(mainOptions);
    console.log('Password sent to the authorizedd user');
    return 0;
  } catch (error) {
    console.log('error', error);
  }
}

export { newAccount };
