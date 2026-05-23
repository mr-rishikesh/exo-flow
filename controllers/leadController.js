const LeadService = require('../services/LeadService');
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

    const leadData = {
      company,
      email: email.toLowerCase().trim(),
      phone: phone || '',
      message: message || '',
      file: file || null,
      type: type || 'general_inquiry',
    };

    const lead = await LeadService.addLead(leadData);

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
    const leads = await LeadService.getAllLeads();
    res.json(leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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
    const lead = await LeadService.getLeadById(req.params.id);
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
    const lead = await LeadService.updateLead(req.params.id, { status, notes });

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
    await LeadService.deleteLead(req.params.id);

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
