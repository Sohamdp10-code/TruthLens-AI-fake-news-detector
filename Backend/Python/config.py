from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    APP_NAME: str = "TruthLens"

    VERSION: str = "2.0"

    DATABASE_URL: str = "sqlite:///./truthlens.db"

    SECRET_KEY: str = "CHANGE_ME"

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    OPENAI_API_KEY: str = ""

    NEWS_API_KEY: str = ""

    GOOGLE_FACT_CHECK_API: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
