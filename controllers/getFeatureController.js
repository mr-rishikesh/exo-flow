const Lead = require('../models/Lead');

// Submit founder story for featured
exports.submitFounderStory = async (req, res) => {
  try {
    // Accept parameters from body, query, or URL params
    const fullname = req.body.fullname || req.query.fullname || req.params.fullname;
    const email = req.body.email || req.query.email || req.params.email;
    const phone = req.body.phone || req.query.phone || req.params.phone;
    const startup_name = req.body.startup_name || req.query.startup_name || req.params.startup_name;
    const startup_website = req.body.startup_website || req.query.startup_website || req.params.startup_website;
    const founder_story_url = req.body.founder_story_url || req.query.founder_story_url || req.params.founder_story_url;
    const founders_profile_photo = req.body.founders_profile_photo || req.query.founders_profile_photo || req.params.founders_profile_photo;

    // Validate required fields
    if (!fullname || !email || !phone || !startup_name || !startup_website || !founder_story_url || !founders_profile_photo) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: fullname, email, phone, startup_name, startup_website, founder_story_url, founders_profile_photo',
      });
    }

    // Check if email already submitted
    const existingSubmission = await Lead.findOne({
      email: email.toLowerCase().trim(),
      type: 'get_featured',
    });

    if (existingSubmission) {
      return res.status(409).json({
        success: false,
        error: 'Email already submitted for get featured',
      });
    }

    // Create get featured submission
    const submission = new Lead({
      email: email.toLowerCase().trim(),
      company: startup_name,
      phone,
      message: `Full Name: ${fullname}, Startup: ${startup_name}, Website: ${startup_website}, Story URL: ${founder_story_url}, Profile Photo: ${founders_profile_photo}`,
      file: founders_profile_photo,
      type: 'get_featured',
    });

    await submission.save();

    res.status(201).json({
      success: true,
      message: 'Successfully submitted founder story for featured',
      submission: {
        _id: submission._id,
        fullname,
        email: submission.email,
        phone,
        startup_name,
        startup_website,
        founder_story_url,
        founders_profile_photo,
        createdAt: submission.createdAt,
      },
    });
  } catch (error) {
    console.error('Error submitting founder story:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit founder story',
    });
  }
};

// Get all get featured submissions
exports.getFeatureSubmissions = async (req, res) => {
  try {
    const submissions = await Lead.find({ type: 'get_featured' })
      .sort({ createdAt: -1 });

    const formattedSubmissions = submissions.map(sub => {
      const messageParts = sub.message.match(/Full Name: ([^,]+), Startup: ([^,]+), Website: ([^,]+), Story URL: ([^,]+), Profile Photo: (.+)/);
      const fullname = messageParts ? messageParts[1] : 'N/A';
      const startup_name = messageParts ? messageParts[2] : 'N/A';
      const startup_website = messageParts ? messageParts[3] : 'N/A';
      const founder_story_url = messageParts ? messageParts[4] : 'N/A';
      const founders_profile_photo = messageParts ? messageParts[5] : sub.file;

      return {
        _id: sub._id,
        fullname,
        email: sub.email,
        phone: sub.phone,
        startup_name,
        startup_website,
        founder_story_url,
        founders_profile_photo,
        createdAt: sub.createdAt,
      };
    });

    res.json({
      success: true,
      count: formattedSubmissions.length,
      submissions: formattedSubmissions,
    });
  } catch (error) {
    console.error('Error fetching get featured submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch get featured submissions',
    });
  }
};

// Delete submission by ID (admin)
exports.deleteFeatureSubmission = async (req, res) => {
  try {
    const submission = await Lead.findByIdAndDelete(req.params.id);

    if (!submission || submission.type !== 'get_featured') {
      return res.status(404).json({
        success: false,
        error: 'Get featured submission not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully removed get featured submission',
    });
  } catch (error) {
    console.error('Error deleting get featured submission:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete get featured submission',
    });
  }
};

