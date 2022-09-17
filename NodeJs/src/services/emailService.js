require('dotenv').config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_APP, // generated ethereal user
              pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"Medical Booking" <medicalbookingg@gmail.com>', // sender address
            to: dataSend.receiveEmail, // list of receivers
            subject: "Thông tin đặt lịch khám bệnh", // Subject line
            // text: "Hello world?", // plain text body
            html: getBodyHTMLEmails(dataSend)
          });

}

let getBodyHTMLEmails = (dataSend) => {
    let result = '';
    if(dataSend.language === 'vi') {
        result = 
        `
            <h3> Medical Booking xin chào ${dataSend.patientName} !</h3>
            <p> Cảm ơn bạn vì đã sử dụng dịch vụ đặt lịch khám bệnh online của chúng tôi </p>
            <p> Thông tin đặt lịch khám bệnh :</p>
            <div><b>Khách hàng: ${dataSend.patientName}</b></div>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Tại địa điểm : ${dataSend.clinicName}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div 
            <p> Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám.</p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
            </div>
        ` 
    } 
    if(dataSend.language === 'en') {
        result = 
        `
            <h3> Medical Booking, Hi ${dataSend.patientName} !</h3>
            <p> Thank you for using our online medical appointment booking service </p>
            <p> Medical appointment booking information :</p>
            <div><b>Customer: ${dataSend.patientName}</b></div>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Address : ${dataSend.clinicName}</b></div>
            <div><b>Doctor: Mr/Ms ${dataSend.doctorName}</b></div>
        
            <p> If the above information is true, please click on the link below to confirm and complete the appointment booking procedure.</p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
            </div>
        `
    } 
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}