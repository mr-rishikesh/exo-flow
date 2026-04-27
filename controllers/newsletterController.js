const Lead = require('../models/Lead');

// Subscribe to newsletter - accepts email from body, query, or URL parameters
exports.subscribeNewsletter = async (req, res) => {
  try {
    // Accept email from request body, query parameters, or URL path
    const email = req.body.email || req.query.email || req.params.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required. Provide as: /subscribe/:email or /subscribe?email=user@example.com or in request body',
      });
    }

    // Check if email already subscribed to newsletter
    const existingSubscriber = await Lead.findOne({
      email: email.toLowerCase().trim(),
      type: 'newsletter',
    });

    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        error: 'Email already subscribed to newsletter',
      });
    }

    // Create newsletter subscription
    const subscription = new Lead({
      email,
      type: 'newsletter',
      company: 'Newsletter Subscriber', // Default company name
    });

    await subscription.save();

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      subscription: {
        _id: subscription._id,
        email: subscription.email,
        type: subscription.type,
        createdAt: subscription.createdAt,
      },
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to subscribe to newsletter',
    });
  }
};

// Get all newsletter subscribers
exports.getNewsletterSubscribers = async (req, res) => {
  try {
    const subscribers = await Lead.find({ type: 'newsletter' })
      .select('email createdAt')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch newsletter subscribers',
    });
  }
};

// Unsubscribe from newsletter by email
exports.unsubscribeNewsletter = async (req, res) => {
  try {
    // Accept email from request body, query parameters, or URL path
    const email = req.body.email || req.query.email || req.params.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required. Provide as: /unsubscribe/:email or /unsubscribe?email=user@example.com or in request body',
      });
    }

    const subscription = await Lead.findOneAndDelete({
      email: email.toLowerCase().trim(),
      type: 'newsletter',
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    });
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to unsubscribe from newsletter',
    });
  }
};

// Unsubscribe by ID
exports.unsubscribeNewsletterById = async (req, res) => {
  try {
    const subscription = await Lead.findByIdAndDelete(req.params.id);

    if (!subscription || subscription.type !== 'newsletter') {
      return res.status(404).json({
        success: false,
        error: 'Newsletter subscription not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    });
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to unsubscribe from newsletter',
    });
  }
};
