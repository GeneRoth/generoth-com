from PIL import Image, ImageDraw, ImageFont
import os

size = 256
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

navy = (7, 20, 40, 255)
cyan = (6, 182, 212, 255)

draw.ellipse([0, 0, size-1, size-1], fill=navy)
draw.ellipse([4, 4, size-5, size-5], outline=cyan, width=6)

try:
    font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 108)
except:
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 108)
    except:
        font = ImageFont.load_default()

text = "GR"
bbox = draw.textbbox((0, 0), text, font=font)
text_w = bbox[2] - bbox[0]
text_h = bbox[3] - bbox[1]
x = (size - text_w) // 2 - bbox[0]
y = (size - text_h) // 2 - bbox[1] - 4
draw.text((x, y), text, fill=cyan, font=font)

# Save as icon.png in the app folder (Next.js uses this automatically)
out = os.path.join(os.path.dirname(__file__), "app", "icon.png")
img.save(out)
print(f"Saved: {out}")
