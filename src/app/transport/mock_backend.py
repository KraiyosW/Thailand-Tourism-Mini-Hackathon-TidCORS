from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time

app = FastAPI(title="Transport Mock API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RouteRequest(BaseModel):
    pickup: str
    dropoff: str
    userPrice: float
    vehicleType: str

@app.post("/api/check-route")
def check_route(request: RouteRequest):
    # Simulate processing delay
    time.sleep(1.2)
    
    # Generate deterministic-ish fake expected price based on locations and vehicle type
    base = 150
    modifier_multiplier = 15
    
    if request.vehicleType == "Motorcycle":
        base = 50
        modifier_multiplier = 10
    elif request.vehicleType == "Songthaew (Red Truck)":
        base = 30
        modifier_multiplier = 5
    elif request.vehicleType == "Tuk-Tuk":
        base = 100
        modifier_multiplier = 15
    elif request.vehicleType == "Car":
        base = 150
        modifier_multiplier = 20

    distance_modifier = abs(len(request.pickup) - len(request.dropoff)) * modifier_multiplier + random.uniform(0, 50)
    expected_price = int(base + distance_modifier)
    
    # Evaluate the user's price against expected price
    difference = request.userPrice - expected_price
    
    status = "Avg"
    if difference <= 20: # User price is good (close to or less than expected)
        status = "Good"
    elif difference <= (expected_price * 0.5) + 50: # User price is slightly higher but acceptable
        status = "Avg"
    else: # User price is significantly higher (overcharged)
        status = "High"

    scam_alert = None
    # Trigger scam alert if user price is way too high
    if difference > (expected_price * 0.8) + 100 or (request.userPrice > expected_price * 2 and random.random() > 0.3):
        scam_alert = {
            "reports": random.randint(2, 8),
            "message": f"recent reports of {request.vehicleType} drivers overcharging near this area. The fair price should be around ฿{expected_price}."
        }

    return {
        "expectedPrice": expected_price,
        "userPrice": request.userPrice,
        "status": status,
        "scamAlert": scam_alert
    }

if __name__ == "__main__":
    import uvicorn
    # Run with: python mock_backend.py
    uvicorn.run(app, host="0.0.0.0", port=8000)
