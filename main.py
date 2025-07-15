from fastapi import FastAPI
# from routers.endpoints import router
from fastapi.middleware.cors import CORSMiddleware
from routers.endpoints import router
app= FastAPI()

# app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(router)