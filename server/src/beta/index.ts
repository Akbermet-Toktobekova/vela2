import fs from 'node:fs';
import path from 'node:path';
import nodemailer from 'nodemailer';
import {createBetaApp} from './app';
const settingsFile=path.resolve('.env.beta.local');if(fs.existsSync(settingsFile))process.loadEnvFile(settingsFile);
const configured=!!process.env.BETA_SMTP_HOST&&!!process.env.BETA_MAIL_FROM;
const transport=configured?nodemailer.createTransport({host:process.env.BETA_SMTP_HOST,port:Number(process.env.BETA_SMTP_PORT||587),secure:process.env.BETA_SMTP_SECURE==='true',requireTLS:true,auth:process.env.BETA_SMTP_USER?{user:process.env.BETA_SMTP_USER,pass:process.env.BETA_SMTP_PASSWORD}:undefined}):null;
const {app}=createBetaApp({sendResetEmail:transport?async(email,url)=>{await transport.sendMail({from:process.env.BETA_MAIL_FROM,to:email,subject:'Reset your Vela password',text:`Use this single-use link to reset your password: ${url}\nIf you did not request this, ignore this message.`});}:undefined});
app.listen(Number(process.env.BETA_PORT||3002),'127.0.0.1',()=>console.log('Vela authenticated beta listening on loopback. Configure HTTPS tunnel for remote access. Password email delivery: '+(configured?'configured':'not configured')));
