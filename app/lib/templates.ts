export const templates = {
  camera: {
    friendly:
      "Thanks for checking. The camera is only located outside the entrance for security purposes, and there are no cameras inside the unit.",
    professional:
      "The camera is located only at the exterior entrance for security purposes. There are no cameras inside the unit.",
    firm:
      "To confirm, the only camera is outside the entrance for security. There are no cameras inside the unit."
  },

  parking: {
    friendly:
      "Thanks for asking! Free street parking is available nearby.",
    professional:
      "Free street parking is available nearby.",
    firm:
      "Parking is street parking nearby."
  },

  wifi: {
    friendly:
      "Yes, Wi-Fi is available. The details will be shared before check-in.",
    professional:
      "Wi-Fi is available, and the details will be provided before check-in.",
    firm:
      "Wi-Fi is available. Details are shared before check-in."
  },

  early_checkin: {
    friendly:
      "Thanks for asking! Early check-in depends on whether the unit is ready after the previous guest checks out. I’ll be happy to confirm on the day of arrival if it becomes available.",
    professional:
      "Early check-in depends on whether the unit is ready after the previous guest checks out. I can confirm on the day of arrival if it becomes available.",
    firm:
      "Early check-in is not guaranteed and depends on unit availability that day."
  },

  heating: {
    friendly:
      "Thanks for letting me know. Central heating is available, and I’m happy to help if the space feels too cold.",
    professional:
      "Central heating is available. Please let me know if the space feels too cold, and I can help troubleshoot.",
    firm:
      "Heating is available. Please let me know the issue and I’ll help."
  },

  checkin: {
    friendly:
      "Everything is all set for your stay. I’ll send the check-in instructions shortly before your arrival.",
    professional:
      "Everything is set for your stay. Check-in instructions will be sent before arrival.",
    firm:
      "Check-in instructions will be sent before arrival."
  },

  general: {
    friendly:
      "Thanks for your message! Everything is all set for your stay. Please let me know if you have any other questions.",
    professional:
      "Thank you for your message. Everything is set for your stay. Please let me know if you have any further questions.",
    firm:
      "Everything is set. Please let me know if you need anything else."
  }
} as const;
