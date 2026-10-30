import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings, setup_logging
from app.api.v1.api import api_router
from app.database import engine, Base

setup_logging()
logger = logging.getLogger("qybernex.main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info(f"Starting {settings.PROJECT_NAME} v{settings.PROJECT_VERSION} in [{settings.ENVIRONMENT}] mode")
    # Initialize database tables if sqlite or dev fallback is active
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database schema verification completed.")
    except Exception as e:
        logger.warning(f"Database initialization warning on startup: {e}")
    yield
    logger.info(f"Shutting down {settings.PROJECT_NAME}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=f"{settings.PROJECT_TITLE}\n\n{settings.PROJECT_TAGLINE}",
    version=settings.PROJECT_VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# CORS Setup
if settings.CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled server exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error. Safe error boundary caught exception."}
    )

# Include API v1 Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", include_in_schema=False)
def root_redirect():
    return {
        "platform": settings.PROJECT_NAME,
        "title": settings.PROJECT_TITLE,
        "tagline": settings.PROJECT_TAGLINE,
        "version": settings.PROJECT_VERSION,
        "docs_url": f"{settings.API_V1_STR}/docs",
        "health_check": f"{settings.API_V1_STR}/health"
    }
