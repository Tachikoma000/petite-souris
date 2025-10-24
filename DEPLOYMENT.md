# Cloudflare Pages Deployment Guide

## ✅ Pre-Deployment Checklist

Your Petite Souris app is ready to deploy! Here's what you have:

- ✅ Next.js 16 with App Router
- ✅ Server-side API routes (`/api/convert`)
- ✅ CloudConvert SDK integration
- ✅ Environment variables configured locally
- ✅ shadcn/ui components
- ✅ Tailwind CSS v4

## 🚀 Deployment Steps

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Cloudflare deployment"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Workers & Pages** → **Create application** → **Pages**
   - Click **Connect to Git**
   - Select your GitHub repository (`petite-souris`)

3. **Configure Build Settings**
   - **Framework preset**: Next.js
   - **Build command**: `npx @cloudflare/next-on-pages@1`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/` (leave as default)
   - **Node version**: 18 or higher

4. **Set Environment Variables**
   In your Cloudflare Pages project settings:
   - Go to **Settings** → **Environment variables**
   - Add the following variables:
     - `CLOUDCONVERT_API_KEY` = `your_actual_api_key`
     - `NEXT_PUBLIC_MAX_FILE_SIZE` = `10485760`
   - Make sure to set them for **Production** environment

5. **Deploy**
   - Click **Save and Deploy**
   - Wait for build to complete (usually 2-5 minutes)
   - Your app will be live at `https://your-project.pages.dev`

### Option 2: Deploy via Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Install Cloudflare adapter**
   ```bash
   npm install -D @cloudflare/next-on-pages
   ```

4. **Build the project**
   ```bash
   npm run build
   npx @cloudflare/next-on-pages@1
   ```

5. **Deploy**
   ```bash
   wrangler pages deploy .vercel/output/static --project-name=petite-souris
   ```

6. **Set environment variables**
   ```bash
   wrangler pages secret put CLOUDCONVERT_API_KEY
   # Enter your API key when prompted
   ```

## 🔧 Important Configuration

### Next.js API Routes on Cloudflare

Your API routes will run as Cloudflare Workers (serverless functions). The current setup should work out of the box because:

- ✅ Using Next.js App Router
- ✅ API routes are standard Next.js routes
- ✅ CloudConvert SDK is compatible with Edge runtime
- ✅ No file system dependencies

### Environment Variables

**Local (.env.local):**
```env
CLOUDCONVERT_API_KEY=your_api_key_here
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
```

**Cloudflare (Dashboard):**
- Navigate to: Settings → Environment variables
- Add both variables for Production environment
- Redeploy after adding variables

## 📊 Post-Deployment

### 1. Test the Application

Visit your deployed URL and test:
- [ ] Format selector dropdowns work
- [ ] File upload (drag & drop and click)
- [ ] Single file conversion
- [ ] Batch file conversion
- [ ] File download
- [ ] Error handling

### 2. Monitor Conversions

- Check CloudConvert dashboard for API usage
- Free tier: 25 conversions/day
- Monitor if you're approaching limits

### 3. Custom Domain (Optional)

In Cloudflare Pages:
1. Go to **Custom domains**
2. Click **Set up a custom domain**
3. Add your domain
4. Follow DNS configuration instructions

## 🐛 Troubleshooting

### Build Fails

**Error**: "Cannot find module '@cloudflare/next-on-pages'"
```bash
npm install -D @cloudflare/next-on-pages
```

### Environment Variables Not Working

1. Make sure variables are set in Cloudflare dashboard
2. Redeploy after adding variables
3. Check variable names match exactly

### Conversion Fails in Production

1. Verify `CLOUDCONVERT_API_KEY` is set correctly
2. Check CloudConvert dashboard for API errors
3. Ensure you haven't exceeded free tier limits (25/day)

### Build Output Issues

If you see warnings about Edge runtime:
- This is normal for Cloudflare Workers
- Your API routes will still work

## 📝 Deployment Checklist

Before deploying:
- [ ] CloudConvert API key is valid
- [ ] All code is committed to Git
- [ ] Pushed to GitHub
- [ ] Environment variables documented
- [ ] Tested locally with `npm run dev`

After deploying:
- [ ] Set environment variables in Cloudflare
- [ ] Test live URL
- [ ] Verify file conversions work
- [ ] Check CloudConvert usage
- [ ] Share URL with users!

## 🎉 You're Ready!

Your Petite Souris app is configured and ready for Cloudflare Pages deployment. Follow the steps above to get it live!

**Live URL**: After deployment, you'll get a URL like:
- `https://petite-souris.pages.dev`
- Or your custom domain

## 📚 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [CloudConvert API Docs](https://cloudconvert.com/api/v2)

---

**Need help?** Check the troubleshooting section or Cloudflare's documentation.
