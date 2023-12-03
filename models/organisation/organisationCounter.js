const { default: mongoose } = require("mongoose");

const OrganisationCounterSchema = mongoose.Schema(
  {
    counter: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


const OrganisationCounter = mongoose.model("organisationCounter", OrganisationCounterSchema)

module.exports = OrganisationCounter