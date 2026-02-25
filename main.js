/**
 * Web-based Inference - Prototype Aleph-B
 * 
 * This module provides client-side AI inference using Hugging Face Transformers.js
 * with the ONNX quantized Qwen2.5-0.5B-Instruct model.
 * 
 * @module main
 */

import { pipeline } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/transformers.min.js";

// DOM Element References
// ----------------------
/**
 * Reference to the system prompt textarea element
 * @type {HTMLTextAreaElement}
 */
const systemPromptElement = document.getElementById("system-prompt");

/**
 * Reference to the user request textarea element
 * @type {HTMLTextAreaElement}
 */
const userRequestElement = document.getElementById("user-request");

/**
 * Reference to the output container element where AI responses are displayed
 * @type {HTMLElement}
 */
const outputContainer = document.getElementById("output-container");

/**
 * Reference to the generate response button
 * @type {HTMLButtonElement}
 */
const generateBtn = document.getElementById("generate-btn");

// State Management
// ----------------
/**
 * The text generation pipeline instance
 * @type {Object|null}
 */
let generator = null;

/**
 * Initializes the text generation pipeline if not already loaded
 * Shows a loading indicator while the model is being fetched
 * @returns {Promise<Object>} The initialized generator pipeline
 */
async function initGenerator() {
    if (!generator) {
        outputContainer.innerHTML = `<div class="alert alert-info" role="alert">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="ms-2">Loading model...</span>
        </div>`;
        generator = await pipeline(
            "text-generation",
            // "onnx-community/Qwen2.5-0.5B-Instruct",
            // { dtype: "q4", device: "webgpu" },
            "onnx-community/LFM2-2.6B-ONNX",
            { dtype: "q4", device: "webgpu" },
        );
    }
    return generator;
}

/**
 * Generates an AI response based on current system prompt and user request
 * 
 * This function:
 * 1. Initializes the generator if needed
 * 2. Reads current values from the prompt textareas
 * 3. Creates a message array with system and user roles
 * 4. Calls the text generation pipeline
 * 5. Displays the generated response in the output container
 * 
 * @async
 * @returns {Promise<void>}
 */
async function generateResponse() {
    try {
        await initGenerator();
        
        // Get current values from textareas
        const systemPrompt = systemPromptElement.value;
        const userRequest = userRequestElement.value;
        
        // Create message array for the model
        const messages = [
            { role: "system", content: systemPrompt },
            { role: "user", content: userRequest },
        ];
        
        // Show loading state
        outputContainer.innerHTML = `<div class="alert alert-info" role="alert">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span class="ms-2">Generating response...</span>
        </div>`;
        
        // Generate a response with max 128 new tokens
        const output = await generator(messages, { max_new_tokens: 128 });
        const generatedText = output[0].generated_text.at(-1).content;
        
        // Display the output
        outputContainer.innerHTML = `<div class="alert alert-success" role="alert">${generatedText}</div>`;
        console.log("Generated response:", generatedText);
    } catch (error) {
        console.error("Error generating response:", error);
        outputContainer.innerHTML = `<div class="alert alert-danger" role="alert">
            Error generating response: ${error.message}
        </div>`;
    }
}

// Event Listeners
// ---------------
/**
 * Event listener for the generate button click
 * Triggers the AI response generation process
 */
generateBtn.addEventListener("click", generateResponse);

// Initialization
// --------------
/**
 * Sets initial default values in the prompt textareas
 * This runs when the module is loaded
 */
systemPromptElement.value = "You are a helpful assistant.";
userRequestElement.value = "Tell me a funny joke.";
