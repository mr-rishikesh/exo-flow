const Lead = require('../models/Lead');

// Subscribe email for magazine
exports.subscribeMagazineEmail = async (req, res) => {
  try {
    // Accept email from body, query, or URL params
    const user_email = req.body.user_email || req.query.user_email || req.params.user_email;

    // Validate required field
    if (!user_email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required. Provide as: /subscribe/:email or /subscribe?email=user@example.com or in request body',
      });
    }

    // Check if email already subscribed for magazine
    const existingSubscriber = await Lead.findOne({
      email: user_email.toLowerCase().trim(),
      type: 'magazine_subscription',
    });

    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        error: 'Email already subscribed for magazine',
      });
    }

    // Create magazine subscription
    const subscription = new Lead({
      email: user_email.toLowerCase().trim(),
      company: 'Magazine Subscriber',
      type: 'magazine_subscription',
    });

    await subscription.save();

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to magazine',
      subscription: {
        _id: subscription._id,
        user_email: subscription.email,
        createdAt: subscription.createdAt,
      },
    });
  } catch (error) {
    console.error('Error subscribing to magazine:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to subscribe to magazine',
    });
  }
};

// Get all magazine subscribers
exports.getMagazineSubscribers = async (req, res) => {
  try {
    const subscribers = await Lead.find({ type: 'magazine_subscription' })
      .sort({ createdAt: -1 });

    const formattedSubscribers = subscribers.map(sub => ({
      _id: sub._id,
      user_email: sub.email,
      createdAt: sub.createdAt,
    }));

    res.json({
      success: true,
      count: formattedSubscribers.length,
      subscribers: formattedSubscribers,
    });
  } catch (error) {
    console.error('Error fetching magazine subscribers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch magazine subscribers',
    });
  }
};

// Unsubscribe from magazine by email
exports.unsubscribeMagazine = async (req, res) => {
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
      type: 'magazine_subscription',
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Magazine subscription not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully unsubscribed from magazine',
    });
  } catch (error) {
    console.error('Error unsubscribing from magazine:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to unsubscribe from magazine',
    });
  }
};

// Delete subscriber by ID (admin)
exports.deleteMagazineSubscriber = async (req, res) => {
  try {
    const subscription = await Lead.findByIdAndDelete(req.params.id);

    if (!subscription || subscription.type !== 'magazine_subscription') {
      return res.status(404).json({
        success: false,
        error: 'Magazine subscription not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully removed magazine subscriber',
    });
  } catch (error) {
    console.error('Error deleting magazine subscriber:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete magazine subscriber',
    });
  }
};
