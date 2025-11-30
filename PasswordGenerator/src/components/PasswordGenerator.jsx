import { useState } from 'react'

/**
 * PasswordGenerator Component
 * A complete password generator with customizable options
 */
const PasswordGenerator = () => {
  // State for password length (default: 12)
  const [length, setLength] = useState(12)
  
  // State for character type options
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  
  // State for generated password
  const [password, setPassword] = useState('')
  
  // State for copy feedback
  const [copied, setCopied] = useState(false)

  // Character sets for password generation
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  /**
   * Generate a random password based on selected options
   */
  const generatePassword = () => {
    // Build character pool based on selected options
    let charPool = lowercase // Always include lowercase
    
    if (includeUppercase) charPool += uppercase
    if (includeNumbers) charPool += numbers
    if (includeSymbols) charPool += symbols

    // Generate random password
    let generatedPassword = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length)
      generatedPassword += charPool[randomIndex]
    }

    setPassword(generatedPassword)
    setCopied(false) // Reset copied state
  }

  /**
   * Copy password to clipboard
   */
  const copyToClipboard = async () => {
    if (!password) return

    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy password:', err)
    }
  }

  /**
   * Handle length slider change
   */
  const handleLengthChange = (e) => {
    setLength(parseInt(e.target.value))
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Password Generator
        </h1>
        <p className="text-gray-600 text-sm">
          Create strong, secure passwords instantly
        </p>
      </div>

      {/* Password Display */}
      <div className="mb-6">
        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 min-h-[60px] flex items-center justify-center">
          <p className="text-lg font-mono text-gray-800 break-all text-center">
            {password || 'Click Generate to create password'}
          </p>
        </div>
      </div>

      {/* Password Length Slider */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-700 font-medium">
            Password Length
          </label>
          <span className="text-indigo-600 font-bold text-lg">
            {length}
          </span>
        </div>
        <input
          type="range"
          min="4"
          max="32"
          value={length}
          onChange={handleLengthChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>4</span>
          <span>32</span>
        </div>
      </div>

      {/* Character Options */}
      <div className="mb-6 space-y-3">
        <h3 className="text-gray-700 font-medium mb-3">Include:</h3>
        
        {/* Uppercase Letters */}
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
          />
          <span className="ml-3 text-gray-700 group-hover:text-gray-900">
            Uppercase Letters (A-Z)
          </span>
        </label>

        {/* Numbers */}
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
          />
          <span className="ml-3 text-gray-700 group-hover:text-gray-900">
            Numbers (0-9)
          </span>
        </label>

        {/* Symbols */}
        <label className="flex items-center cursor-pointer group">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
          />
          <span className="ml-3 text-gray-700 group-hover:text-gray-900">
            Symbols (!@#$%^&*)
          </span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Generate Password
        </button>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          disabled={!password}
          className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-200 ${
            password
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-800 active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {copied ? '✓ Copied!' : 'Copy to Clipboard'}
        </button>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Always use unique passwords for different accounts
        </p>
      </div>
    </div>
  )
}

export default PasswordGenerator
