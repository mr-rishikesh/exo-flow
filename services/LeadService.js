const Lead = require('../models/Lead');

// Initialize leads storage (no-op for MongoDB, kept for compatibility)
async function initializeLeads() {
  try {
    console.log('✅ Leads service initialized with MongoDB');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize leads service:', error.message);
    throw error;
  }
}

// Get all leads
async function getAllLeads() {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    return leads;
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
}

// Save all leads (no-op for MongoDB, kept for compatibility)
async function saveAllLeads(leads) {
  try {
    return true;
  } catch (error) {
    console.error('Error saving leads:', error);
    throw error;
  }
}

// Add a new lead
async function addLead(leadData) {
  try {
    const newLead = new Lead({
      company: leadData.company,
      email: leadData.email.toLowerCase().trim(),
      phone: leadData.phone || '',
      message: leadData.message || '',
      file: leadData.file || null,
      type: leadData.type || 'general_inquiry',
      isReviewed: false,
      status: 'new',
    });

    const saved = await newLead.save();
    return saved.toObject();
  } catch (error) {
    console.error('Error adding lead:', error);
    throw error;
  }
}

// Get lead by ID
async function getLeadById(id) {
  try {
    const lead = await Lead.findById(id);
    return lead ? lead.toObject() : null;
  } catch (error) {
    console.error('Error getting lead:', error);
    return null;
  }
}

