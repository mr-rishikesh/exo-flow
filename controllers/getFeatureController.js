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
