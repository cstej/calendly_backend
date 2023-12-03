const Organisation = require("../../models/organisation/organisation.schema");
const organisationSchema = require("../../models/organisation/organisation.schema");
const User = require("../../models/users/users.schema");
const Users = require("../../models/users/users.schema");
const bcryptjs = require("bcryptjs");
const Joi = require("joi");
const JwtService = require("../../utils/JwtService");
const OrganisationCounter = require("../../models/organisation/organisationCounter");
// const branchModel = require("../../models/Admin/Branch/branch.model");

const createUserController = async (req, res) => {
  const cookieOptions = {
    maxAge: 172800000,
  };
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      orgName: Joi.string().required(),
      phone: Joi.number().required(),
    });

    const { error, value: { name, email, password, orgName, phone } = {} } =
      schema.validate(req.body);

    if (error) {
      return res.status(401).json({ success: false, message: error.message });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    console.log("checkhere", req.body.phone.length);
    if (req.body.phone.length !== 10) {
      return res.status(400).send({
        message: "Phone number should be contain 10 digits",
        status: false,
      });
    }

    const orgNumber = await generateOrganisationNumber();
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      orgNumber,
      phone,
      role: "superadmin",
    });

    const newOrganisation = new organisationSchema({
      name: orgName,
      orgNumber,
    });

    newUser.orgId = newOrganisation._id;
    newOrganisation.createdBy = newUser._id;

    await Promise.all([newUser.save(), newOrganisation.save()]);

    const token = await JwtService.sign({
      _id: newUser._id,
      role: newUser.role,
      email: newUser.email,
      orgNumber,
    });

    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({
        success: true,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          orgNumber: newUser.orgNumber,
          phone: newUser.phone,
        },
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

async function generateOrganisationNumber() {
  try {
    const orgNumber = await OrganisationCounter.findOneAndUpdate(
      {},
      {
        $inc: {
          counter: 1,
        },
      },
      { new: true, upsert: true }
    );
    return orgNumber.counter;
  } catch (error) {
    console.error("Error in generateOrganisationNumber:", error);
    throw error; // Rethrow the error to be handled in the calling function
  }
}

module.exports = createUserController;
