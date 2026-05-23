const fs = require('fs').promises;
const path = require('path');
const ExcelJS = require('exceljs');

const LEADS_DIR = path.join(__dirname, '../data/leads');
const LEADS_INDEX_FILE = path.join(LEADS_DIR, 'index.json');

// Ensure leads directory exists
async function ensureLeadsDir() {
  try {
    await fs.mkdir(LEADS_DIR, { recursive: true });
    // Create index.json if it doesn't exist
    try {
      await fs.access(LEADS_INDEX_FILE);
    } catch (error) {
      // File doesn't exist, create empty array
      await fs.writeFile(LEADS_INDEX_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('Error creating leads directory:', error);
    throw new Error('Failed to initialize leads storage');
  }
}

// Initialize leads storage on startup
async function initializeLeads() {
  try {
    await ensureLeadsDir();
    const leads = await getAllLeads();
    console.log(`✅ Leads service initialized. Currently ${leads.length} leads stored.`);
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize leads service:', error.message);
    throw error;
  }
}

// Get all leads
async function getAllLeads() {
  try {
    await ensureLeadsDir();

    try {
      const data = await fs.readFile(LEADS_INDEX_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // File doesn't exist yet, return empty array
      console.warn('Leads file not found, returning empty array');
      return [];
    }
  } catch (error) {
    console.error('Error reading leads:', error);
    return [];
  }
}

// Save all leads
async function saveAllLeads(leads) {
  try {
    await ensureLeadsDir();
    await fs.writeFile(LEADS_INDEX_FILE, JSON.stringify(leads, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving leads:', error);
    throw error;
  }
}

// Add a new lead
async function addLead(leadData) {
  try {
    const leads = await getAllLeads();

    const newLead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...leadData,
      isReviewed: false,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    leads.push(newLead);
    await saveAllLeads(leads);
    return newLead;
  } catch (error) {
    console.error('Error adding lead:', error);
    throw error;
  }
}

// Get lead by ID
async function getLeadById(id) {
  try {
    const leads = await getAllLeads();
    return leads.find(lead => lead.id === id);
  } catch (error) {
    console.error('Error getting lead:', error);
    return null;
  }
}

// Update lead
async function updateLead(id, updateData) {
  try {
    const leads = await getAllLeads();
    const leadIndex = leads.findIndex(lead => lead.id === id);

    if (leadIndex === -1) {
      throw new Error('Lead not found');
    }

    leads[leadIndex] = {
      ...leads[leadIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    await saveAllLeads(leads);
    return leads[leadIndex];
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
}

// Delete lead
async function deleteLead(id) {
  try {
    const leads = await getAllLeads();
    const filtered = leads.filter(lead => lead.id !== id);
    await saveAllLeads(filtered);
    return true;
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
}

// Get leads by type
async function getLeadsByType(type) {
  try {
    const leads = await getAllLeads();
    return leads.filter(lead => lead.type === type);
  } catch (error) {
    console.error('Error getting leads by type:', error);
    return [];
  }
}

// Toggle review status
async function toggleReview(id) {
  try {
    const lead = await getLeadById(id);
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
    const leads = await getAllLeads();

    if (leads.length === 0) {
      return '';
    }

    // Get all unique keys
    const allKeys = new Set();
    leads.forEach(lead => {
      Object.keys(lead).forEach(key => allKeys.add(key));
    });

    const headers = Array.from(allKeys);
    const csvHeaders = headers.join(',');

    const csvRows = leads.map(lead => {
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
    const leads = await getAllLeads();
    return JSON.stringify(leads, null, 2);
  } catch (error) {
    console.error('Error exporting leads:', error);
    throw error;
  }
}

// Get statistics
async function getLeadStats() {
  try {
    const leads = await getAllLeads();

    const stats = {
      total: leads.length,
      new: leads.filter(l => l.status === 'new').length,
      contacted: leads.filter(l => l.status === 'contacted').length,
      replied: leads.filter(l => l.status === 'replied').length,
      closed: leads.filter(l => l.status === 'closed').length,
      reviewed: leads.filter(l => l.isReviewed).length,
      unreviewed: leads.filter(l => !l.isReviewed).length,
      byType: {},
    };

    // Count by type
    leads.forEach(lead => {
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
    const leads = await getAllLeads();

    // Group leads by type
    const leadsByType = {};
    leads.forEach(lead => {
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
        { header: 'ID', key: 'id', width: 25 },
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
          id: lead.id,
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
    const totalLeads = leads.length;
    const totalReviewed = leads.filter(l => l.isReviewed).length;
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
