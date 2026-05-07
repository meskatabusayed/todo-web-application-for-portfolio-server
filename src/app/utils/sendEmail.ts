/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to : string , html : string ) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_env === 'production',
    auth: {
      user: 'meskatabusayed@gmail.com',
      pass: 'ocdq okql xvhd ucmd',
    },
  });

  await transporter.sendMail({
    from: 'meskatabusayed@gmail.com', 
    to, 
    subject: 'Reset Your Password Within 10 minuites', // Subject line
    text: '', // plain text body
    html,
  });
};
