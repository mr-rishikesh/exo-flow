const GoogleSheetsService = require('../services/GoogleSheetsService');

exports.captureLeadNewsletterSubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        success: false,
        error: 'Valid email is required',
      });
    }

    const leadData = {
      email: email.toLowerCase().trim(),
      purpose: 'Newsletter Subscription',
      source: 'API - Newsletter',
    };

    await GoogleSheetsService.appendLead(leadData);

    return res.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      email: leadData.email,
    });
  } catch (error) {
    console.error('Error capturing newsletter lead:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to subscribe',
    });
  }
};

exports.captureLeadMagazineDownload = async (req, res) => {
  try {
    const { email, magazineTitle } = req.body;

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        success: false,
        error: 'Valid email is required',
      });
    }

    const leadData = {
      email: email.toLowerCase().trim(),
      purpose: `Download Magazine: ${magazineTitle || 'General'}`,
      source: 'API - Magazine',
      details: magazineTitle,
    };

    await GoogleSheetsService.appendLead(leadData);

    return res.json({
      success: true,
      message: 'Download link sent to your email',
      email: leadData.email,
    });
  } catch (error) {
    console.error('Error capturing magazine lead:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to process download',
    });
  }
};

exports.captureLeadGetFeatured = async (req, res) => {
  try {
    const { email, fullName, companyName, role } = req.body;

    if (!email || !fullName || !companyName) {
      return res.status(400).json({
        success: false,
        error: 'Email, full name, and company name are required',
      });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        success: false,
        error: 'Valid email is required',
      });
    }

    const leadData = {
      email: email.toLowerCase().trim(),
      fullName: fullName.trim(),
      companyName: companyName.trim(),
      role: role?.trim() || '',
      purpose: 'Get Featured',
      source: 'API - Get Featured',
    };

    await GoogleSheetsService.appendLead(leadData);

    return res.json({
      success: true,
      message: 'Application submitted successfully',
      data: leadData,
    });
  } catch (error) {
    console.error('Error capturing get featured lead:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit application',
    });
  }
};

exports.captureLeadMasterclassRegister = async (req, res) => {
  try {
    const { email, fullName, companyName, role, masterclassTitle, masterclassDate } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({
        success: false,
        error: 'Email and full name are required',
      });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        success: false,
        error: 'Valid email is required',
      });
    }

    const leadData = {
      email: email.toLowerCase().trim(),
      fullName: fullName.trim(),
      companyName: companyName?.trim() || '',
      role: role?.trim() || '',
      purpose: `Masterclass Registration: ${masterclassTitle || 'General'}`,
      source: 'API - Masterclass',
      details: `Date: ${masterclassDate || 'TBD'}`,
    };

    await GoogleSheetsService.appendLead(leadData);

    return res.json({
      success: true,
      message: 'Registered for masterclass successfully',
      data: leadData,
    });
  } catch (error) {
    console.error('Error capturing masterclass lead:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to register',
    });
  }
};

exports.captureLeadEventAttendance = async (req, res) => {
  try {
    const { email, fullName, companyName, role, eventName, eventDate } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({
        success: false,
        error: 'Email and full name are required',
      });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        success: false,
        error: 'Valid email is required',
      });
    }

    const leadData = {
      email: email.toLowerCase().trim(),
      fullName: fullName.trim(),
      companyName: companyName?.trim() || '',
      role: role?.trim() || '',
      purpose: `Event Attendance: ${eventName || 'General Event'}`,
      source: 'API - Event',
      details: `Date: ${eventDate || 'TBD'}`,
    };

    await GoogleSheetsService.appendLead(leadData);

    return res.json({
      success: true,
      message: 'Event registration confirmed',
      data: leadData,
    });
  } catch (error) {
    console.error('Error capturing event lead:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to register for event',
    });
  }
};

exports.captureLeadPlaybookAccess = async (req, res) => {
  try {
    const { email, fullName, companyName, role, playbookTitle } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({
        success: false,
        error: 'Email and full name are required',
      });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        success: false,
        error: 'Valid email is required',
      });
    }

    const leadData = {
      email: email.toLowerCase().trim(),
      fullName: fullName.trim(),
      companyName: companyName?.trim() || '',
      role: role?.trim() || '',
      purpose: `Playbook Access: ${playbookTitle || 'General'}`,
      source: 'API - Playbook',
      details: playbookTitle,
    };

    await GoogleSheetsService.appendLead(leadData);

    return res.json({
      success: true,
      message: 'Playbook access granted',
      data: leadData,
    });
  } catch (error) {
    console.error('Error capturing playbook lead:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to grant access',
    });
  }
};

exports.captureLeadGeneral = async (req, res) => {
  try {
    const { email, fullName, companyName, role, purpose } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        success: false,
        error: 'Valid email is required',
      });
    }

    if (!purpose) {
      return res.status(400).json({
        success: false,
        error: 'Purpose is required',
      });
    }

    const leadData = {
      email: email.toLowerCase().trim(),
      fullName: fullName?.trim() || '',
      companyName: companyName?.trim() || '',
      role: role?.trim() || '',
      purpose: purpose.trim(),
      source: 'API - General',
    };

    await GoogleSheetsService.appendLead(leadData);

    return res.json({
      success: true,
      message: 'Lead captured successfully',
      data: leadData,
    });
  } catch (error) {
    console.error('Error capturing general lead:', error.message);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to capture lead',
    });
  }
};
