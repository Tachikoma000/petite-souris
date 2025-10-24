# Quick Setup Guide

## Step 1: Get Your CloudConvert API Key

1. Go to https://cloudconvert.com/dashboard/api/v2/keys
2. Sign up for a free account (if you don't have one)
3. Create a new API key
4. Copy the API key

## Step 2: Configure Environment Variables

1. Open the `.env.local` file in the root directory
2. Replace `your_api_key_here` with your actual CloudConvert API key:

```env
CLOUDCONVERT_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
```

3. Save the file

## Step 3: Restart the Development Server

1. Stop the current dev server (press `Ctrl+C` in the terminal)
2. Restart it:
   ```bash
   npm run dev
   ```

## Step 4: Test the Application

1. Open http://localhost:3000 in your browser
2. Upload a test document file (PDF, DOCX, DOC, TXT, RTF, ODT, or HTML - under 10MB)
3. The file should convert automatically and download

## Testing Checklist

- [ ] Upload a PDF file → should convert to DOCX
- [ ] Upload a DOCX file → should convert to PDF
- [ ] Upload a DOC file → should convert to PDF
- [ ] Upload a TXT file → should convert to PDF
- [ ] Upload an RTF file → should convert to PDF
- [ ] Upload an ODT file → should convert to PDF
- [ ] Upload an HTML file → should convert to PDF
- [ ] Try uploading a file larger than 10MB → should show error
- [ ] Try uploading an invalid file type → should show error
- [ ] Test drag & drop functionality
- [ ] Test on mobile device (responsive design)

## Troubleshooting

### API Key Issues
- Make sure there are no extra spaces in the API key
- Verify the key is active in your CloudConvert dashboard
- Check you haven't exceeded the free tier limit (25 conversions/day)

### File Upload Issues
- Ensure file is under 10MB
- Check file extension is .pdf or .docx
- Try a different file if one specific file fails

### Server Issues
- Clear the `.next` folder and restart: `rm -rf .next && npm run dev`
- Check Node.js version: `node --version` (should be 18+)

## Free Tier Limits

CloudConvert free tier includes:
- 25 conversions per day
- 1 concurrent conversion
- All conversion formats supported

If you need more, consider upgrading to a paid plan.
