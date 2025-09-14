# ID Extraction with Gemini + LangChain

This project extracts structured fields (Name, DOB, PAN, Aadhaar, Gender, Father's Name)
from Indian ID documents (Aadhaar, PAN) using Google's Gemini model through LangChain.

## Setup

1. Create and activate a virtual environment:
```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set your Google API key:
```bash
export GOOGLE_API_KEY="your_api_key_here"
```

4. Run the extraction script:
```bash
python extract.py path/to/id_image.jpg
```

The output will be JSON with the extracted fields.

## Notes
- Uses Gemini multimodal model via LangChain (`langchain_google_genai`).
- Always validate extracted PAN/Aadhaar with regex/checksum before production use.
