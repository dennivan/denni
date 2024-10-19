import Loader from '@components/Loader';
import React, { Suspense } from 'react';

const LazyComponent = ({
    component: Component,
}: {
    component: React.ComponentType;
}) => (
    <Suspense fallback={<Loader />}>
        <Component />
    </Suspense>
);

export default LazyComponent;
