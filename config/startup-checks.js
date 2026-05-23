const fs = require('fs');
const path = require('path');

const checks = {
  models: ['Article', 'Event', 'Masterclass', 'Playbook', 'Magazine', 'Lead'],
  dataFiles: ['articles.json', 'events.json', 'masterclasses.json', 'playbooks.json', 'magazines.json'],
  controllers: ['articleController', 'eventController', 'masterclassController', 'playbookController', 'magazineController', 'adminController', 'leadController'],
  routes: ['articles', 'events', 'masterclasses', 'playbooks', 'magazines', 'leads', 'admin'],
  services: ['DataService', 'LeadService', 'NotificationService', 'FilterService'],
};

async function runStartupChecks() {
  console.log('\n📋 Running Startup Checks...\n');

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
  };

  // Check Models
  console.log('🔍 Checking Models:');
  for (const model of checks.models) {
    try {
      require(`../models/${model}`);
      console.log(`  ✅ ${model}.js`);
      results.passed++;
    } catch (error) {
      console.error(`  ❌ ${model}.js - ${error.message}`);
      results.failed++;
    }
  }

  // Check Data Files
  console.log('\n🔍 Checking Data Files:');
  const dataDir = path.join(__dirname, '../data');
  for (const file of checks.dataFiles) {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        console.log(`  ✅ ${file} (${data.length} records)`);
        results.passed++;
      } catch (error) {
        console.error(`  ❌ ${file} - Invalid JSON: ${error.message}`);
        results.failed++;
      }
    } else {
      console.warn(`  ⚠️  ${file} - File not found (will be created on first insertion)`);
      results.warnings++;
    }
  }

  // Check Controllers
  console.log('\n🔍 Checking Controllers:');
  for (const controller of checks.controllers) {
    try {
      require(`../controllers/${controller}`);
      console.log(`  ✅ ${controller}.js`);
      results.passed++;
    } catch (error) {
      console.error(`  ❌ ${controller}.js - ${error.message}`);
      results.failed++;
    }
  }

  // Check Routes
  console.log('\n🔍 Checking Routes:');
  for (const route of checks.routes) {
    try {
      require(`../routes/${route}`);
      console.log(`  ✅ ${route}.js`);
      results.passed++;
    } catch (error) {
      console.error(`  ❌ ${route}.js - ${error.message}`);
      results.failed++;
    }
  }

  // Check Services
  console.log('\n🔍 Checking Services:');
  for (const service of checks.services) {
    try {
      require(`../services/${service}`);
      console.log(`  ✅ ${service}.js`);
      results.passed++;
    } catch (error) {
      console.error(`  ❌ ${service}.js - ${error.message}`);
      results.failed++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Startup Check Summary:');
  console.log(`  ✅ Passed: ${results.passed}`);
  console.log(`  ❌ Failed: ${results.failed}`);
  console.log(`  ⚠️  Warnings: ${results.warnings}`);
  console.log('='.repeat(50) + '\n');

  if (results.failed > 0) {
    console.error('❌ Startup checks failed! Please fix the issues above.');
    return false;
  } else {
    console.log('✅ All startup checks passed!');
    return true;
  }
}

module.exports = { runStartupChecks };
