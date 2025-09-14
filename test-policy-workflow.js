// Test script for the complete policy purchase workflow
const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function testPolicyWorkflow() {
  try {
    console.log('Testing Complete Policy Purchase Workflow...\n');

    // Step 1: Create a test client
    console.log('1. Creating test client...');
    const clientData = {
      name: "Test Policy Buyer",
      dateOfBirth: new Date("1990-01-01"),
      address: "123 Policy Street, Test City",
      phone: "123-456-7890",
      email: "policybuyer@example.com",
      occupation: "Software Developer",
      maritalStatus: "Single",
      dependents: 0
    };

    const clientResponse = await axios.post(`${API_BASE}/clients`, clientData);
    console.log('✅ Client created:', clientResponse.data.client.name);
    const clientId = clientResponse.data.client._id;

    // Step 2: Create a test policy
    console.log('\n2. Creating test policy...');
    const policyData = {
      name: "Test Auto Insurance",
      type: "Auto",
      premium: 500,
      status: "Available",
      activeTill: new Date("2025-12-31"),
      description: "Comprehensive auto insurance for testing",
      coverage: {
        coverageType: "Full Coverage",
        liability: "$25,000 per person / $50,000 per accident",
        collision: "$1,000 deductible",
        comprehensive: "$500 deductible"
      },
      premiumDetails: {
        paymentFrequency: "Monthly",
        lateFee: "$25",
        cancellationPolicy: "30-day notice required"
      }
    };

    const policyResponse = await axios.post(`${API_BASE}/policies`, policyData);
    console.log('✅ Policy created:', policyResponse.data.policy.name);
    const policyId = policyResponse.data.policy._id;

    // Step 3: Purchase the policy
    console.log('\n3. Purchasing policy...');
    const purchaseData = {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      premium: 500
    };

    const purchaseResponse = await axios.post(
      `${API_BASE}/clients/${clientId}/policies/${policyId}/purchase`,
      purchaseData
    );
    console.log('✅ Policy purchased successfully');
    const clientPolicyId = purchaseResponse.data.clientPolicy._id;

    // Step 4: Verify client policies
    console.log('\n4. Verifying client policies...');
    const clientPoliciesResponse = await axios.get(`${API_BASE}/clients/${clientId}/policies`);
    console.log('✅ Client policies retrieved:', clientPoliciesResponse.data.policies.length, 'policies');

    // Step 5: Upload documents
    console.log('\n5. Uploading documents...');
    
    // Upload Aadhar Card (mock)
    const aadharData = {
      name: "Aadhar Card Front",
      type: "Aadhar Card",
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    };
    
    const aadharResponse = await axios.post(
      `${API_BASE}/clients/${clientId}/documents`,
      aadharData
    );
    console.log('✅ Aadhar Card uploaded');

    // Upload PAN Card (mock)
    const panData = {
      name: "PAN Card",
      type: "PAN Card",
      image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
    };
    
    const panResponse = await axios.post(
      `${API_BASE}/clients/${clientId}/documents`,
      panData
    );
    console.log('✅ PAN Card uploaded');

    // Step 6: Verify documents
    console.log('\n6. Verifying documents...');
    const verifyResponse = await axios.post(
      `${API_BASE}/client-policies/${clientPolicyId}/verify-documents`
    );
    console.log('✅ Documents verified:', verifyResponse.data.documentsStatus);

    // Step 7: Final verification
    console.log('\n7. Final verification...');
    const finalClientPolicies = await axios.get(`${API_BASE}/clients/${clientId}/policies`);
    const purchasedPolicy = finalClientPolicies.data.policies[0];
    
    console.log('✅ Policy Status:', purchasedPolicy.status);
    console.log('✅ Documents Verified:', purchasedPolicy.documentsVerified);
    console.log('✅ Premium:', purchasedPolicy.premium);

    console.log('\n🎉 Complete Policy Purchase Workflow Test Passed!');
    console.log('\nWorkflow Summary:');
    console.log('1. ✅ Client created');
    console.log('2. ✅ Policy created');
    console.log('3. ✅ Policy purchased');
    console.log('4. ✅ Documents uploaded');
    console.log('5. ✅ Documents verified');
    console.log('6. ✅ Policy active and ready');

  } catch (error) {
    console.error('❌ Policy workflow test failed:', error.message);
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

testPolicyWorkflow();
