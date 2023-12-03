const mongoose = require("mongoose");

const ZoomTokenSchema = mongoose.Schema(
  {
    access_token: { type: String, required: false },
    token_type: { type: String, required: false },
    refresh_token: { type: String, required: false },
    expires_in: { type: Date, required: false },
    scope: { type: String, required: false },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    orgNumber: {
      type: String,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);


const ZoomTokenModel=mongoose.model('zoomToken',ZoomTokenSchema)

module.exports = ZoomTokenModel;