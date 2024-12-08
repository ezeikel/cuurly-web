if [[ "$VERCEL_ENV" == "preview" ]]; then
  echo "🚀 Deploying to preview..."

  pnpm db:generate
  next build

elif [[ "$VERCEL_ENV" == "production" ]]; then
  echo "🚀 Deploying to production..."
  
  pnpm -F db db:migrate:deploy
  pnpm db:generate
  next build
else
  echo "🚀 Deploying to development..."

  pnpm db:generate
  next build
fi
