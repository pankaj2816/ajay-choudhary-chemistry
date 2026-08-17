import os
import sys
from PIL import Image, ImageFilter, ImageOps
import numpy as np

def create_studio_composite():
    input_path = r"d:\Work\Teacher_Website\image\WhatsApp Image 2026-08-17 at 10.37.15 PM.jpeg"
    output_path1 = r"d:\Work\Teacher_Website\public\images\ajay-choudhary.jpg"
    output_path2 = r"d:\Work\Teacher_Website\public\images\ajay-profile.jpg"
    
    print(f"Loading original image: {input_path}")
    orig_img = Image.open(input_path).convert("RGBA")
    
    from rembg import remove, new_session
    print("Extracting exact foreground subject using u2net session...")
    # Use u2net for crisp edge delineation
    session = new_session("u2net")
    foreground = remove(orig_img, session=session, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10, alpha_matting_erode_size=10)

    w, h = foreground.size
    print(f"Foreground dimensions: {w}x{h}")
    
    # 1. Create a modern educational/academic studio background
    # Deep midnight navy to slate gradient with soft overhead spotlight
    bg_np = np.zeros((h, w, 4), dtype=np.uint8)
    
    cx, cy = w / 2.0, h * 0.30
    max_radius = np.sqrt((w/2)**2 + (h/2)**2)
    
    y_coords, x_coords = np.ogrid[:h, :w]
    dist = np.sqrt((x_coords - cx)**2 + (y_coords - cy)**2)
    norm_dist = np.clip(dist / max_radius, 0, 1)
    
    # Elegant Studio Palette: Warm Slate Cyan center (45, 65, 95) -> Deep Navy (10, 16, 26)
    r = (48 * (1 - norm_dist) + 12 * norm_dist).astype(np.uint8)
    g = (68 * (1 - norm_dist) + 18 * norm_dist).astype(np.uint8)
    b = (96 * (1 - norm_dist) + 28 * norm_dist).astype(np.uint8)
    a = np.full((h, w), 255, dtype=np.uint8)
    
    bg_np[:, :, 0] = r
    bg_np[:, :, 1] = g
    bg_np[:, :, 2] = b
    bg_np[:, :, 3] = a
    
    studio_bg = Image.fromarray(bg_np, "RGBA")
    studio_bg = studio_bg.filter(ImageFilter.GaussianBlur(radius=8))
    
    # 2. Composite his 100% genuine cutout
    composite = Image.alpha_composite(studio_bg, foreground)
    
    # 3. Crop to professional executive portrait framing (head to mid-chest/torso)
    crop_box = (0, 0, w, int(h * 0.85))
    final_headshot = composite.crop(crop_box)
    
    # Save in RGB
    final_rgb = final_headshot.convert("RGB")
    final_rgb.save(output_path1, quality=95, optimize=True)
    final_rgb.save(output_path2, quality=95, optimize=True)
    
    print("SUCCESS: 100% original face & body composited onto studio background!")

if __name__ == "__main__":
    create_studio_composite()
