// Script to add a test policy to the database
const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function addTestPolicy() {
  try {
    console.log('Adding test policy to database...\n');

    const testPolicy = {
      name: "Test Auto Insurance",
      type: "Auto",
      premium: 500,
      status: "Available",
      activeTill: new Date("2025-12-31"),
      description: "A test auto insurance policy for demonstration",
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

    const response = await axios.post(`${API_BASE}/policies`, testPolicy);
    console.log('✅ Test policy created successfully!');
    console.log('   Policy ID:', response.data.policy._id);
    console.log('   Policy Name:', response.data.policy.name);
    console.log('   Policy Status:', response.data.policy.status);

    // Verify the policy was created
    console.log('\nVerifying policy creation...');
    const verifyResponse = await axios.get(`${API_BASE}/policies`);
    const policies = verifyResponse.data.policies || [];
    console.log(`✅ Total policies in database: ${policies.length}`);

  } catch (error) {
    console.error('❌ Failed to create test policy:', error.message);
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

addTestPolicy();
