const Lead = require('../models/Lead');

// Submit brand collaboration request
exports.submitBrandCollaboration = async (req, res) => {
  try {
    // Accept parameters from body, query, or URL params
    const user_fullName = req.body.user_fullName || req.query.user_fullName || req.params.user_fullName;
    const user_email = req.body.user_email || req.query.user_email || req.params.user_email;
    const user_companey_name = req.body.user_companey_name || req.query.user_companey_name || req.params.user_companey_name;
    const user_role = req.body.user_role || req.query.user_role || req.params.user_role;
    const user_phone_number = req.body.user_phone_number || req.query.user_phone_number || req.params.user_phone_number;

    // Validate required fields
    if (!user_fullName || !user_email || !user_companey_name || !user_role || !user_phone_number) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: user_fullName, user_email, user_companey_name, user_role, user_phone_number',
      });
    }

    // Check if email already submitted brand collaboration
    const existingSubmission = await Lead.findOne({
      email: user_email.toLowerCase().trim(),
      type: 'brand_collaboration',
    });

    if (existingSubmission) {
      return res.status(409).json({
        success: false,
        error: 'Email already submitted for brand collaboration',
      });
    }

    // Create brand collaboration submission
    const submission = new Lead({
      email: user_email,
      company: user_companey_name,
      phone: user_phone_number,
      message: `Full Name: ${user_fullName}, Role: ${user_role}`,
      type: 'brand_collaboration',
    });

    await submission.save();

    res.status(201).json({
      success: true,
      message: 'Successfully submitted brand collaboration request',
      submission: {
        _id: submission._id,
        user_fullName,
        user_email: submission.email,
        user_companey_name: submission.company,
        user_role,
        user_phone_number: submission.phone,
        createdAt: submission.createdAt,
      },
    });
  } catch (error) {
    console.error('Error submitting brand collaboration:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit brand collaboration request',
    });
  }
};

// Get all brand collaboration requests
exports.getBrandCollaborations = async (req, res) => {
  try {
    const collaborations = await Lead.find({ type: 'brand_collaboration' })
      .sort({ createdAt: -1 });

    const formattedCollaborations = collaborations.map(collab => {
      const messageParts = collab.message.match(/Full Name: ([^,]+), Role: (.+)/);
      const fullName = messageParts ? messageParts[1] : 'N/A';
      const role = messageParts ? messageParts[2] : 'N/A';

      return {
        _id: collab._id,
        user_fullName: fullName,
        user_email: collab.email,
        user_companey_name: collab.company,
        user_role: role,
        user_phone_number: collab.phone,
        createdAt: collab.createdAt,
      };
    });

    res.json({
      success: true,
      count: formattedCollaborations.length,
      collaborations: formattedCollaborations,
    });
  } catch (error) {
    console.error('Error fetching brand collaborations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch brand collaborations',
    });
  }
};

// Cancel brand collaboration request by email
exports.cancelBrandCollaboration = async (req, res) => {
  try {
    // Accept email from request body, query, or URL path
    const user_email = req.body.user_email || req.query.user_email || req.params.user_email;

    if (!user_email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    const submission = await Lead.findOneAndDelete({
      email: user_email.toLowerCase().trim(),
      type: 'brand_collaboration',
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Brand collaboration request not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully cancelled brand collaboration request',
    });
  } catch (error) {
    console.error('Error cancelling brand collaboration:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel brand collaboration request',
    });
  }
};

// Delete brand collaboration request by ID (admin)
exports.deleteBrandCollaboration = async (req, res) => {
  try {
    const submission = await Lead.findByIdAndDelete(req.params.id);

    if (!submission || submission.type !== 'brand_collaboration') {
      return res.status(404).json({
        success: false,
        error: 'Brand collaboration request not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully removed brand collaboration request',
    });
  } catch (error) {
    console.error('Error deleting brand collaboration:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete brand collaboration request',
    });
  }
};
