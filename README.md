# Web-based Inference - Prototype Aleph-B

A web-based AI inference interface using Hugging Face Transformers.js with ONNX models.

Try it on https://dermotte.github.io/web-based-inference-example/

## Features

- **Editable Prompts**: Modify both system prompt and user request directly in the browser
- **Client-side Inference**: Runs entirely in your browser using WebGPU
- **Real-time Response**: See generated AI responses instantly

## How to Use

1. Open `index.html` in a modern web browser (Chrome, Edge, or Firefox with WebGPU support)
2. Edit the **System Prompt** to customize the AI's behavior
3. Edit the **Request** field with your desired query
4. Click **"Generate Response"** to generate AI output

## Technical Details

- **Model**: onnx-community/Qwen2.5-0.5B-Instruct
- **Framework**: Hugging Face Transformers.js
- **Backend**: WebGPU (with ONNX quantization)

## Browser Requirements

- Browser must support WebGPU
- Recommended: Chrome 113+, Edge 113+, or Firefox with WebGPU enabled
- Sufficient RAM (model loads into memory)

## Files

- `index.html` - Main web interface
- `main.js` - JavaScript logic for AI inference
- `README.md` - This documentation