// Update lead
async function updateLead(id, updateData) {
  try {
    const lead = await Lead.findByIdAndUpdate(
      id,
      {
        ...updateData,
      },
      { new: true }
    );

    if (!lead) {
      throw new Error('Lead not found');
    }

    return lead.toObject();
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
}

// Delete lead
async function deleteLead(id) {
  try {
    await Lead.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
}

// Get leads by type
async function getLeadsByType(type) {
  try {
    const leads = await Lead.find({ type }).sort({ createdAt: -1 });
    return leads.map(l => l.toObject());
  } catch (error) {
    console.error('Error getting leads by type:', error);
    return [];
  }
}

// Toggle review status
async function toggleReview(id) {
  try {
    const lead = await Lead.findById(id);
    if (!lead) {
      throw new Error('Lead not found');
    }

    return await updateLead(id, {
      isReviewed: !lead.isReviewed,
    });
  } catch (error) {
    console.error('Error toggling review:', error);
    throw error;
  }
}

// Export leads as CSV
async function exportLeadsAsCSV() {
  try {
    const leads = await Lead.find();

    if (leads.length === 0) {
      return '';
    }

    const leadObjects = leads.map(l => l.toObject());

    // Get all unique keys
    const allKeys = new Set();
    leadObjects.forEach(lead => {
      Object.keys(lead).forEach(key => allKeys.add(key));
    });

    const headers = Array.from(allKeys);
    const csvHeaders = headers.join(',');

    const csvRows = leadObjects.map(lead => {
      return headers.map(header => {
        const value = lead[header];
        if (value === null || value === undefined) {
          return '';
        }
        // Escape quotes and wrap in quotes if contains comma
        const stringValue = String(value);
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',');
    });

    return [csvHeaders, ...csvRows].join('\n');
  } catch (error) {
    console.error('Error exporting leads:', error);
    throw error;
  }
}

// Export leads as JSON
async function exportLeadsAsJSON() {
  try {
    const leads = await Lead.find();
    const leadObjects = leads.map(l => l.toObject());
    return JSON.stringify(leadObjects, null, 2);
  } catch (error) {
    console.error('Error exporting leads:', error);
    throw error;
  }
}

// Get statistics
async function getLeadStats() {
  try {
    const leads = await Lead.find();
    const leadObjects = leads.map(l => l.toObject());

    const stats = {
      total: leadObjects.length,
      new: leadObjects.filter(l => l.status === 'new').length,
      contacted: leadObjects.filter(l => l.status === 'contacted').length,
      replied: leadObjects.filter(l => l.status === 'replied').length,
      closed: leadObjects.filter(l => l.status === 'closed').length,
      reviewed: leadObjects.filter(l => l.isReviewed).length,
      unreviewed: leadObjects.filter(l => !l.isReviewed).length,
      byType: {},
    };

    // Count by type
    leadObjects.forEach(lead => {
      if (!stats.byType[lead.type]) {
        stats.byType[lead.type] = 0;
      }
      stats.byType[lead.type]++;
    });

    return stats;
  } catch (error) {
    console.error('Error getting lead stats:', error);
    return {};
  }
}

// Export leads as Excel with separate sheets for each category
async function exportLeadsAsExcel() {
  try {
    const ExcelJS = require('exceljs');
    const leads = await Lead.find();
    const leadObjects = leads.map(l => l.toObject());

    // Group leads by type
    const leadsByType = {};
    leadObjects.forEach(lead => {
      if (!leadsByType[lead.type]) {
        leadsByType[lead.type] = [];
      }
      leadsByType[lead.type].push(lead);
    });

    // Create workbook
    const workbook = new ExcelJS.Workbook();

    // Category emojis mapping
    const categoryEmojis = {
      'event_collaboration': '🤝',
      'partnership': '🤝',
      'media_inquiry': '📢',
      'general_inquiry': '❓',
      'newsletter': '📧',
      'playbook_subscription': '📖',
      'get_featured': '⭐',
      'role_change_announcement': '🔄',
      'magazine_subscription': '📑',
      'masterclass_subscription': '🎓',
      'event_registration': '📅',
      'brand_collaboration': '🎨',
      'other': '📌'
    };

    // Add a sheet for each category
    Object.keys(leadsByType).forEach(type => {
      const typeLeads = leadsByType[type];
      const emoji = categoryEmojis[type] || '📌';
      const sheetName = `${emoji} ${type.replace(/_/g, ' ')}`.substring(0, 31); // Excel sheet name limit is 31 chars

      const worksheet = workbook.addWorksheet(sheetName);

      // Set column widths
      worksheet.columns = [
        { header: 'ID', key: '_id', width: 25 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Company', key: 'company', width: 20 },
        { header: 'Phone', key: 'phone', width: 15 },
        { header: 'Message', key: 'message', width: 40 },
        { header: 'Status', key: 'status', width: 12 },
        { header: 'Reviewed', key: 'isReviewed', width: 10 },
        { header: 'Created Date', key: 'createdAt', width: 20 },
        { header: 'Updated Date', key: 'updatedAt', width: 20 },
      ];

      // Style header row
      const headerRow = worksheet.getRow(1);
      headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF667eea' } };
      headerRow.alignment = { horizontal: 'center', vertical: 'center' };

      // Add data rows
      typeLeads.forEach(lead => {
        worksheet.addRow({
          _id: lead._id.toString(),
          email: lead.email,
          company: lead.company || 'N/A',
          phone: lead.phone || 'N/A',
          message: lead.message || 'N/A',
          status: lead.status,
          isReviewed: lead.isReviewed ? 'Yes' : 'No',
          createdAt: new Date(lead.createdAt).toLocaleDateString(),
          updatedAt: new Date(lead.updatedAt).toLocaleDateString(),
        });
      });

      // Style data rows with alternating colors
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          if (rowNumber % 2 === 0) {
            row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F7FA' } };
          }
          row.alignment = { horizontal: 'left', vertical: 'center', wrapText: true };
        }
      });
    });

    // Add summary sheet at the beginning
    const summarySheet = workbook.insertWorksheet('📊 Summary', 0);
    summarySheet.columns = [
      { header: 'Lead Type', key: 'type', width: 30 },
      { header: 'Count', key: 'count', width: 10 },
      { header: 'Reviewed', key: 'reviewed', width: 10 },
      { header: 'Unreviewed', key: 'unreviewed', width: 12 },
    ];

    // Style summary header
    const summaryHeaderRow = summarySheet.getRow(1);
    summaryHeaderRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    summaryHeaderRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF667eea' } };
    summaryHeaderRow.alignment = { horizontal: 'center', vertical: 'center' };

    // Add summary data
    let rowNum = 2;
    Object.keys(leadsByType).forEach(type => {
      const typeLeads = leadsByType[type];
      const reviewedCount = typeLeads.filter(l => l.isReviewed).length;
      const unreviewedCount = typeLeads.length - reviewedCount;

      summarySheet.addRow({
        type: `${categoryEmojis[type] || '📌'} ${type.replace(/_/g, ' ')}`,
        count: typeLeads.length,
        reviewed: reviewedCount,
        unreviewed: unreviewedCount,
      });

      rowNum++;
    });

    // Add totals row
    const totalLeads = leadObjects.length;
    const totalReviewed = leadObjects.filter(l => l.isReviewed).length;
    const totalUnreviewed = totalLeads - totalReviewed;

    summarySheet.addRow({
      type: '📈 TOTAL',
      count: totalLeads,
      reviewed: totalReviewed,
      unreviewed: totalUnreviewed,
    });

    // Style total row
    const totalRow = summarySheet.getRow(rowNum + 1);
    totalRow.font = { bold: true };
    totalRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFEB3B' } };

    return workbook;
  } catch (error) {
    console.error('Error exporting leads to Excel:', error);
    throw error;
  }
}

module.exports = {
  initializeLeads,
  getAllLeads,
  saveAllLeads,
  addLead,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadsByType,
  toggleReview,
  exportLeadsAsCSV,
  exportLeadsAsJSON,
  exportLeadsAsExcel,
  getLeadStats,
};
