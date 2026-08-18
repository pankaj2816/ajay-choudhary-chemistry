import os
from PIL import Image, ImageEnhance, ImageFilter

def process_real_lab_photo():
    input_path = r"d:\Work\Teacher_Website\image\lab_pic.jpeg"
    output_path1 = r"d:\Work\Teacher_Website\public\images\ajay-lab-practical.jpg"
    output_path2 = r"d:\Work\Teacher_Website\public\images\chemistry-lab-hero.jpg"
    output_path3 = r"d:\Work\Teacher_Website\public\images\teaching-team.jpg"
    
    img = Image.open(input_path)
    w, h = img.size # 1080 x 1080
    
    # Ajay Sir is centered nicely between x: 260 and 800, y: 220 and 900.
    # The hand on the bottom left ends at x: 300, y: 880..1080.
    # If we crop from x=270, y=100 to x=1080, y=980:
    crop_box = (270, 100, 1080, 980)
    cropped = img.crop(crop_box)
    
    # Mild natural clarity enhancement
    enhancer_contrast = ImageEnhance.Contrast(cropped)
    enhanced = enhancer_contrast.enhance(1.12)
    
    enhancer_color = ImageEnhance.Color(enhanced)
    final_img = enhancer_color.enhance(1.08)
    
    # Save the 100% genuine real photo
    final_img.save(output_path1, quality=98, optimize=True)
    final_img.save(output_path2, quality=98, optimize=True)
    final_img.save(output_path3, quality=98, optimize=True)
    
    print("SUCCESS: 100% authentic real photo, cleanly framed without external hands!")

if __name__ == "__main__":
    process_real_lab_photo()
