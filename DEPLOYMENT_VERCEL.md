# Vercel Deployment Guide

## ✅ Perfect for Vercel!

Your Petite Souris app is **ideal** for Vercel deployment! Next.js is made by Vercel, so it works perfectly out of the box.

## Why Vercel?

- ✅ **Native Next.js support** - No adapters needed
- ✅ **Automatic builds** - Push to GitHub, auto-deploy
- ✅ **Generous free tier** - Perfect for this project
- ✅ **Zero configuration** - Works immediately
- ✅ **Fast global CDN** - Lightning-fast performance
- ✅ **Environment variables** - Easy to manage

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

**Step 1: Push to GitHub**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

**Step 2: Import to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Find and select your `petite-souris` repository
5. Click **"Import"**

**Step 3: Configure Project**
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: Leave empty (auto-detected)
- **Install Command**: `npm install` (auto-filled)

**Step 4: Add Environment Variables**

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `CLOUDCONVERT_API_KEY` | Your actual CloudConvert API key |
| `NEXT_PUBLIC_MAX_FILE_SIZE` | `10485760` |

**Step 5: Deploy**
- Click **"Deploy"**
- Wait 1-2 minutes for build
- Your app is live! 🎉

You'll get a URL like: `https://petite-souris.vercel.app`

### Option 2: Deploy via Vercel CLI

**Install Vercel CLI**
```bash
npm install -g vercel
```

**Login to Vercel**
```bash
vercel login
```

**Deploy**
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → petite-souris
- **Directory?** → `./`
- **Override settings?** → No

**Set Environment Variables**
```bash
vercel env add CLOUDCONVERT_API_KEY
# Paste your API key when prompted

vercel env add NEXT_PUBLIC_MAX_FILE_SIZE
# Enter: 10485760
```

**Deploy to Production**
```bash
vercel --prod
```

## 🔧 Configuration

### Environment Variables

**Local Development (.env.local):**
```env
CLOUDCONVERT_API_KEY=your_api_key_here
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
```

**Vercel Dashboard:**
1. Go to your project settings
2. Click **"Environment Variables"**
3. Add each variable
4. Select **"Production"**, **"Preview"**, and **"Development"** environments
5. Click **"Save"**

### Automatic Deployments

Once connected to GitHub:
- **Push to `main`** → Automatic production deployment
- **Push to other branches** → Preview deployments
- **Pull Requests** → Preview URLs automatically

## 📊 Post-Deployment

### 1. Test Your Live App

Visit your Vercel URL and verify:
- [x] Format selector works
- [x] File upload (drag & drop)
- [x] Single file conversion
- [x] Batch conversion
- [x] File downloads work
- [x] Error messages display correctly

### 2. Monitor Performance

Vercel Dashboard provides:
- **Analytics** - Page views, performance
- **Logs** - Function execution logs
- **Deployments** - History of all deploys

### 3. Set Up Custom Domain (Optional)

1. Go to Project Settings → **Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `petitesouris.com`)
4. Follow DNS configuration instructions
5. Vercel handles SSL certificates automatically!

## 🎯 Vercel Features You Get

### Free Tier Includes:
- ✅ Unlimited deployments
- ✅ Automatic HTTPS/SSL
- ✅ Global CDN
- ✅ 100 GB bandwidth/month
- ✅ Serverless Functions (API routes)
- ✅ Preview deployments
- ✅ Analytics

### Serverless Functions
Your `/api/convert` route runs as a serverless function:
- **Execution time**: 10 seconds (free tier)
- **Memory**: 1024 MB
- **Region**: Automatically optimized
- Perfect for CloudConvert API calls!

## 🐛 Troubleshooting

### Build Fails

**Check build logs in Vercel dashboard:**
1. Go to Deployments
2. Click on failed deployment
3. Check build logs for errors

**Common fixes:**
```bash
# Locally test build
npm run build

# If build succeeds locally but fails on Vercel:
# - Check Node version (use 18+)
# - Verify all dependencies in package.json
```

### Environment Variables Not Working

1. Verify variables are added in Vercel dashboard
2. Check variable names match exactly (case-sensitive)
3. Redeploy after adding variables
4. For `NEXT_PUBLIC_*` vars, rebuild is required

### Conversion Errors in Production

1. Check Vercel function logs for errors
2. Verify `CLOUDCONVERT_API_KEY` is correct
3. Check CloudConvert dashboard for API usage/errors
4. Ensure function timeout hasn't been hit (10s limit)

### Function Timeout

If conversions timeout:
- Large files may take >10 seconds
- Consider upgrading Vercel plan (60s timeout)
- Or optimize file size limits

## 📝 Deployment Checklist

**Before Deploying:**
- [x] Code tested locally (`npm run dev`)
- [x] CloudConvert API key is valid
- [x] Code committed to Git
- [x] Pushed to GitHub
- [x] Vercel account created

**During Deployment:**
- [x] Repository connected to Vercel
- [x] Environment variables added
- [x] Build successful

**After Deployment:**
- [x] Test live URL
- [x] Verify conversions work
- [x] Check CloudConvert usage
- [x] Share with users!

## 🎉 You're Live on Vercel!

Your Petite Souris app is now live and accessible worldwide!

**Your Live URL:**
- Production: `https://petite-souris.vercel.app`
- Or your custom domain

**Automatic Updates:**
- Every push to `main` auto-deploys
- Preview URLs for branches/PRs
- Rollback to any previous deployment instantly

## 🚀 Next Steps

1. **Share your app** - Send the URL to users
2. **Monitor usage** - Check Vercel analytics
3. **Watch CloudConvert** - Monitor your 25/day limit
4. **Custom domain** - Add your own domain (optional)
5. **Iterate** - Push updates, auto-deploy!

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [CloudConvert API](https://cloudconvert.com/api/v2)
- [Vercel CLI Docs](https://vercel.com/docs/cli)

---

**Deployment is incredibly simple with Vercel!** Just push your code and go live in minutes. 🚀
