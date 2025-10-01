# Deployment Guide

## Quick Start (Demo Mode)

The application works out-of-the-box in demo mode without any external dependencies:

```bash
npm install
npm run dev
```

At your local environment for supabase, run this command before ```npm run dev```

```bash
npm run supabase:start
npm run supbase:reset
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

### 3. Set up OpenAI

1. **Get OpenAI API Key**:
   - Go to [platform.openai.com](https://platform.openai.com)
   - Create an account and add billing
   - Generate an API key

2. **Add to Environment Variables**:
   - Add `OPENAI_API_KEY` to your Vercel environment variables

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
