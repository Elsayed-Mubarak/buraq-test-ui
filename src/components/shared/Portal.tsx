"use client";
import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
    children: React.ReactNode;
}
const Portal = ({ children }: Props) => {
    if (typeof window === 'undefined') return null;
    const portalRoot = document.getElementById('popup-root');
    if (!portalRoot) return null;
    return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;
