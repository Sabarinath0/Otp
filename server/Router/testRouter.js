const router = require("express").Router();
const serviceSID = "VA0e768ccac37d45d073a681ed972634d2";
const accountSID = "AC8b2a1ece22d2f8f53bba143bbc08fecb";
const authToken = "13e0193f3772f3d75c3f1136e3732bd5";
const client = require("twilio")(accountSID, authToken);

router.post("/mobile", (req, res) => {
  client.verify
    .v2.services(serviceSID) // Use v2.services
    .verifications.create({
      to: `+91${req.body.number}`,
      channel: "sms"
    })
    .then((resp) => {
      console.log("response", resp);
      res.status(200).json({ resp });
    });
});

router.post("/otp", (req, res) => {
  const { otp } = req.body; 
  console.log("otp", otp);
  client.verify
    .v2.services(serviceSID) // Use v2.services
    .verificationChecks.create({
      to: `+919605999792`,
      code: otp
    })
    .then((resp) => {
      console.log("otp res", resp);
      if (resp.status === "approved") {
        res.status(200).json({ message: "Verification successful" });
      } else {
        res.status(400).json({ message: "Verification failed" });
      }
    })
    .catch((err) => {
      console.error("Error verifying OTP:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
