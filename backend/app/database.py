import logging
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

logger = logging.getLogger("qybernex.database")

# Database URI configuration with safe fallback for sqlite in dev/testing if DB URI is not explicitly valid
db_uri = settings.SQLALCHEMY_DATABASE_URI
if not db_uri or os.getenv("TESTING") == "True":
    db_uri = "sqlite:///./qybernex_dev.db"

# Create SQLAlchemy engine
connect_args = {"check_same_thread": False} if db_uri.startswith("sqlite") else {}

engine = create_engine(
    db_uri,
    connect_args=connect_args,
    pool_pre_ping=True if not db_uri.startswith("sqlite") else False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency for obtaining database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def check_db_connection() -> bool:
    """Utility to test database connectivity for readiness checks."""
    try:
        with engine.connect() as connection:
            from sqlalchemy import text
            connection.execute(text("SELECT 1"))
        return True
    except Exception as e:
        logger.warning(f"Database readiness connection failed: {e}")
        return False
