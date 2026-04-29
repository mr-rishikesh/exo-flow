const Lead = require('../models/Lead');

// Subscribe for playbook - requires user details
exports.subscribePlaybook = async (req, res) => {
  try {
    // Accept parameters from URL path, query, or body
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

    // Check if email already subscribed for playbook
    const existingSubscriber = await Lead.findOne({
      email: user_email.toLowerCase().trim(),
      type: 'playbook_subscription',
    });

    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        error: 'Email already subscribed for playbook',
      });
    }

    // Create playbook subscription
    const subscription = new Lead({
      email: user_email,
      company: user_companey_name,
      phone: user_role, // Store role in phone field for now
      message: `Full Name: ${user_fullName}, Role: ${user_role}`, // Store full name and role in message
      type: 'playbook_subscription',
    });

    await subscription.save();

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed for playbook',
      subscription: {
        _id: subscription._id,
        user_fullName,
        user_email: subscription.email,
        user_companey_name: subscription.company,
        user_role,
        createdAt: subscription.createdAt,
      },
    });
  } catch (error) {
    console.error('Error subscribing to playbook:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to subscribe for playbook',
    });
  }
};

// Get all playbook subscribers
exports.getPlaybookSubscribers = async (req, res) => {
  try {
    const subscribers = await Lead.find({ type: 'playbook_subscription' })
      .sort({ createdAt: -1 });

    const formattedSubscribers = subscribers.map(sub => {
      const messageParts = sub.message.match(/Full Name: ([^,]+), Role: (.+)/);
      const fullName = messageParts ? messageParts[1] : 'N/A';
      const role = messageParts ? messageParts[2] : sub.phone;

      return {
        _id: sub._id,
        user_fullName: fullName,
        user_email: sub.email,
        user_companey_name: sub.company,
        user_role: role,
        createdAt: sub.createdAt,
      };
    });

    res.json({
      success: true,
      count: formattedSubscribers.length,
      subscribers: formattedSubscribers,
    });
  } catch (error) {
    console.error('Error fetching playbook subscribers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch playbook subscribers',
    });
  }
};

// Unsubscribe from playbook by email
exports.unsubscribePlaybook = async (req, res) => {
  try {
    // Accept email from request body, query, or URL path
    const user_email = req.body.user_email || req.query.user_email || req.params.user_email;

    if (!user_email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    const subscription = await Lead.findOneAndDelete({
      email: user_email.toLowerCase().trim(),
      type: 'playbook_subscription',
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Playbook subscription not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully unsubscribed from playbook',
    });
  } catch (error) {
    console.error('Error unsubscribing from playbook:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to unsubscribe from playbook',
    });
  }
};

// Delete subscriber by ID (admin)
exports.deletePlaybookSubscriber = async (req, res) => {
  try {
    const subscription = await Lead.findByIdAndDelete(req.params.id);

    if (!subscription || subscription.type !== 'playbook_subscription') {
      return res.status(404).json({
        success: false,
        error: 'Playbook subscription not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully removed playbook subscriber',
    });
  } catch (error) {
    console.error('Error deleting playbook subscriber:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete playbook subscriber',
    });
  }
};
