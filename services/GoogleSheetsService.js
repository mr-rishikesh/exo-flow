const { google } = require('googleapis');
const sheets = google.sheets('v4');

class GoogleSheetsService {
  constructor() {
    this.spreadsheetId = process.env.GOOGLE_SHEET_ID || '1eYrGudW8S9CmP72QGkflmxkWJELjjm2e6KbETCneNGg';
    this.leadsSheetName = 'Leads';
    this.auth = null;
    this.initializeAuth();
  }

  initializeAuth() {
    // Create auth from service account key (set via environment variable)
    const keyFile = process.env.GOOGLE_CREDENTIALS;
    if (keyFile) {
      try {
        const key = JSON.parse(keyFile);
        this.auth = new google.auth.GoogleAuth({
          credentials: key,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
      } catch (error) {
        console.error('Error initializing Google Auth:', error.message);
      }
    } else {
      console.warn('GOOGLE_CREDENTIALS environment variable not set');
    }
  }

  async appendLead(leadData) {
    if (!this.auth) {
      throw new Error('Google Sheets authentication not configured');
    }

    try {
      const authClient = await this.auth.getClient();

      const request = {
        spreadsheetId: this.spreadsheetId,
        range: `${this.leadsSheetName}!A:H`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [
            [
              new Date().toISOString(),
              leadData.email || '',
              leadData.fullName || '',
              leadData.companyName || '',
              leadData.role || '',
              leadData.purpose || '',
              leadData.source || 'API',
              leadData.details || '',
            ],
          ],
        },
      };

      const response = await sheets.spreadsheets.values.append(
        request,
        { auth: authClient }
      );

      return {
        success: true,
        updatedRows: response.data.updates.updatedRows,
        updatedColumns: response.data.updates.updatedColumns,
      };
    } catch (error) {
      console.error('Error appending to Google Sheets:', error.message);
      throw new Error('Failed to save lead to Google Sheets');
    }
  }

  async getLeads() {
    if (!this.auth) {
      throw new Error('Google Sheets authentication not configured');
    }

    try {
      const authClient = await this.auth.getClient();

      const request = {
        spreadsheetId: this.spreadsheetId,
        range: `${this.leadsSheetName}!A:H`,
      };

      const response = await sheets.spreadsheets.values.get(
        request,
        { auth: authClient }
      );

      return response.data.values || [];
    } catch (error) {
      console.error('Error reading from Google Sheets:', error.message);
      throw new Error('Failed to read leads from Google Sheets');
    }
  }
}

module.exports = new GoogleSheetsService();
