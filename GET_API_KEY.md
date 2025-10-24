# How to Get Your CloudConvert API Key

## The "Unauthorized" error means you need to add your real CloudConvert API key.

Follow these steps carefully:

## Step 1: Sign Up for CloudConvert

1. Go to **https://cloudconvert.com/**
2. Click **"Sign Up"** or **"Get Started"**
3. Create a free account using:
   - Email address
   - Or sign in with Google/GitHub

## Step 2: Navigate to API Keys

1. After signing in, go to your dashboard
2. Click on your profile icon (top right)
3. Select **"API"** or go directly to: **https://cloudconvert.com/dashboard/api/v2/keys**

## Step 3: Create an API Key

1. You'll see a page titled **"API Keys"**
2. Click the **"Create API Key"** button
3. Give it a name (e.g., "PDF Converter App")
4. Click **"Create"**

## Step 4: Copy Your API Key

1. Your API key will be displayed - it looks like this:
   ```
   eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjM3...
   ```
   (It's a very long string starting with `eyJ`)

2. **Click "Copy"** to copy it to your clipboard
3. ⚠️ **IMPORTANT**: Save this somewhere safe - you won't be able to see it again!

## Step 5: Update Your .env.local File

1. Open the `.env.local` file in your project (it should already be open in VS Code)
2. Find the line that says:
   ```env
   CLOUDCONVERT_API_KEY=paste_your_actual_api_key_here
   ```
3. Replace `paste_your_actual_api_key_here` with your actual API key
4. It should look like:
   ```env
   CLOUDCONVERT_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjM3...
   ```
5. **Save the file** (Cmd+S or Ctrl+S)

## Step 6: Restart the Server (if needed)

The dev server should automatically reload when you save `.env.local`. If not:
1. Go to your terminal
2. Press `Ctrl+C` to stop the server
3. Run `npm run dev` again

## Step 7: Test the Application

1. Go to **http://localhost:3000**
2. Upload a test PDF or DOCX file
3. It should convert successfully! ✅

## Free Tier Limits

Your free CloudConvert account includes:
- ✅ **25 conversions per day**
- ✅ **1 concurrent conversion at a time**
- ✅ **All conversion formats**
- ✅ **No credit card required**

## Troubleshooting

### Still getting "Unauthorized"?
- Double-check you copied the **entire** API key (it's very long)
- Make sure there are no extra spaces before or after the key
- Verify the key is on the correct line in `.env.local`
- Try creating a new API key and using that instead

### Can't find the API Keys page?
- Make sure you're logged into CloudConvert
- Direct link: https://cloudconvert.com/dashboard/api/v2/keys
- Look for "API" in the left sidebar or top menu

### Need help?
Check the CloudConvert documentation: https://cloudconvert.com/api/v2/start

---

**Once you've added your real API key and saved the file, the application will work!** 🎉
