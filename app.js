const Express = require('express');
const bodyParser = require("body-parser");
var router = Express.Router();
const app = Express();
const authrouter = require('./router/dep')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/', authrouter);
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

const Queue = require('bull');
const nodemailer = require('nodemailer');
//  Initiating the Queue
const sendMailQueue = new Queue('sendMail', {
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});
const data = {
  email: 'vennala917@gmail.com'
};
const options = {
  delay: 60000, // 1 min in ms
  attempts: 2
};
//  Adding a Job to the Queue
sendMailQueue.add(data, options);
//  Consumer
sendMailQueue.process(async job => { 
    return await sendMail(job.data.email); 
  });
  function sendMail(email) {
    return new Promise((resolve, reject) => {
      let mailOptions = {
        from: 'vennala917@gmail.com',
        to: email,
        subject: 'Bull - npm',
        text: "This email is from bull job",
      };
      let mailConfig = {
        service: 'gmail',
        auth: {
          user: 'vennala917@gmail.com',
          pass: 'Sruthi@123'
        }
      };
      nodemailer.createTransport(mailConfig).sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
          console.log("mail sent successfully");
        }
      });
    });
}

