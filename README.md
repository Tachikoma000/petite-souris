# Document Converter

A Next.js web application that converts between multiple document formats including PDF, Word, and text files, built with TypeScript, Tailwind CSS, and CloudConvert API.

## Features

- 🔄 **Multiple Format Support**: Convert between PDF, DOCX, DOC, TXT, RTF, ODT, and HTML
- 🎯 **Drag & Drop Support**: Easy file upload with drag-and-drop interface
- ⚡ **Fast Processing**: Conversions typically complete in 10-30 seconds
- 🔒 **Secure & Private**: Files are processed in memory and deleted immediately after conversion
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, minimal design with Tailwind CSS
- 🚫 **No Registration**: Use immediately without creating an account

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Conversion API**: CloudConvert API
- **Deployment**: Cloudflare Pages (recommended)

## Prerequisites

- Node.js 18+ installed
- CloudConvert API key (free tier: 25 conversions/day)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd petite-souris
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
CLOUDCONVERT_API_KEY=your_api_key_here
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
```

**Get your CloudConvert API key:**
1. Go to https://cloudconvert.com/dashboard/api/v2/keys
2. Sign up for a free account
3. Create a new API key
4. Copy and paste it into your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
petite-souris/
├── app/
│   ├── api/
│   │   └── convert/
│   │       └── route.ts          # API endpoint for file conversion
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main converter page
│   └── globals.css               # Global styles
├── components/
│   ├── FileUploader.tsx          # Drag & drop upload component
│   └── ConversionStatus.tsx      # Status indicator component
├── lib/
│   └── cloudconvert.ts           # CloudConvert API wrapper
├── types/
│   └── index.ts                  # TypeScript type definitions
├── .env.local                    # Environment variables (gitignored)
├── .env.example                  # Example env file
└── next.config.ts                # Next.js configuration
```

## Deployment to Cloudflare Pages

### Option 1: Using Cloudflare Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages
   - Click "Create a project"
   - Connect your GitHub repository

3. **Configure Build Settings**
   - Framework preset: `Next.js`
   - Build command: `npx @cloudflare/next-on-pages@1`
   - Build output directory: `.vercel/output/static`
   - Root directory: `/` (leave as default)

4. **Set Environment Variables**
   - In your Cloudflare Pages project settings
   - Go to Settings → Environment variables
   - Add:
     - `CLOUDCONVERT_API_KEY` = your API key
     - `NEXT_PUBLIC_MAX_FILE_SIZE` = 10485760

5. **Deploy**
   - Click "Save and Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.pages.dev`

### Option 2: Using Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Build the Project**
   ```bash
   npm run build
   npx @cloudflare/next-on-pages@1
   ```

4. **Deploy**
   ```bash
   wrangler pages deploy .vercel/output/static
   ```

5. **Set Environment Variables**
   ```bash
   wrangler pages secret put CLOUDCONVERT_API_KEY
   # Enter your API key when prompted
   ```

## Usage

1. **Upload a File**
   - Drag and drop a PDF or DOCX file onto the upload area
   - Or click to browse and select a file
   - Maximum file size: 10MB

2. **Automatic Conversion**
   - The file will be automatically uploaded and converted
   - A progress indicator shows the conversion status

3. **Download**
   - Once conversion is complete, the file automatically downloads
   - The converted file will have the opposite format (PDF → DOCX or DOCX → PDF)

## File Size Limits

- **Free Tier**: 10MB maximum file size
- **CloudConvert Free Plan**: 25 conversions per day

## Security Features

- ✅ Server-side file validation
- ✅ File size enforcement
- ✅ No file persistence (files deleted immediately after conversion)
- ✅ HTTPS encryption (when deployed)
- ✅ No user authentication required

## Troubleshooting

### Conversion Fails

- **Check API Key**: Ensure your CloudConvert API key is valid
- **File Size**: Verify the file is under 10MB
- **File Format**: Ensure the file is a valid PDF or DOCX
- **API Limits**: Check if you've reached the daily conversion limit (25 for free tier)

### Build Errors

- **Clear Cache**: Try deleting `.next` folder and running `npm run dev` again
- **Dependencies**: Run `npm install` to ensure all dependencies are installed
- **Node Version**: Ensure you're using Node.js 18 or higher

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding Features

The codebase is organized for easy extension:

- **New conversion formats**: Extend `lib/cloudconvert.ts`
- **UI changes**: Modify components in `components/`
- **API modifications**: Update `app/api/convert/route.ts`

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
- Check the [CloudConvert Documentation](https://cloudconvert.com/api/v2)
- Review [Next.js Documentation](https://nextjs.org/docs)
- Open an issue in this repository

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Conversions powered by [CloudConvert API](https://cloudconvert.com/)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com/)
