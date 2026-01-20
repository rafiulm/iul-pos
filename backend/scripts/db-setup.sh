#!/bin/bash
set -e

# Database setup script for production
# This script runs migrations and optionally seeds the database

echo "🗄️  Database Setup Script"
echo "========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ Error: DATABASE_URL environment variable is not set${NC}"
    exit 1
fi

echo -e "${GREEN}✓ DATABASE_URL is configured${NC}"

# Parse command line arguments
SKIP_SEED=false
SEED_ONLY=false
MIGRATE_ONLY=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --skip-seed) SKIP_SEED=true ;;
        --seed-only) SEED_ONLY=true ;;
        --migrate-only) MIGRATE_ONLY=true ;;
        -h|--help) 
            echo ""
            echo "Usage: ./db-setup.sh [options]"
            echo ""
            echo "Options:"
            echo "  --skip-seed     Run migrations only, skip seeding"
            echo "  --seed-only     Run seeding only, skip migrations"
            echo "  --migrate-only  Alias for --skip-seed"
            echo "  -h, --help      Show this help message"
            echo ""
            exit 0
            ;;
        *) echo "Unknown option: $1"; exit 1 ;;
    esac
    shift
done

# Handle migrate-only as alias for skip-seed
if [ "$MIGRATE_ONLY" = true ]; then
    SKIP_SEED=true
fi

# Run migrations
if [ "$SEED_ONLY" = false ]; then
    echo ""
    echo -e "${YELLOW}📦 Running database migrations...${NC}"
    npm run db:migrate
    echo -e "${GREEN}✓ Migrations completed${NC}"
fi

# Run seeding
if [ "$SKIP_SEED" = false ]; then
    echo ""
    echo -e "${YELLOW}🌱 Seeding database...${NC}"
    npm run db:seed
    echo -e "${GREEN}✓ Seeding completed${NC}"
fi

echo ""
echo -e "${GREEN}✅ Database setup complete!${NC}"
