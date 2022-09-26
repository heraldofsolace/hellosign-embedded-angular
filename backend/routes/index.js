var express = require('express');
var router = express.Router();
const hellosign = require('hellosign-sdk')({ key: process.env.HELLOSIGN_API_KEY });
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign', function (req, res, next) {
  const { email, name } = req.body
  const options = {
    test_mode: 1,
    clientId: process.env.CLIENT_ID,
    title: 'NDA with Acme Co.',
    subject: 'The NDA we talked about',
    message: 'Please sign this NDA and then we can discuss more. Let me know if you have any questions.',
    signers: [
      {
        email_address: email,
        name: name,
      },
    ],
    attachments: [
      {
        name: 'Example Name',
        instructions: 'Example instructions',
        required: 1,
        signer_index: 0,
      },
    ],
    cc_email_addresses: ['lawyer@example1.com', 'lawyer@example2.com'],
    file_url: ['https://nondisclosureagreement.com/wp-content/uploads/2020/11/Basic-Non-Disclosure-Agreement.pdf']
  };

   hellosign.signatureRequest.createEmbedded(options)
    .then((response) => {
      const signatureId = response.signature_request.signatures[0].signature_id;
      return hellosign.embedded.getSignUrl(signatureId)
    })
    .then((response) => {
      console.log(response);
      res.status(201).json({ data: response })
    })
    .catch((error) => {
      console.log(error)

      res.status(500).json({
        error
      })
    })
})

module.exports = router;
