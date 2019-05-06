const nodemailer = require('nodemailer');

// TODO: Not sure why process.env values dont seem to be  set inside of this function
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.mailtrap.io',
  port: process.env.MAIL_PORT || 2525,
  auth: {
    user: process.env.MAIL_USER || 'ab8fae85ac4f38',
    pass: process.env.MAIL_PASS || 'f56c575e4020c4'
  },
});

const makeNiceEmail = text =>`
  <div className="email style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Crownd</h2>
    <p>${text}</p>
    <p>Crownd Team</p>
  </div>
`;

exports.transport = transport;
exports.makeNiceEmail = makeNiceEmail;
