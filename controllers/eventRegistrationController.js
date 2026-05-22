const Lead = require('../models/Lead');

// Register for event
exports.registerEvent = async (req, res) => {
  try {
    // Accept parameters from body, query, or URL params
    const user_fullName = req.body.user_fullName || req.query.user_fullName || req.params.user_fullName;
    const user_email = req.body.user_email || req.query.user_email || req.params.user_email;
    const user_companey_name = req.body.user_companey_name || req.query.user_companey_name || req.params.user_companey_name;
    const user_role = req.body.user_role || req.query.user_role || req.params.user_role;

    // Validate required fields
    if (!user_fullName || !user_email || !user_companey_name || !user_role) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: user_fullName, user_email, user_companey_name, user_role',
      });
    }

    // Check if email already registered for event
    const existingRegistration = await Lead.findOne({
      email: user_email.toLowerCase().trim(),
      type: 'event_registration',
    });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered for event',
      });
    }

    // Create event registration
    const registration = new Lead({
      email: user_email,
      company: user_companey_name,
      phone: user_role,
      message: `Full Name: ${user_fullName}, Role: ${user_role}`,
      type: 'event_registration',
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Successfully registered for event',
      registration: {
        _id: registration._id,
        user_fullName,
        user_email: registration.email,
        user_companey_name: registration.company,
        user_role,
        createdAt: registration.createdAt,
      },
    });
  } catch (error) {
    console.error('Error registering for event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to register for event',
    });
  }
};

// Get all event registrations
exports.getEventRegistrations = async (req, res) => {
  try {
    const registrations = await Lead.find({ type: 'event_registration' })
      .sort({ createdAt: -1 });

    const formattedRegistrations = registrations.map(reg => {
      const messageParts = reg.message.match(/Full Name: ([^,]+), Role: (.+)/);
      const fullName = messageParts ? messageParts[1] : 'N/A';
      const role = messageParts ? messageParts[2] : reg.phone;

      return {
        _id: reg._id,
        user_fullName: fullName,
        user_email: reg.email,
        user_companey_name: reg.company,
        user_role: role,
        createdAt: reg.createdAt,
      };
    });

    res.json({
      success: true,
      count: formattedRegistrations.length,
      registrations: formattedRegistrations,
    });
  } catch (error) {
    console.error('Error fetching event registrations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch event registrations',
    });
  }
};

// Cancel event registration by email
exports.cancelEventRegistration = async (req, res) => {
  try {
    // Accept email from request body, query, or URL path
    const user_email = req.body.user_email || req.query.user_email || req.params.user_email;

    if (!user_email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    const registration = await Lead.findOneAndDelete({
      email: user_email.toLowerCase().trim(),
      type: 'event_registration',
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        error: 'Event registration not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully cancelled event registration',
    });
  } catch (error) {
    console.error('Error cancelling event registration:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel event registration',
    });
  }
};

// Delete registration by ID (admin)
exports.deleteEventRegistration = async (req, res) => {
  try {
    const registration = await Lead.findByIdAndDelete(req.params.id);

    if (!registration || registration.type !== 'event_registration') {
      return res.status(404).json({
        success: false,
        error: 'Event registration not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully removed event registration',
    });
  } catch (error) {
    console.error('Error deleting event registration:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete event registration',
    });
  }
};
