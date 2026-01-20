#!/bin/bash
set -e

# Docker-based database setup script
# Runs migrations and seed inside the running backend container

echo "🐳 Docker Database Setup"
echo "========================"

CONTAINER_NAME="${CONTAINER_NAME:-iul-pos-backend}"
COMPOSE_PROJECT="${COMPOSE_PROJECT:-iul-pos}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Parse arguments
ACTION="all"
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --migrate) ACTION="migrate" ;;
        --seed) ACTION="seed" ;;
        --generate) ACTION="generate" ;;
        -h|--help)
            echo ""
            echo "Usage: ./docker-db-setup.sh [options]"
            echo ""
            echo "Options:"
            echo "  --migrate    Run migrations only"
            echo "  --seed       Run seeding only"
            echo "  --generate   Generate new migration files"
            echo "  -h, --help   Show this help message"
            echo ""
            echo "Without options, runs both migrate and seed."
            exit 0
            ;;
        *) echo "Unknown option: $1"; exit 1 ;;
    esac
    shift
done

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    echo -e "${RED}❌ Error: Container '${CONTAINER_NAME}' is not running${NC}"
    echo "Start the containers first: docker-compose up -d"
    exit 1
fi

echo -e "${GREEN}✓ Container '${CONTAINER_NAME}' is running${NC}"

case $ACTION in
    "generate")
        echo -e "${YELLOW}📝 Generating migration files...${NC}"
        docker exec -it $CONTAINER_NAME npm run db:generate
        echo -e "${GREEN}✓ Migration files generated${NC}"
        ;;
    "migrate")
        echo -e "${YELLOW}📦 Running migrations...${NC}"
        docker exec -it $CONTAINER_NAME npm run db:migrate
        echo -e "${GREEN}✓ Migrations completed${NC}"
        ;;
    "seed")
        echo -e "${YELLOW}🌱 Seeding database...${NC}"
        docker exec -it $CONTAINER_NAME npm run db:seed
        echo -e "${GREEN}✓ Seeding completed${NC}"
        ;;
    "all")
        echo -e "${YELLOW}📦 Running migrations...${NC}"
        docker exec -it $CONTAINER_NAME npm run db:migrate
        echo -e "${GREEN}✓ Migrations completed${NC}"
        echo ""
        echo -e "${YELLOW}🌱 Seeding database...${NC}"
        docker exec -it $CONTAINER_NAME npm run db:seed
        echo -e "${GREEN}✓ Seeding completed${NC}"
        ;;
esac

echo ""
echo -e "${GREEN}✅ Database setup complete!${NC}"
