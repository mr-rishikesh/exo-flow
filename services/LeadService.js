const fs = require('fs').promises;
const path = require('path');

const LEADS_DIR = path.join(__dirname, '../data/leads');
const LEADS_INDEX_FILE = path.join(LEADS_DIR, 'index.json');

// Ensure leads directory exists
async function ensureLeadsDir() {
  try {
    await fs.mkdir(LEADS_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating leads directory:', error);
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
      // File doesn't exist yet
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
  getLeadStats,
};
