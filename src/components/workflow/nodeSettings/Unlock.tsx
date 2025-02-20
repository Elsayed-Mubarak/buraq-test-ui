import React from 'react'
import { MdLock } from 'react-icons/md'

function Unlock() {
    return (
        <div className="flex flex-col gap-4 mt-4">
            <div >
                <div className="mt-2 flex items-center">
                    <input
                        type="checkbox"
                        name="filters"
                        id="filters"
                        className="rounded"
                        disabled
                    />
                    <label
                        htmlFor="filters"
                        className="text-sm mx-2 flex items-center gap-2"
                    >
                        <span className="font-bold text-gray-500">Track links in this message</span>
                        <MdLock className="text-yellow-300 w-6 h-6" />
                    </label>
                </div>
                <p className="text-xs font-normal text-gray-500 mt-1">
                    Upgrade your plan to access this feature
                </p>
            </div>
        </div>
    )
}

export default Unlock