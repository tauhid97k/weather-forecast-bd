import React from 'react';
import SynopticCodeForm from './synoptic-code-form';

const SynopticCodePage: React.FC = () => {
    return (
        <main className="container mx-auto p-4 md:p-8">
            <h1 className="text-2xl font-bold text-center mb-6">SYNOPTIC CODE</h1>
            <SynopticCodeForm />
        </main>
    );
};

export default SynopticCodePage;