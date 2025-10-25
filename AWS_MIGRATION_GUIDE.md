# AWS Migration Guide

This project has been prepared for AWS migration. Follow these steps to complete the setup.

## ✅ What's Been Changed

- ✅ Replaced Supabase authentication with AWS Cognito
- ✅ Updated `useAuth` hook to use AWS Amplify
- ✅ Added AWS Amplify dependency
- ✅ Created AWS configuration file

## 🔧 What You Need to Do

### 1. Set Up AWS Cognito

1. Go to AWS Console → Cognito
2. Create a User Pool
3. Configure sign-in options (email)
4. Add app client
5. Note down:
   - User Pool ID
   - App Client ID
   - Identity Pool ID (if using)
   - Region

### 2. Set Up DynamoDB Tables

Create two tables:
- `profiles` - Primary key: `id` (String)
- `resumes` - Primary key: `id` (String), GSI: `user_id`

### 3. Set Up RDS (Optional)

If using RDS instead of DynamoDB:
- Create PostgreSQL/MySQL instance
- Set up API Gateway + Lambda for database access
- Update API endpoint configuration

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_AWS_USER_POOL_ID=your-user-pool-id
VITE_AWS_USER_POOL_CLIENT_ID=your-app-client-id
VITE_AWS_IDENTITY_POOL_ID=your-identity-pool-id
VITE_AWS_REGION=us-east-1
VITE_API_ENDPOINT=https://your-api.amazonaws.com
```

### 5. Update Database Queries

Replace all database operations:

**Before (Supabase):**
```typescript
const { data } = await supabase.from('profiles').select('*');
```

**After (AWS SDK):**
```typescript
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
const client = new DynamoDBClient({ region: 'us-east-1' });
const { Items } = await client.send(new QueryCommand({
  TableName: 'profiles'
}));
```

### 6. Update File Storage

Replace Supabase Storage with S3:
- Create S3 bucket
- Configure CORS
- Use AWS SDK or Amplify Storage

### 7. Deploy

Options:
- AWS Amplify Hosting
- S3 + CloudFront
- Vercel/Netlify (frontend only)

## ⚠️ Important Notes

- **Cannot remove** `src/integrations/supabase/` folder (contains read-only files)
- You'll need to manually remove these imports once AWS is fully integrated
- Test authentication flow before deploying
- Set up IAM roles for DynamoDB/S3 access

## 📚 Files to Update

After AWS setup, update these files:
- `src/pages/Upload.tsx` - Replace storage logic
- `src/pages/Analysis.tsx` - Replace database queries
- `src/pages/Chat.tsx` - Replace database queries
- Any components fetching user data

## 🔗 Useful Resources

- [AWS Amplify Docs](https://docs.amplify.aws/)
- [Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html)
- [DynamoDB Getting Started](https://docs.aws.amazon.com/dynamodb/latest/developerguide/GettingStartedDynamoDB.html)
