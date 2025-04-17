import sys
import json
from paddleocr import PaddleOCR

ocr = PaddleOCR(use_angle_cls=False, lang='en', use_gpu=False)
img_path = sys.argv[1]
result = ocr.ocr(img_path)

card_number = None
expiry = None
name = None
card_type = None

for line in result[0]:
    text = line[1][0]
    digits = ''.join(c for c in text if c.isdigit())
    if not card_number and 13 <= len(digits) <= 16:
        card_number = digits
    if not expiry and '/' in text and len(text) >= 5:
        expiry = text
    if not name and text.replace(" ", "").isalpha() and text.isupper():
        name = text
    if not card_type and ('CREDIT' in text.upper() or 'DEBIT' in text.upper()):
        card_type = text.upper()

print(json.dumps({
    'card_number': card_number,
    'expiry': expiry,
    'name': name,
    'card_type': card_type
}))
