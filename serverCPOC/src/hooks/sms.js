// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars


module.exports = function (options = {}) {
  return async context => {
    const job = context.result;
    const jobitem = job.jobitem;
    let j=0;
    var content = "ใบงานที่ " + job.Id + " ทำรายการเสร็จสิ้นแล้ว สินค้าทั้งหมด " + jobitem.length + " รายการ ";
    for (let i = 0; i < jobitem.length; i++) {
      j++;
      content += ""+ j +") " + jobitem[i].ProductName + " " + jobitem[i].Quantity + " " + jobitem[i].Unit +" ";
    }




    if (job.JobStatusId == 3) {
      if (job.Telephone.length == 10 && job.EnableSMS) {
        SendSMS(job.Telephone, content);
      }

    }



    //console.log(job);
    return context;
  };


  function SendSMS(phone, text) {
    var request = require("request");

    var Options = {
      method: 'POST',
      url: 'http://203.146.186.186/molink_otp_service/sms.asmx/OTPSend',
      headers:
      {
        'Postman-Token': '207ae3ac-54a1-4a6e-805d-f97febdcdbb8',
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      },
      body:
      {
        username: 'tong9977',
        password: 'Sinetong9977',
        txtSMS: text + ' ${code}',
        sender: 'OTPPasscode',
        txtMobile: phone
      },
      json: true
    };

    request(Options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
      console.log(error);
    });
  }
};
