import sys
import json
import os
import base64
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage

# Load environment variables
load_dotenv()
api_key = os.getenv("GEMINI_API")
if not api_key:
    raise ValueError("❌ GEMINI_API not found in .env file")

def image_to_base64(image_path: str) -> str:
    """Convert local image to base64 data URI string with correct MIME type."""
    with open(image_path, "rb") as img_file:
        encoded = base64.b64encode(img_file.read()).decode("utf-8")

    ext = image_path.split(".")[-1].lower()
    if ext == "jpg":
        ext = "jpeg"  # normalize to supported MIME type
    return f"data:image/{ext};base64,{encoded}"


def extract_fields(image_path: str):
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0, api_key=api_key)

    image_b64 = image_to_base64(image_path)

    messages = [
        HumanMessage(content=[
            {"type": "text", "text": "Extract fields (Name, DOB, PAN, Aadhaar, Gender if available) and return as JSON."},
            {"type": "image_url", "image_url": image_b64}
        ])
    ]

    response = llm.invoke(messages)

    try:
        data = json.loads(response.content)
    except Exception:
        data = {"raw_output": response.content}

    return data


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract.py path/to/id_image.jpg")
        sys.exit(1)

    image_path = sys.argv[1]
    result = extract_fields(image_path)
    print(json.dumps(result, indent=2, ensure_ascii=False))