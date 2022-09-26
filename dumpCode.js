const Account = require("../models/account");
const config = require("config");
const Joi = require("joi");
const authenticate = require("../middleware/authenticate");

router.post("/", async (req, res) => {
  try {
    const schemaPayload = Joi.object({
      password: Joi.string().required(),
      userId: Joi.number().integer().min(1).required(),
      userName: Joi.string().required(),
    });

    const validPayload = schemaPayload.validate(req.body);

    if (validPayload.error)
      throw {
        statusCode: 400,
        errorMessage: "Badly formatted request payload",
        errorObj: error,
      };


    const newAccount = await Account.createAccount(
      req.body.password,
      req.body.userId,
      req.body.userName
    );

    return res.send(JSON.stringify(newAccount));
  } catch (err) {
    if (err.statusCode)
      return res.status(err.statusCode).send(JSON.stringify(err));
    return res.status(500).send(JSON.stringify(err));
  }
});

// PUT /api/accounts
router.put("/own", [authenticate], async (req, res) => {
  // res.send(JSON.stringify());
  console.log(`this is token obj `);
  console.log(req.account);
  try {
    const changeName = req.body;
    console.log(`get the new name:`);
    console.log(changeName);

    const schema = Joi.object({
      displayName: Joi.string().min(3).required(),
    });
    let validChangePayload = schema.validate(changeName);
    console.log("payload validated");

    if (validChangePayload.error)
      throw {
        statusCode: 400,
        errorMessage: "Badly formatted request payload",
        errorObj: error,
      };

    console.log("no error so far in accounts");

    const updatedAccount = await Account.changeDisplayName(
      changeName.displayName,
      req.account.accountId,
      req.account.email
    );
    return res.send(JSON.stringify(updatedAccount));
  } catch (err) {
    console.log("we are at the error");
    if (err.statusCode)
      return res.status(err.statusCode).send(JSON.stringify(err));
    return res.status(500).send(JSON.stringify(err));
  }
});

// DELETE /api/accounts/:accountid
router.delete("/:accountid", [authenticate], async (req, res) => {

});