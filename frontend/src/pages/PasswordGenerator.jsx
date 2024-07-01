import React, { useState } from 'react';
import generatePassword from 'generate-password';

const PasswordGeneratorModal = ({ isOpen, onClose }) => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(12);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [includeLetters, setIncludeLetters] = useState(true);
    const [excludeSimilar, setExcludeSimilar] = useState(false);

    const generateNewPassword = () => {
        const newPassword = generatePassword.generate({
            length: length,
            numbers: includeNumbers,
            symbols: includeSymbols,
            uppercase: includeLetters,
            excludeSimilarCharacters: excludeSimilar,
        });
        setPassword(newPassword);
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(password);
        alert('Password copied to clipboard!');
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-black bg-opacity-50 absolute inset-0 transition-opacity duration-300" onClick={onClose}></div>
                <div className="bg-gray-800 text-white rounded p-6 z-10 transform transition-transform duration-300 scale-95 w-96">
                    <h2 className="text-xl mb-4">Generate Password</h2>
                    <div className="flex items-center justify-between mb-4">
                        <input
                            className="bg-gray-700 text-white text-xl p-2 rounded w-full"
                            type="text"
                            value={password}
                            readOnly
                        />
                        <button onClick={generateNewPassword} className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            🔄
                        </button>
                    </div>
                    <div className="text-gray-400 mb-4">Let's make this password stronger</div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-bold mb-2">Options</label>
                        <div className="flex items-center justify-between mb-2">
                            <span>Length</span>
                            <input
                                type="range"
                                min="4"
                                max="40"
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                className="w-1/2"
                            />
                            <span>{length}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span>Digits (e.g. 345)</span>
                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={() => setIncludeNumbers(!includeNumbers)}
                                className="toggle-checkbox"
                            />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span>Symbols (e.g. @$#)</span>
                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={() => setIncludeSymbols(!includeSymbols)}
                                className="toggle-checkbox"
                            />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span>Letters (e.g. Aa)</span>
                            <input
                                type="checkbox"
                                checked={includeLetters}
                                onChange={() => setIncludeLetters(!includeLetters)}
                                className="toggle-checkbox"
                            />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span>Similar characters (e.g. l/1)</span>
                            <input
                                type="checkbox"
                                checked={excludeSimilar}
                                onChange={() => setExcludeSimilar(!excludeSimilar)}
                                className="toggle-checkbox"
                            />
                        </div>
                    </div>
                    <button onClick={(copyPassword)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                        Copy password
                    </button>
                </div>
            </div>
        )
    );
};

export default PasswordGeneratorModal;
