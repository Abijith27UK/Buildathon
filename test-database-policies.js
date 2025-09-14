// Test script to check what policies are in the database
const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function testDatabasePolicies() {
  try {
    console.log('Checking policies in database...\n');

    // Test 1: Get all policies without any filter
    console.log('1. Fetching all policies...');
    const allPoliciesResponse = await axios.get(`${API_BASE}/policies`);
    console.log('✅ All policies response:', allPoliciesResponse.data);
    
    const allPolicies = allPoliciesResponse.data.policies || [];
    console.log(`   Found ${allPolicies.length} policies in database`);
    
    if (allPolicies.length > 0) {
      console.log('\n   Policy details:');
      allPolicies.forEach((policy, index) => {
        console.log(`   ${index + 1}. Name: ${policy.name}`);
        console.log(`      Type: ${policy.type}`);
        console.log(`      Status: ${policy.status}`);
        console.log(`      Premium: ${policy.premium}`);
        console.log(`      ID: ${policy._id}`);
        console.log('');
      });
    }

    // Test 2: Get policies with different status filters
    console.log('2. Testing different status filters...');
    
    const statuses = ['Available', 'Active', 'Pending', 'Expired'];
    for (const status of statuses) {
      try {
        const filteredResponse = await axios.get(`${API_BASE}/policies?status=${status}`);
        const filteredPolicies = filteredResponse.data.policies || [];
        console.log(`   Status "${status}": ${filteredPolicies.length} policies`);
      } catch (error) {
        console.log(`   Status "${status}": Error - ${error.message}`);
      }
    }

    // Test 3: Check if the issue is with the API call
    console.log('\n3. Testing API endpoint directly...');
    try {
      const directResponse = await axios.get(`${API_BASE}/policies`);
      console.log('✅ Direct API call successful');
      console.log('   Response structure:', Object.keys(directResponse.data));
    } catch (error) {
      console.log('❌ Direct API call failed:', error.message);
    }

    console.log('\n🎯 Summary:');
    console.log(`Total policies in database: ${allPolicies.length}`);
    if (allPolicies.length === 0) {
      console.log('💡 No policies found. You may need to:');
      console.log('   1. Create policies using the Settings page');
      console.log('   2. Run the seed script: npm run seed');
    } else {
      console.log('💡 Policies found. Check the status values above.');
      console.log('   If status is not "Available", update the BuyPolicy.jsx filter.');
    }

  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Make sure the server is running:');
      console.error('   cd server && npm run dev');
    }
  }
}

testDatabasePolicies();
