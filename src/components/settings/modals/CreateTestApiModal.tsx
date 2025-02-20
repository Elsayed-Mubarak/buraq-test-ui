import React, { useState } from 'react';
import Portal from '@/components/shared/Portal';
import axios, { AxiosResponse, AxiosError, AxiosStatic } from 'axios';

interface ApiResponse {
    [key: string]: any; // Adjust based on your API response structure
}

interface CreateTestApiModalProps {
    setShowCreateTestApiModal: (show: boolean) => void;
    method: 'POST' | 'PUT' | 'GET' | 'DELETE' ;
    data? : object; 
    url : string;
    body? : object | undefined;
    headers? : object | undefined;
}

const CreateTestApiModal = ({ setShowCreateTestApiModal, method , url, data , body , headers}: CreateTestApiModalProps) => {
    const [status, setStatus] = useState<string>('');
    const [result, setResult] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSendRequest = async () => {
        setIsLoading(true);
        setStatus('');
        setResult(null);

        try {

            // Replace with your actual API endpoint
            console.log("this is a test request ")
            console.log(body)
            const endpoint = url;
            const options = {
                method,
                headers,
                url: endpoint,
                data: method === 'POST' || method === 'PUT' ? body : undefined,
            };

            const response: AxiosResponse<ApiResponse> = await axios(options);

            console.log(response)
            console.log(response.status)
            console.log(response.statusText)


            setStatus(`${response.status} ${response.statusText}`);
            setResult(response.data || {});
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ApiResponse>;
                if (axiosError.response) {
                    // Server responded with an error
                    setStatus(`${axiosError.response.status} ${axiosError.response.statusText}`);
                    setResult(axiosError.response.data || {});
                } else if (axiosError.request) {
                    // Request was made but no response received
                    setStatus('No Response');
                    setResult({ message: 'No response received from server' });
                } else {
                    // Error in setting up the request
                    setStatus('Error');
                    setResult({ message: axiosError.message });
                }
            } else {
                // Non-Axios error
                setStatus('Error');
                setResult({ message: 'An unexpected error occurred' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Portal>
            <div
                role="dialog"
                aria-labelledby="create-label-title"
                className="fixed z-[999] flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.16)]"
            >
                <div className="relative w-[90%] h-[90vh]  bg-white rounded-xl  ">
                    <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-800">Test API</h2>
                        <button
                            onClick={() => {
                                setShowCreateTestApiModal(false);
                            }}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>


                    {/* Content Section */}
                    <div className="flex h-[80%] w-100    p-6">
                        <div className=' w-[25%] p-3 '>
                            <p className="text-gray-700 ">
                                Follow these steps to test your API:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                                <li>Add test values to variables</li>
                                <li>Click "Test the API"</li>
                                <li>Save the response field as a variable</li>
                            </ol>

                        </div>

                        {/* Response Section */}
                        <div className="  w-[75%] bg-gray-50  p-3  overflow-x-auto">
                            {status && (
                                <div className="text-sm text-red-600 mb-2">
                                    <span className="font-semibold">Status: </span>{status}
                                </div>
                            )}
                            {result && (
                                <pre className="text-sm bg-gray-100 p-2 rounded ">
                                    {/* {JSON.stringify(result, null, 2)} */}
                                    <JsonViewer data={result} />
                                </pre>
                            )}
                            {!result && !isLoading && (
                                <div className="text-gray-400 italic">No variable is used</div>
                            )}
                        </div>
                    </div>


                    {/* Footer Section */}
                    <div className="w-[100%] absolute bottom-0 left-0 px-6 py-4 border-t border-gray-200 flex justify-end">
                        <button
                            onClick={handleSendRequest}
                            className={`bg-blue-600 text-white px-4 py-2 rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                                }`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send Request'}
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default CreateTestApiModal;



// Recursive component to render collapsible JSON
const JsonViewer: React.FC<{ data: any; depth?: number }> = ({ data, depth = 0 }) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    if (typeof data !== 'object' || data === null) {
        return <span>{JSON.stringify(data)}</span>;
    }

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <div style={{ marginLeft: depth * 16 }}>
            <button
                className="text-blue-500  focus:outline-none"
                onClick={toggleCollapse}
            >
                {isCollapsed ? '>' : '▼'}
            </button>
            {!isCollapsed && (
                <div className="ml-4">
                    {Array.isArray(data)
                        ? data.map((item, index) => (
                            <div key={index}>
                                <strong>[{index}]</strong>: <JsonViewer data={item} depth={depth + 1} />
                            </div>
                        ))
                        : Object.entries(data).map(([key, value]) => (
                            <div key={key}>
                                <strong>{key}:</strong> <JsonViewer data={value} depth={depth + 1} />
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};
