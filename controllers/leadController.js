const Lead = require('../models/Lead');
const NotificationService = require('../services/NotificationService');

exports.createLead = async (req, res) => {
  try {
    const { company, email, phone, message, file, type } = req.body;

    if (!company || !email) {
      return res.status(400).json({
        success: false,
        error: 'Company and email are required',
      });
    }

    const lead = new Lead({
      company,
      email,
      phone: phone || '',
      message: message || '',
      file: file || null,
      type: type || 'general_inquiry',
    });

    await lead.save();

    await NotificationService.notifyLead(lead);

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      lead,
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create lead',
    });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leads',
    });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }
    res.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch lead',
    });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    res.json({
      success: true,
      message: 'Lead updated successfully',
      lead,
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update lead',
    });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        error: 'Lead not found',
      });
    }

    res.json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete lead',
    });
  }
};
