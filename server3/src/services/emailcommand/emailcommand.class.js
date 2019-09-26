/* eslint-disable no-unused-vars */
const dateFns = require('date-fns');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    // if (Array.isArray(data)) {
    //   return Promise.all(data.map(current => this.create(current, params)));
    // }

    let emails = data.emails;
    let transportId = data.transportId;


    const transport = require('../../models/transport.model')();
    const transportjob = require('../../models/transportjob.model')();
    const res = await transport.query().where('Id', transportId).eager("[booking,transportjob]");


    let subject = "Car transport on " + this.dateFns3(res[0].TransportDate);
    let email = emails;

    // console.log(res[0]);

    const resTJobOut = await transportjob.query().whereNot("TransportLocaltion1Id" , 1).whereNot("TransportLocaltion2Id" , 1).where("TransportId", transportId).where("PassengerTypeId", 1).eager("[user.[company],transportLocaltion1,transportLocaltion2,driver]");
    //console.log(resTJobOut);


    const resTJobIn = await transportjob.query().whereNot("TransportLocaltion1Id" , 1).whereNot("TransportLocaltion2Id" , 1).where("TransportId", transportId).where("PassengerTypeId", 2).eager("[user.[company],transportLocaltion1,transportLocaltion2,driver]");
    //console.log(resTJobIn[0]);
    //UsertransportJobIn = resTJobIn[0];

    let body = this.GenerateBodyHtmal(res[0], resTJobOut, resTJobIn);
    //console.log(body);
    this.SentEmail(subject, email, body);

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return { id };
  }

  dateFns1(date) {
    return dateFns.format(date, "DD/MM/YYYY HH:mm");
  }

  dateFns2(date) {
    let DateData = ""
    if(date != null){
      DateData = dateFns.format(date, "HH:mm");
    }else{
      DateData = ""
    }
    return DateData
  }
  dateFns3(date) {
    return dateFns.format(date, "DD MMMM YYYY");
  }

  GenerateBodyHtmal(transport, outbound, inbound) {
    console.log(transport);
    console.log(outbound);
    console.log(inbound);


    let inputBody = "";
    inputBody += "<table>";
    inputBody += "  <tbody>";
    inputBody += "    <tr>";
    inputBody += "      <td colspan=\"2\" align=\"right\"><strong>Transport Date : </strong></td>";
    inputBody += "      <td>" + this.dateFns1(transport.TransportDate) + "</td>";
    inputBody += "    </tr>";
    if (transport.booking != null) {
      inputBody += "    <tr>";
      inputBody += "      <td colspan=\"2\"  align=\"right\"><strong>BookingId : </strong></td>";
      inputBody += "      <td>" + transport.booking.Id + "</td>";
      inputBody += "    </tr>";
    }
    if (transport.Accept != null) {
      inputBody += "    <tr>";
      inputBody += "      <td colspan=\"2\"  align=\"right\"><strong>AcceptBy : </strong></td>";
      inputBody += "      <td>" + transport.AcceptBy + "[" + this.dateFns1(transport.AcceptDate) + "]</td>";
      inputBody += "    </tr>";
      inputBody += "  </tbody>";
      inputBody += "</table>";
    }

    inputBody += "<p><b>Passenger Outbound [Total " + outbound.length + " lists]</b></p>";
    inputBody += "<table width=\"100%\" style=\"border-collapse: collapse; border: 1px solid black;\">";
    inputBody += " <thead>";
    inputBody += "    <tr>";
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Name</th>";
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Conpany</td>";
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Transport Pickup</td>";
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Transport Drop</td>";
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Driver Name</td>";
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Reg. plate no.</td>";
    inputBody += "    </tr>";
    inputBody += " </thead>";
    inputBody += "  <tbody>";
    if (outbound.length > 0) {
      outbound.forEach(outB => {
        inputBody += "    <tr>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + outB.user.FirstName + " " + outB.user.LastName + "<br/>" + outB.user.Telephone + "</td>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + outB.user.company.Name + "</td>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + outB.transportLocaltion1.Name + "<br/>" + this.dateFns2(outB.PickupTime) + "</td>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + outB.transportLocaltion2.Name + "<br/>" + this.dateFns2(outB.DropTime) + "</td>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + outB.driver.Name + "<br/>" + outB.driver.Telephone + "</td>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + outB.Car + "</td>";
        inputBody += "    </tr>";
      });
    } else {
      console.log("Not Passenger Outbound")
      inputBody += "    <tr>";
      inputBody += "      <td colspan=\"7\" align=\"center\">Not Passenger Outbound</td>";
      inputBody += "    </tr>";
    }
    inputBody += "  </tbody>";
    inputBody += "</table>";

    inputBody += "</br>";

    inputBody += "<p><b>Passenger Inbound [Total " + inbound.length + " lists]</b></p>";
    inputBody += "<table width=\"100%\" style=\"border-collapse: collapse; border: 1px solid black;\">";
    inputBody += " <thead>";
    inputBody += "    <tr>";
  
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Name</th>";
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Conpany</td>";
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Transport Pickup</td>";
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Transport Drop</td>";
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Driver Name</td>";
    inputBody += "      <th style=\"font-size: 14px; border: 1px solid black;\">Reg. plate no.</td>";
    inputBody += "    </tr>";
    inputBody += " </thead>";
    inputBody += "  <tbody>";
    if (inbound.length > 0) {
      inbound.forEach(inB => {
        inputBody += "    <tr>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + inB.user.FirstName + " " + inB.user.LastName + "<br/>" + inB.user.Telephone + "</td>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + inB.user.company.Name + "</td>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + inB.transportLocaltion1.Name + "<br/>" + this.dateFns2(inB.PickupTime) + "</td>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + inB.transportLocaltion2.Name + "<br/>" + this.dateFns2(inB.DropTime) + "</td>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + inB.driver.Name + "<br/>" + inB.driver.Telephone + "</td>";
        inputBody += "      <td align=\"center\" style=\"font-size: 12px; border: 1px solid black;\">" + inB.Car + "</td>";
        inputBody += "    </tr>";
      });
    }else{
      console.log("Not Passenger Inbound")
      inputBody += "    <tr>";
      inputBody += "      <td colspan=\"7\" align=\"center\">Not Passenger Inbound</td>";
      inputBody += "    </tr>";
    }
    inputBody += "  </tbody>";
    inputBody += "</table>";

    return inputBody;
  }

  SentEmail(subject, email, body) {
    const nodemailer = require("nodemailer");
    //config สำหรับของ gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "icesoftware2016m@gmail.com", // your email
        pass: "Sinetong9977" // your email password
      }
    });
    let mailOptions = {
      from: "icesoftware2016m@gmail.com", // sender
      to: email, // list of receivers
      subject: subject, // Mail subject
      html: body // HTML body
    };
    //console.log("SentEmail");
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
