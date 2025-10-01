# Deployment Guide

## Quick Start (Demo Mode)

The application works out-of-the-box in demo mode without any external dependencies:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Full Deployment with External Services

### 1. Deploy to Vercel

1. **Fork this repository** on GitHub
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js

3. **Set Environment Variables** in Vercel:
   - Go to Project Settings > Environment Variables
   - Add the following variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     OPENAI_API_KEY=your_openai_api_key
     ```

### 2. Set up Supabase Database

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for it to be ready

2. **Run Database Migration**:
   - Go to SQL Editor in your Supabase dashboard
   - Copy the contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run the SQL

3. **Get API Keys**:
   - Go to Settings > API
   - Copy the Project URL and anon public key
   - Add these to your Vercel environment variables

### 3. Set up OpenAI (Optional)

1. **Get OpenAI API Key**:
   - Go to [platform.openai.com](https://platform.openai.com)
   - Create an account and add billing
   - Generate an API key

2. **Add to Environment Variables**:
   - Add `OPENAI_API_KEY` to your Vercel environment variables

### 4. Deploy

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. **Vercel Auto-Deploy**:
   - Vercel will automatically deploy your changes
   - Your app will be available at `https://your-project.vercel.app`

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | No | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase anonymous key |
| `OPENAI_API_KEY` | No | OpenAI API key for AI features |

## Demo Mode Features

When external services are not configured, the app provides:

- ✅ **Mock AI Concepts**: Pre-generated concepts tailored to audience data
- ✅ **In-Memory Storage**: Concepts stored in browser memory
- ✅ **Full UI/UX**: Complete user interface and workflow

## Production Considerations

For production deployment, consider:

1. **Authentication**: Add user authentication for multi-user support
2. **Database Security**: Implement proper RLS policies
3. **API Rate Limiting**: Add rate limiting for concept generation
4. **Error Monitoring**: Add error tracking (Sentry, etc.)
5. **Analytics**: Add usage analytics
6. **Backup Strategy**: Regular database backups

## Troubleshooting

### Common Issues

1. **"Could not find table" error**:
   - Ensure Supabase migration has been run
   - Check environment variables are set correctly

2. **"OpenAI API key" error**:
   - App will fall back to mock concepts
   - This is expected behavior in demo mode

3. **Build errors**:
   - Ensure all dependencies are installed
   - Check Node.js version compatibility

### Support

For issues or questions:
- Check the [README.md](README.md) for detailed setup instructions
- Review the [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md) for architecture details
- Open an issue in the GitHub repository
