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
            <h3> Xin chào ${dataSend.patientName} !</h3>
            <p> Cảm ơn bạn vì đã tin tưởng sử dụng dịch vụ đặt lịch khám bệnh online của chúng tôi . </p>
            <p><b> Thông tin đặt lịch khám bệnh của bạn:</b></p>
            <div>Khách hàng : <b>${dataSend.patientName}</b></div>
            <div>  Thời gian: <b>${dataSend.time}</b></div>
            <div>   Địa chỉ : <b>${dataSend.clinicName} ( ${dataSend.clinicAddress} )</b></div>
            <div>     Bác sĩ: <b>${dataSend.doctorName}</b></div 
            <p> Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám.</p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
                <p> Medical Booking xin chân thành cảm ơn !</p>
            </div>
        ` 
    } 
    if(dataSend.language === 'en') {
        result = 
        `
            <h3> Hi ${dataSend.patientName} !</h3>
            <p> Thank you for using our online medical appointment booking service </p>
            <p><b>Your medical appointment booking information :</b></p>
            <div>Customer: <b>${dataSend.patientName}</b></div>
            <div>    Time: <b>${dataSend.time}</b></div>
            <div>Address : <b>${dataSend.clinicName} ( ${dataSend.clinicAddress} )</b></div>
            <div>  Doctor: <b>Mr/Ms ${dataSend.doctorName}</b></div>
            <p> If the above information is true, please click on the link below to confirm and complete the appointment booking procedure.</p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
                <p> Medical Booking sincerely thank you for using our service !</p>
            </div>
        `
    } 
    if(dataSend.language === 'jp') {
        result = 
        `
            <h3> こんにちは ${dataSend.patientName} !</h3>
            <p> 平素よりオンライン診療予約サービスをご利用いただき、誠にありがとうございます。 </p>
            <p><b>診療予約情報 :</b></p>
            <div>お客様: <b>${dataSend.patientName}さん</b></div>
            <div>    時間: <b>${dataSend.time}</b></div>
            <div>住所 : <b>${dataSend.clinicName} ( ${dataSend.clinicAddress} )</b></div>
            <div>  医者: <b>${dataSend.doctorName}さん</b></div>
            <p> 上記の情報が正しい場合は、以下のリンクをクリックして確認し、予約手続きを完了してください。</p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank" >Click here</a>
                <p> Medical Booking をご利用いただき、誠にありがとうございます。</p>
            </div>
        `
    } 
    return result;
}

let sendAttachment = async (dataSend) => {
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
        to: dataSend.email, // list of receivers
        subject: "Kết quả khám bệnh", // Subject line
        html: getBodyHTMLEmailPrescription(dataSend),
        attachments: [
            {
                filename: `donthuoc-${dataSend.patientId}-${new Date().getTime()}.png` ,
                content: dataSend.image.split("base64,")[1] ,
                encoding: 'base64',
            }
        ],
      });
}

let getBodyHTMLEmailPrescription = (dataSend) => {
    let result = '';
    if(dataSend.language === 'vi') {
        result = 
        `
            <h3><b> Xin chào ${dataSend.patientName} !</b></h3>
            <p> Bạn nhận được email này sau khi đã sử dụng dịch vụ đặt lịch khám của chúng tôi.</p>
            <p>Thông tin đơn thuốc của bạn đã được gửi trong file đính kèm dưới đây:</p>
            <div>
                <p>Medical Booking xin chân thành cảm ơn !</p>
            </div>
        ` 
    } 
    if(dataSend.language === 'en') {
        result = 
        `
            <h3><b>Xin chào ${dataSend.patientName} !</b></h3>
            <p> You received this email after using our appointment booking service.</p>
            <p>Your prescription information has been sent in the attachment below:</p>
            <div>
                <p>Medical Booking sincerely thank you for using our service!</p>
            </div>
        `
    } 
    if(dataSend.language === 'jp') {
        result = 
        `
            <h3><b>こんにちは ${dataSend.patientName} !</b></h3>
            <p> このメールは、当社の予約サービスを使用した後に送信されました.</p>
            <p>あなたの処方箋情報は、以下の添付ファイルで送信されました:</p>
            <div>
                <p>医療予約サービスをご利用いただき、誠にありがとうございます!</p>
            </div>
        `
    } 
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail ,sendAttachment
}