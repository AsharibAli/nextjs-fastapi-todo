# This file is responsible for signing , encoding , decoding and returning JWTS
import time
from typing import Dict
import jwt
from dotenv import load_dotenv
import os
load_dotenv()

JWT_SECRET = os.environ["SECRET"]
JWT_ALGORITHM = os.environ["ALGORITHM"]

# function for returning access_token property
def token_response(token:str):
  return {
    "access_token":token
  }

# function used for signing the JWT token
def signJWT(user_id:str)->Dict[str,str]:
  payload={
    "user_id":user_id,
    "expires":time.time() + 6000
  }
  token = jwt.encode(payload,JWT_SECRET,algorithm=JWT_ALGORITHM)
  return token_response(token)
  

# function used for decoding JWT token
def decodeJWT(token:str)->dict:
  try:
    decoded_token = jwt.decode(token,JWT_SECRET,algorithms=[JWT_ALGORITHM])
    return decoded_token if decoded_token["expires"] >= time.time() else None
  except:
    return {}

