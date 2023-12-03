const mongoose = require("mongoose");

const createZoomMeetingSchema = mongoose.Schema(
  {
    uuid: { type: String, required: false },
    id: { type: String, required: false },
    host_id: { type: String, required: false },
    host_email: { type: String, required: false },
    topic: { type: String, required: false },
    type: { type: Number, required: false },
    status: { type: String, required: false },
    start_time: { type: String, required: false },
    duration: { type: Number, required: false },
    timezone: { type: String, required: false },
    created_at: { type: String, required: false },
    start_url: { type: String, required: false },
    join_url: { type: String, required: false },
    password: { type: String, required: false },
    h323_password: { type: String, required: false },
    pstn_password: { type: String, required: false },
    encrypted_password: { type: String, required: false },
    settings: {
      host_video: { type: Boolean, default: false, required: false },
      participant_video: { type: Boolean, default: false, required: false },
      host_video: { type: Boolean, default: false, required: false },
      participant_video: { type: Boolean, default: false, required: false },

      cn_meeting: { type: Boolean, default: false, required: false },
      in_meeting: { type: Boolean, default: false, required: false },
      join_before_host: { type: Boolean, default: false, required: false },
      jbh_time: { type: Boolean, default: false, required: false },

      mute_upon_entry: { type: Boolean, default: false, required: false },
      watermark: { type: Boolean, default: false, required: false },
      use_pmi: { type: Boolean, default: false, required: false },
      approval_type: { type: Number, required: false },

      audio: { type: String, required: false },
      auto_recording: { type: String, required: false },
      enforce_login: { type: Boolean, default: false, required: false },
      enforce_login_domains: { type: String, required: false },
      alternative_hosts: { type: String, required: false },
      alternative_host_update_polls: {
        type: Boolean,
        default: false,
        required: false,
      },
      close_registration: { type: Boolean, default: false, required: false },
      show_share_button: { type: Boolean, default: false, required: false },
      allow_multiple_devices: {
        type: Boolean,
        default: false,
        required: false,
      },
      registrants_confirmation_email: {
        type: Boolean,
        default: false,
        required: false,
      },
      waiting_room: { type: Boolean, default: false, required: false },
      request_permission_to_unmute_participants: {
        type: Boolean,
        default: false,
        required: false,
      },
      registrants_email_notification: {
        type: Boolean,
        default: false,
        required: false,
      },
      meeting_authentication: {
        type: Boolean,
        default: false,
        required: false,
      },
      encryption_type: { type: String, required: false },
      approved_or_denied_countries_or_regions: {
        enable: { type: Boolean, default: false, required: false },
      },
      breakout_room: {
        enable: { type: Boolean, default: false, required: false },
      },
      internal_meeting: { type: Boolean, default: false, required: false },
      continuous_meeting_chat: {
        enable: { type: Boolean, default: false, required: false },
        auto_add_invited_external_users: {
          type: Boolean,
          default: false,
          required: false,
        },
      },
      participant_focused_meeting: {
        type: Boolean,
        default: false,
        required: false,
      },
      push_change_to_calendar: {
        type: Boolean,
        default: false,
        required: false,
      },
      resources: { type: Array, required: false },
      alternative_hosts_email_notification: {
        type: Boolean,
        default: false,
        required: false,
      },
      show_join_info: { type: Boolean, default: false, required: false },
      device_testing: { type: Boolean, default: false, required: false },
      focus_mode: { type: Boolean, default: false, required: false },
      enable_dedicated_group_chat: {
        type: Boolean,
        default: false,
        required: false,
      },
      private_meeting: { type: Boolean, default: false, required: false },
      email_notification: { type: Boolean, default: false, required: false },
      host_save_video_order: { type: Boolean, default: false, required: false },
      sign_language_interpretation: {
        enable: { type: Boolean, default: false, required: false },
      },
      email_in_attendee_report: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    pre_schedule: { type: Boolean, default: false, required: false },
  },
  { versionKey: false, timestamps: true }
);

const createZoomMeetingModel = mongoose.model(
  "ZoomMeeting",
  createZoomMeetingSchema
);

module.exports = createZoomMeetingModel;