// Submit role change announcement
exports.submitRoleChangeAnnouncement = async (req, res) => {
  try {
    // Accept parameters from body, query, or URL params
    const fullname = req.body.fullname || req.query.fullname || req.params.fullname;
    const user_email = req.body.user_email || req.query.user_email || req.params.user_email;
    const phone = req.body.phone || req.query.phone || req.params.phone;
    const current_organization = req.body.current_organization || req.query.current_organization || req.params.current_organization;
    const new_organization = req.body.new_organization || req.query.new_organization || req.params.new_organization;
    const new_designation = req.body.new_designation || req.query.new_designation || req.params.new_designation;
    const comment = req.body.comment || req.query.comment || req.params.comment;

    // Validate required fields
    if (!fullname || !user_email || !phone || !current_organization || !new_organization || !new_designation) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required: fullname, user_email, phone, current_organization, new_organization, new_designation',
      });
    }

    // Check if email already submitted role change
    const existingSubmission = await Lead.findOne({
      email: user_email.toLowerCase().trim(),
      type: 'role_change_announcement',
    });

    if (existingSubmission) {
      return res.status(409).json({
        success: false,
        error: 'Email already submitted for role change announcement',
      });
    }

    // Create role change announcement
    const submission = new Lead({
      email: user_email.toLowerCase().trim(),
      company: new_organization,
      phone,
      message: `Full Name: ${fullname}, Current Organization: ${current_organization}, New Organization: ${new_organization}, New Designation: ${new_designation}, Comment: ${comment || 'N/A'}`,
      type: 'role_change_announcement',
    });

    await submission.save();

    res.status(201).json({
      success: true,
      message: 'Successfully submitted role change announcement',
      submission: {
        _id: submission._id,
        fullname,
        user_email: submission.email,
        phone,
        current_organization,
        new_organization,
        new_designation,
        comment: comment || null,
        createdAt: submission.createdAt,
      },
    });
  } catch (error) {
    console.error('Error submitting role change announcement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit role change announcement',
    });
  }
};

// Get all role change announcements
exports.getRoleChangeAnnouncements = async (req, res) => {
  try {
    const announcements = await Lead.find({ type: 'role_change_announcement' })
      .sort({ createdAt: -1 });

    const formattedAnnouncements = announcements.map(sub => {
      const messageParts = sub.message.match(/Full Name: ([^,]+), Current Organization: ([^,]+), New Organization: ([^,]+), New Designation: ([^,]+), Comment: (.+)/);
      const fullname = messageParts ? messageParts[1] : 'N/A';
      const current_organization = messageParts ? messageParts[2] : 'N/A';
      const new_organization = messageParts ? messageParts[3] : 'N/A';
      const new_designation = messageParts ? messageParts[4] : 'N/A';
      const comment = messageParts ? messageParts[5] : null;

      return {
        _id: sub._id,
        fullname,
        user_email: sub.email,
        phone: sub.phone,
        current_organization,
        new_organization,
        new_designation,
        comment: comment === 'N/A' ? null : comment,
        createdAt: sub.createdAt,
      };
    });

    res.json({
      success: true,
      count: formattedAnnouncements.length,
      announcements: formattedAnnouncements,
    });
  } catch (error) {
    console.error('Error fetching role change announcements:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch role change announcements',
    });
  }
};

// Delete role change announcement by ID (admin)
exports.deleteRoleChangeAnnouncement = async (req, res) => {
  try {
    const announcement = await Lead.findByIdAndDelete(req.params.id);

    if (!announcement || announcement.type !== 'role_change_announcement') {
      return res.status(404).json({
        success: false,
        error: 'Role change announcement not found',
      });
    }

    res.json({
      success: true,
      message: 'Successfully removed role change announcement',
    });
  } catch (error) {
    console.error('Error deleting role change announcement:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete role change announcement',
    });
  }
};
