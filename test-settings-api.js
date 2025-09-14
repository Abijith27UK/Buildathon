// Test script for Settings page API endpoints
const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function testSettingsAPI() {
  try {
    console.log('Testing Settings API endpoints...\n');

    // Test 1: Create a client
    console.log('1. Testing client creation...');
    const clientData = {
      name: "Test Client",
      dateOfBirth: new Date("1990-01-01"),
      address: "123 Test Street, Test City",
      phone: "123-456-7890",
      email: "test@example.com",
      occupation: "Software Developer",
      maritalStatus: "Single",
      dependents: 0
    };

    const clientResponse = await axios.post(`${API_BASE}/clients`, clientData);
    console.log('✅ Client created successfully:', clientResponse.data.message);
    const clientId = clientResponse.data.client._id;
    console.log('   Client ID:', clientId);

    // Test 2: Create a policy
    console.log('\n2. Testing policy creation...');
    const policyData = {
      name: "Test Policy",
      type: "Auto",
      premium: 500,
      status: "Available",
      activeTill: new Date("2025-12-31"),
      description: "Test auto insurance policy",
      coverage: {
        coverageType: "Full Coverage",
        liability: "$25,000 per person / $50,000 per accident",
        collision: "$1,000 deductible",
        comprehensive: "$500 deductible",
        uninsuredMotorist: "$25,000 per person / $50,000 per accident",
        medicalPayments: "$5,000 per person",
        deductible: "$500",
        policyLimits: "$100,000"
      },
      premiumDetails: {
        paymentFrequency: "Monthly",
        lateFee: "$25",
        cancellationPolicy: "30-day notice required"
      }
    };

    const policyResponse = await axios.post(`${API_BASE}/policies`, policyData);
    console.log('✅ Policy created successfully:', policyResponse.data.message);
    const policyId = policyResponse.data.policy._id;
    console.log('   Policy ID:', policyId);

    // Test 3: Verify client was created
    console.log('\n3. Verifying client exists...');
    const getClientResponse = await axios.get(`${API_BASE}/clients/${clientId}`);
    console.log('✅ Client retrieved successfully:', getClientResponse.data.client.name);

    // Test 4: Verify policy was created
    console.log('\n4. Verifying policy exists...');
    const getPolicyResponse = await axios.get(`${API_BASE}/policies/${policyId}`);
    console.log('✅ Policy retrieved successfully:', getPolicyResponse.data.policy.name);

    console.log('\n🎉 All Settings API tests passed!');
    console.log('\nThe Settings page should now work correctly.');

  } catch (error) {
    console.error('❌ Settings API test failed:', error.message);
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

testSettingsAPI();
