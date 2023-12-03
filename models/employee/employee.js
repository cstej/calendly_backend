const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    employee_name:{
        type:String,
        require:true
    },
    employee_email:{
        type:String,
        require:true
    },
    event_link:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Event"
    },
    schedule_id:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Schedule"
    }

},{
    timestamps: true,
  }
  )
const Employee = mongoose.model("Employee", eventSchema);
module.exports = Employee;