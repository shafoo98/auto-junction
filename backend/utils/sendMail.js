import nodemailer from 'nodemailer'

const sendOrderMail = (mailOptions) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.COMPANY_EMAIL,
      pass: process.env.EMAILS_PASSWORD,
    },
  })
  return transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

export default sendOrderMail
