import streamlit as st
import os

# Set page configuration to wide mode to maximize space
st.set_page_config(layout="wide", page_title="Sudip Kumar Yadav | AI Engineer")

# Read the HTML file
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Determine base path for serving static assets (CSS/JS)
# Note: Streamlit Cloud has strict rules about serving static files (images/css/js) relative to the script.
# We will embed the CSS and JS directly into the HTML for the streamit version if external files fail to load, 
# but for now, we serve the raw HTML which references them. 
# 
# CRITICAL: Streamlit components run in an iframe. 
# The relative paths (css/style.css) inside `index.html` might break because the iframe's root is different.
# To fix this robustly for this wrapper, we inject the CSS and JS directly.

# Read CSS
with open('css/style.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

# Read JS Data
with open('js/data.js', 'r', encoding='utf-8') as f:
    js_data = f.read()

# Read JS Main
with open('js/main.js', 'r', encoding='utf-8') as f:
    js_main = f.read()

# Inject into HTML
# We replace the link/script tags with inline versions
full_html = html_content.replace('<link rel="stylesheet" href="css/style.css">', f'<style>{css_content}</style>')
full_html = full_html.replace('<script src="js/data.js"></script>', f'<script>{js_data}</script>')
full_html = full_html.replace('<script src="js/main.js"></script>', f'<script>{js_main}</script>')

# Render the HTML
st.components.v1.html(full_html, height=4000, scrolling=True)
