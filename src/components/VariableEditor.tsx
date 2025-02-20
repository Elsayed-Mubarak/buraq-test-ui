
import { ReactQuillModules } from '@/constants';
import { useVariablesStore } from '@/stores/settings/useVariables.store';
import { useRef, useEffect, useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IVariables } from '@/types/settings/variables';
interface Props {
    value: string;
    onChange: (value: string) => void;
    modules?: any;
}
const VariableEditor = ({ value, onChange, modules }: Props) => {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const quillRef = useRef<any>(null);
    const { variables, getVariables } = useVariablesStore((state) => state);
    const lastValueRef = useRef<string>(value); // Reference to track the last value

    useEffect(() => {
        getVariables();
    }, [getVariables]);

    const handleChange = useCallback(
        (editorValue: string) => {
            if (editorValue !== lastValueRef.current) {
                lastValueRef.current = editorValue;
                onChange(editorValue);
            }
        },
        [onChange]
    );

    const handleEditorChange = (editorValue: string) => {
        const quill = quillRef.current?.getEditor();
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const cursorIndex = range.index;
                const textBeforeCursor = quill.getText(0, cursorIndex);

                // Show the variable menu when '#' is typed
                if (textBeforeCursor.endsWith('#')) {
                    const bounds = quill.getBounds(cursorIndex);
                    setMenuPosition({
                        top: bounds.top + window.scrollY,
                        left: bounds.left + window.scrollX,
                    });
                    setShowMenu(true);
                } else {
                    setShowMenu(false);
                }
            }
        }
        handleChange(editorValue);
    };

    const insertVariable = (variableName: string) => {
        const quill = quillRef.current?.getEditor();
        if (quill) {
            quill.focus();
            const range = quill.getSelection();
            if (range) {
                const cursorIndex = range.index;
                const textBeforeCursor = quill.getText(0, cursorIndex);
                const lastCharIndex = textBeforeCursor.lastIndexOf('#');
                if (lastCharIndex !== -1) {
                    quill.deleteText(lastCharIndex, 1); // Remove the '#'
                }
                const updatedCursorIndex = lastCharIndex !== -1 ? lastCharIndex : cursorIndex;
                quill.insertText(updatedCursorIndex, `#${variableName}`, 'variable', true);
                const nextIndex = updatedCursorIndex + variableName.length + 1;
                quill.insertText(nextIndex, '\u200B'); // Zero-width space
                quill.removeFormat(nextIndex, 1); // Remove any formatting applied to the space
                quill.setSelection(nextIndex + 1);
                handleChange(quill.root.innerHTML);
            }
        }
    };
    // Register the custom variable format
    ReactQuill.Quill.register(
        'formats/variable',
        class VariableBlot extends (ReactQuill.Quill.import('blots/inline') as any) {
            static blotName = 'variable';
            static tagName = 'span';
            static className = 'variable-name';
            static create(value: any) {
                const node = super.create();
                node.setAttribute('contenteditable', 'false');
                node.dataset.variable = value;
                return node;
            }
            static formats(node: HTMLElement) {
                return node.dataset.variable;
            }
        }
    );
    // useEffect(() => {
    //     const quill = quillRef.current?.getEditor();
    //     if (quill) {
    //         quill.on('text-change', (delta: any, oldDelta: any, source: any) => {
    //             if (source === 'user') {
    //                 const operations = delta.ops || [];
    //                 operations.forEach((op: any) => {
    //                     if (op.insert && typeof op.insert === 'string') {
    //                         // Prevent editing inside variables
    //                         const editorContent = quill.root.innerHTML;
    //                         handleChange(editorContent);
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // }, [handleChange]);
    // Handle removing a variable when the user deletes it
    const handleDelete = (e: KeyboardEvent) => {
        const quill = quillRef.current?.getEditor();
        if (quill && e.key === 'Backspace') {
            const range = quill.getSelection();
            if (range) {
                const cursorIndex = range.index;
                const textBeforeCursor = quill.getText(0, cursorIndex);
                const lastVariableStart = textBeforeCursor.lastIndexOf('#');
                if (lastVariableStart !== -1) {
                    // Get the whole variable (not letter-by-letter)
                    const variableEnd = quill.getText(cursorIndex).indexOf(' '); // Find where the variable ends
                    const variableName = quill.getText(lastVariableStart, variableEnd);
                    if (variableName) {
                        quill.deleteText(lastVariableStart, variableName.length); // Delete the entire variable
                    }
                }
            }
        }
    };
    // useEffect(() => {
    //     // Listen for backspace and remove the variable as a word
    //     const quill = quillRef.current?.getEditor();
    //     if (quill) {
    //         quill.root.addEventListener('keydown', handleDelete);
    //     }
    //     return () => {
    //         const quill = quillRef.current?.getEditor();
    //         if (quill) {
    //             quill.root.removeEventListener('keydown', handleDelete);
    //         }
    //     };
    // }, []);
    useEffect(() => {
        // Listen for backspace and remove the variable as a word
        const quill = quillRef.current?.getEditor();
        if (quill) {
            quill.root.addEventListener('keydown', handleDelete);
        }
        return () => {
            const quill = quillRef.current?.getEditor();
            if (quill) {
                quill.root.removeEventListener('keydown', handleDelete);
            }
        };
    }, []);

    return (
        <div className="editor-container relative">
            <ReactQuill
                ref={quillRef}
                value={value}
                onChange={handleEditorChange} // Use the handleEditorChange to manage menu logic
                modules={modules ? modules : ReactQuillModules}
                className="text-sm h-[120px] text-nodeSettings"
            />
            {showMenu && (
                <div
                    className={`absolute border border-gray-200 bg-white p-2 z-50 w-[310px] rounded-md shadow-md left-1/2 -translate-x-1/2 h-[150px] top-[${menuPosition.top}px]`}
                >
                    <ul className='w-full h-full overflow-y-auto'>
                        {variables.map((variable: IVariables) => (
                            <li
                                key={variable.variableName}
                                onClick={() => insertVariable(variable.variableName)}
                                className="cursor-pointer hover:bg-gray-100 p-1 flex justify-between items-center text-sm"
                            >
                                <span className='text-nodeSettings font-medium'>{variable.variableName}</span>
                                <span className='text-gray-500'>{variable.type}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
export default VariableEditor;

















