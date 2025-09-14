# Policy Display Troubleshooting Guide

## Issue: BuyPolicy.jsx not showing policies from database

### Quick Diagnosis Steps:

1. **Check if server is running:**
   ```bash
   cd server
   npm run dev
   ```
   Should see: `connected at port 3000`

2. **Test API directly:**
   ```bash
   # In browser or curl
   http://localhost:3000/api/policies
   ```

3. **Check browser console:**
   - Open Developer Tools (F12)
   - Go to Console tab
   - Look for "BuyPolicy - API Response:" logs

### Common Issues and Solutions:

#### Issue 1: No policies in database
**Symptoms:** API returns empty array `{"policies": []}`

**Solutions:**
1. **Create policies via Settings page:**
   - Go to `/settings`
   - Click "Create Policy" tab
   - Fill in policy details
   - Click "Create Policy"

2. **Use the test script:**
   ```bash
   node add-test-policy.js
   ```

3. **Check database directly:**
   - Connect to MongoDB
   - Check `policies` collection

#### Issue 2: Policy status mismatch
**Symptoms:** Policies exist but not showing due to status filter

**Solutions:**
1. **Check policy status in database:**
   - Look at the debug info in BuyPolicy.jsx
   - Check what status values exist

2. **Update status filter:**
   - If policies have status "Active" instead of "Available"
   - Update the filter in BuyPolicy.jsx

#### Issue 3: API connection issues
**Symptoms:** Network errors, CORS errors, or 404 errors

**Solutions:**
1. **Check server is running on correct port:**
   - Default: `http://localhost:3000`
   - Check server console for port number

2. **Check CORS configuration:**
   - Server should have CORS enabled
   - Frontend should be on `http://localhost:5173`

3. **Check API routes:**
   - Verify `/api/policies` route exists
   - Check server routes configuration

#### Issue 4: Database connection issues
**Symptoms:** Server starts but database errors

**Solutions:**
1. **Check MongoDB is running:**
   ```bash
   mongosh
   # or
   mongo
   ```

2. **Check database connection string:**
   - Verify `.env` file in server directory
   - Should contain: `DB_CONNECTION=mongodb://localhost:27017/insurance-management`

3. **Check database name:**
   - Make sure database exists
   - Check if policies collection exists

### Debugging Steps:

#### Step 1: Check API Response
1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Navigate to BuyPolicy page
4. Look for `/api/policies` request
5. Check response status and data

#### Step 2: Check Console Logs
1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for debug logs from BuyPolicy component
4. Check for any error messages

#### Step 3: Test API Manually
1. Open browser
2. Go to: `http://localhost:3000/api/policies`
3. Should see JSON response with policies array

#### Step 4: Check Database
1. Connect to MongoDB
2. Use database: `insurance-management`
3. Check collection: `policies`
4. Verify documents exist

### Quick Fixes:

#### Fix 1: Add Test Policy
```bash
# Run this in server directory
node ../add-test-policy.js
```

#### Fix 2: Remove Status Filter
In `BuyPolicy.jsx`, change:
```javascript
// From:
const { data, loading, error } = useApi(() => apiService.getPolicies({ status: "Available" }));

// To:
const { data, loading, error } = useApi(() => apiService.getPolicies());
```

#### Fix 3: Check Policy Status
If policies exist but have different status:
```javascript
// In BuyPolicy.jsx, change the filter:
const { data, loading, error } = useApi(() => apiService.getPolicies({ status: "Active" }));
// or remove filter entirely to show all policies
```

### Expected Behavior:

1. **With policies in database:**
   - Should show table with policy details
   - Debug info should show policy count > 0
   - Console should log policy data

2. **Without policies in database:**
   - Should show "No policies available" message
   - Should provide buttons to go to Settings or refresh
   - Debug info should show 0 policies

### Still Having Issues?

1. **Check server logs** for any error messages
2. **Verify database connection** is working
3. **Test with a simple policy creation** via Settings page
4. **Check browser network tab** for failed requests
5. **Verify all dependencies** are installed correctly

The BuyPolicy component should now show all policies from the database without any status filtering, and provide clear debugging information to help identify the issue.
