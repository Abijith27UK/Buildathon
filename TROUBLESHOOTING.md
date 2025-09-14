# Troubleshooting Guide

## Settings Page Issues

### Problem: "Axios Error" when creating clients or policies

#### Common Causes and Solutions:

### 1. **Server Not Running**
**Error:** `ECONNREFUSED` or network errors
**Solution:**
```bash
cd server
npm run dev
```
Make sure you see: `connected at port 3000`

### 2. **Database Connection Issues**
**Error:** `Connection Successful` not appearing
**Solution:**
- Make sure MongoDB is running
- Check your `.env` file in the server directory:
```
PORT=3000
DB_CONNECTION=mongodb://localhost:27017/insurance-management
```

### 3. **CORS Issues**
**Error:** CORS policy errors in browser console
**Solution:**
- The server already has CORS enabled
- Make sure you're accessing the frontend from `http://localhost:5173`

### 4. **API Endpoint Issues**
**Error:** 404 or 500 errors
**Solution:**
- Verify the server is running on port 3000
- Check that the API routes are properly configured
- Test the API directly: `http://localhost:3000/api/dashboard`

### 5. **Data Validation Errors**
**Error:** Validation errors when submitting forms
**Solution:**
- Make sure all required fields are filled
- Check that dates are in correct format
- Ensure premium is a number, not a string

## Testing the API

### Manual Testing:
1. **Test server health:**
   ```bash
   curl http://localhost:3000
   ```

2. **Test API endpoints:**
   ```bash
   curl http://localhost:3000/api/dashboard
   ```

3. **Run the test script:**
   ```bash
   node test-settings-api.js
   ```

### Browser Testing:
1. Open browser developer tools (F12)
2. Go to Network tab
3. Try creating a client or policy
4. Check the network requests for errors

## Common Fixes

### Fix 1: Restart Everything
```bash
# Stop all processes (Ctrl+C)
# Then restart:
cd server
npm run dev

# In another terminal:
cd client
npm run dev
```

### Fix 2: Clear Browser Cache
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or clear browser cache completely

### Fix 3: Check Environment Variables
Make sure your server `.env` file exists and has:
```
PORT=3000
DB_CONNECTION=mongodb://localhost:27017/insurance-management
```

### Fix 4: Verify MongoDB
```bash
# Check if MongoDB is running
mongosh
# Or
mongo
```

## Error Messages and Solutions

| Error Message | Solution |
|---------------|----------|
| `Cannot find module '../models/Client'` | Server restart needed |
| `ECONNREFUSED` | Server not running |
| `ValidationError` | Check form data format |
| `CORS error` | Check server CORS configuration |
| `Network Error` | Check if both servers are running |

## Still Having Issues?

1. **Check the console logs** in both server and browser
2. **Verify all dependencies** are installed:
   ```bash
   cd server && npm install
   cd client && npm install
   ```
3. **Test with the provided test scripts**
4. **Make sure MongoDB is running** and accessible

The Settings page should now work correctly with the updated API integration!
