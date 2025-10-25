// AWS Amplify Configuration
// Replace these values with your AWS Cognito settings

export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_USER_POOL_ID || '',
      userPoolClientId: import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID || '',
      identityPoolId: import.meta.env.VITE_AWS_IDENTITY_POOL_ID || '',
      region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
      signUpVerificationMethod: 'code' as const,
      loginWith: {
        email: true,
      },
    },
  },
};
