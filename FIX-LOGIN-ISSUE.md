# Fix Login Issues - CosmeticLux

## Problems Identified

### 1. Frontend Error: `ERR_CONNECTION_REFUSED`
- **Cause**: Backend server not running or running on wrong port
- **Solution**: Start the backend server on port 5000

### 2. Backend Error: `Unknown column 'username' in 'where clause'`
- **Cause**: Database table schema doesn't match the code expectations
- **Solution**: Either update the database schema OR update the code to match the schema

## Solutions

### Option 1: Quick Fix - Use Updated AuthController (RECOMMENDED)

The updated `AuthController.js` now automatically detects which columns exist in your database table and adapts the query accordingly. This works with:
- Tables with only `username` column
- Tables with only `email` column  
- Tables with both `username` and `email` columns

**No database changes needed!** Just restart your backend server.

### Option 2: Update Database Schema

If you want to add the missing `username` column to your database:

#### Step 1: Check your current table structure
```sql
USE cosmeticluxdb;
DESCRIBE users;
```

#### Step 2: Add username column if missing
```sql
-- Add username column
ALTER TABLE users ADD COLUMN username VARCHAR(255) UNIQUE AFTER id;

-- Populate username from email (if email exists)
UPDATE users SET username = SUBSTRING_INDEX(email, '@', 1) WHERE username IS NULL;
```

#### Step 3: Create test admin user
Use the provided script:
```bash
node create-test-user.js
```

This will create an admin user with:
- Username: `admin`
- Password: `admin@123`

### Option 3: Complete Database Setup

If your users table doesn't exist or needs to be recreated, run the SQL from `setup-database.sql`:

```bash
mysql -u root -p cosmeticluxdb < setup-database.sql
```

Or manually execute the SQL commands in your MySQL client.

## How to Run the Application

### 1. Install Dependencies

```bash
# In the project root
npm install
```

### 2. Configure Environment Variables

Make sure your `.env` file has the correct database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=cosmeticluxdb
JWT_SECRET=mysecretkey123
PORT=5000
```

### 3. Start the Backend Server

```bash
# Option 1: Using npm (if configured in package.json)
npm run server

# Option 2: Direct node command
node server.js

# Option 3: With nodemon for auto-reload
nodemon server.js
```

You should see:
```
✅ Connected to database: cosmeticluxdb
🚀 Server running on port 5000
```

### 4. Start the Frontend

In a separate terminal:

```bash
# Using Vite dev server
npm run dev
```

The frontend should start on `http://localhost:5173`

### 5. Test Login

Navigate to `http://localhost:5173/login` and use:
- **Username**: `admin`
- **Password**: `admin@123`

## Troubleshooting

### Backend server not starting?

1. **Check if port 5000 is already in use:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Mac/Linux
   lsof -i :5000
   ```

2. **Check Node.js version:**
   ```bash
   node --version
   ```
   Should be v14 or higher.

3. **Check if mysql2 is installed:**
   ```bash
   npm list mysql2
   ```
   If not: `npm install mysql2`

### Database connection issues?

1. **Verify MySQL is running:**
   ```bash
   # Windows
   net start | findstr MySQL
   
   # Mac/Linux
   ps aux | grep mysql
   ```

2. **Test database connection:**
   ```bash
   mysql -u root -p
   USE cosmeticluxdb;
   SHOW TABLES;
   ```

3. **Check database credentials in .env file**

### Frontend can't connect to backend?

1. **Verify backend is running on port 5000**
2. **Check CORS configuration in server.js** - should allow `http://localhost:5173`
3. **Check Login.vue API endpoint** - should be `http://localhost:5000/api/auth`

### Still getting "Unknown column 'username'" error?

The updated `AuthController.js` should handle this automatically. If you still see this error:

1. **Restart the backend server** to load the new code
2. **Check the console output** - it will show which columns were detected
3. **Run the schema check script:**
   ```bash
   node check-schema.js
   ```

## Verification Script

Run this to check your setup:

```bash
# Check database schema
node check-schema.js

# Create/update test user
node create-test-user.js
```

## Files Modified/Created

- ✅ `AuthController.js` - Updated with flexible column detection
- ✅ `check-schema.js` - Script to inspect database schema  
- ✅ `create-test-user.js` - Script to create test admin user
- ✅ `setup-database.sql` - SQL to create proper table structure
- ✅ `FIX-LOGIN-ISSUE.md` - This documentation

## Next Steps After Fixing

1. Test the login functionality
2. Verify dashboard access after login
3. Test other protected routes
4. Set up proper user registration if needed
5. Change default admin password in production!

## Need More Help?

Check the console output when:
1. Starting the backend server
2. Attempting to login
3. Running the diagnostic scripts

The logs will show you exactly what's happening and which columns are being used.
