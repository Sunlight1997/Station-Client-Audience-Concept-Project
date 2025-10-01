# Concept Generator

A marketing concept generator that helps marketing professionals create targeted creative concepts based on audience demographics using AI.

## Features

- **Audience Creation**: Define target audiences with comprehensive demographic variables
- **AI-Powered Concept Generation**: Generate creative marketing concepts tailored to specific audiences using OpenAI
- **Concept Management**: Save and view generated concepts in Supabase
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-3.5-turbo
- **Icons**: Lucide React

## Key Design Decisions

### 1. Audience Demographics
I chose to include comprehensive demographic variables that are commonly used in marketing:
- **Basic Demographics**: Age range, gender, income, education
- **Geographic**: Location type (urban/suburban/rural)
- **Psychographic**: Lifestyle, interests
- **Behavioral**: Multiple interest selection for better targeting

### 2. Concept Generation Approach
- **AI Integration**: Using OpenAI's GPT-3.5-turbo for creative concept generation
- **Structured Prompts**: Carefully crafted prompts that include audience context
- **JSON Response**: Structured output for consistent data handling

### 3. Database Design
- **Normalized Structure**: Separate tables for audiences and concepts
- **Relationships**: Foreign key relationships with cascade delete
- **Indexing**: Optimized for common query patterns

### 4. User Experience
- **Progressive Disclosure**: Step-by-step workflow (audience → concept → management)
- **Real-time Feedback**: Loading states and error handling
- **Visual Hierarchy**: Clear information architecture
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start (Demo Mode)

The application works out-of-the-box without any external dependencies:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application in demo mode.

## Full Setup with External Services

### Prerequisites
- Node.js 18+ 
- Supabase account (optional)
- OpenAI API key (optional)

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd concept-generator
npm install
```

### 2. Environment Variables (Optional)
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Database Setup (Optional)
1. Create a new Supabase project
2. Run the SQL migration from `supabase/migrations/001_initial_schema.sql` in your Supabase SQL editor
3. Update your environment variables with the Supabase URL and anon key

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions including Vercel deployment.

## Usage

### Creating an Audience
1. Fill out the audience form with demographic information
2. Select relevant interests from the provided options
3. Click "Create Audience" to save the audience profile

### Generating Concepts
1. Once an audience is created, the concept generator will appear
2. Review the audience summary
3. Click "Generate Concept" to create an AI-powered marketing concept
4. The concept will be automatically saved to the database

### Managing Concepts
- View all generated concepts in the right panel
- Each concept shows the target audience and creation date

## Project Structure

```
concept-generator/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── AudienceForm.tsx   # Audience creation form
│   ├── ConceptGenerator.tsx # Concept generation interface
│   └── ConceptList.tsx    # Concept display and management
├── lib/                   # Utility libraries
│   ├── openai.ts         # OpenAI integration
│   └── supabase.ts       # Supabase client and functions
├── types/                 # TypeScript type definitions
│   └── index.ts          # Main type definitions
├── supabase-schema.sql    # Database schema
└── README.md             # This file
```

## Assumptions Made

1. **Target User**: Marketing professionals at F500 companies who need quick, creative concept generation
2. **Use Case**: Internal brainstorming and ideation, not client-facing presentations
3. **Data Privacy**: Concepts are stored in a shared database (in production, would need user authentication)
4. **AI Model**: GPT-3.5-turbo provides sufficient creativity for this use case
5. **Scalability**: Single-user demo application (would need user management for production)

## Future Enhancements

- **User Authentication**: Multi-user support with personal concept libraries
- **Concept Categories**: Organize concepts by campaign type or industry
- **Export Functionality**: Download concepts as PDF or share via email
- **Advanced Targeting**: More sophisticated audience segmentation
- **Concept Analytics**: Track which concepts perform best
- **Collaboration**: Share concepts with team members
- **Templates**: Pre-built audience templates for common market segments

## API Costs

- **OpenAI**: ~$0.002 per concept generation (GPT-3.5-turbo)
- **Supabase**: Free tier supports up to 500MB database and 50,000 monthly active users

## Development Notes

- Built with Next.js 15 and React 19 for modern development experience
- TypeScript for type safety and better developer experience
- Tailwind CSS for rapid, consistent styling
- Supabase for backend-as-a-service with real-time capabilities
- OpenAI integration for AI-powered content generation

The application is designed to be easily extensible and maintainable, with clear separation of concerns and modern React patterns.
