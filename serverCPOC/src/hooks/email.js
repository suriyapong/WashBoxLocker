// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const job = context.result;
    //console.log(job);
    console.log("Email : " + job.Email);
    console.log("Signature : " + job.SignatureUrl);

    let jobStatusId = job.JobStatusId;

    if (jobStatusId == 4) {
      let subject = "ใบงานของบริษัท " + job.Customer + " เลขที่ " + job.Id + " ดำเนินการเรียบร้อย";
      let email = job.Email;
      let body = await GenerateBodyHtmal(job);

      const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if(emailRegexp.test(email)){
        SentEmail(subject, email, body);
      }
    }

    return context;
  };

  async function GenerateBodyHtmal(job) {
    let body = "";
    body += "เลขที่ใบงาน : " + job.Id;
    body += "<br/>บริษัท : " + job.Customer;
    body += "<br/>ที่อยู่ : " + job.Address;
    body += "<br/>ผู้ติดต่อ : " + job.ContactPerson;
    if (job.FinishedDate == null) {
      body += "<br/>ส่งของวันที่ : อยู่ระหว่างจัดส่ง"; 
    } else {
      body += "<br/>ส่งของวันที่ : " + job.FinishedDate;
    }
    body += "<br/>รายการสินค้า";
    if (job.jobitem.length > 0) {
      body += "<ul>";
      job.jobitem.forEach(item => {
        body += "<li>" + item.ProductName + " จำนวน " + item.Quantity + " (" + item.Unit + ")</li>";
      });
      body += "</ul>";
    }
    body += "ไฟล์แนบ";
    if (job.uploads.length > 0) {
      body += "<ul>";
      job.uploads.forEach(img => {
        body += "<li><a href=" + img.Url + ">ไฟล์แนบ</a></li>";
      });
      body += "</ul>";
    }
    body += "ลายเซ็น : ";
    if (job.SignatureUrl == null) {
      body += "ไม่พบลายเซ็น";
    } else {
      body += "<a href=" + job.SignatureUrl + ">ลายเซ็น</a>";
    }

    const question = require('../../src/models/ratequestion.model')();
    let res = await question.query();
    let rateQuestions = res;

    body += "<br/>ผลการประเมินของลูกค้า";
    if (job.Rate == null) {
      body += "ลูกค้ายังไม่ได้ประเมิน";
    } else {
      let rateResult = JSON.parse("[" + job.Rate + "]");
      if (rateResult.length > 0) {
        rateQuestions.forEach(q => {
          console.log("Q : " + JSON.stringify(q.Question));
          body += "<p>ข้อที่ " + q.Id + " " + q.Question + "</p>";
          if (rateResult[q.Id - 1] == 1) {
            body += "<p>- แย่มาก</p>";
          }
          if (rateResult[q.Id - 1] == 2) {
            body += "<p>- แย่</p>";
          }
          if (rateResult[q.Id - 1] == 3) {
            body += "<p>- ปานกลาง</p>";
          }
          if (rateResult[q.Id - 1] == 4) {
            body += "<p>- ดี</p>";
          }
          if (rateResult[q.Id - 1] == 5) {
            body += "<p>- ดีมาก</p>";
          }
        });
      }
    }

    return body;
  }

  function SentEmail(subject, email, body) {
    const nodemailer = require('nodemailer');

    // config สำหรับของ gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'icesoftware2016m@gmail.com', // your email
        pass: 'Sinetong9977' // your email password
      }
    });

    let mailOptions = {
      from: 'icesoftware2016m@gmail.com',                // sender
      to: "tong9977@gmail.com,suriyapong.sinyod@gmail.com," + email,               // list of receivers
      subject: subject,          // Mail subject
      html: body // HTML body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    });
  };

}


