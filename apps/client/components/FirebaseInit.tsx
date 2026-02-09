'use client';

import { useEffect } from 'react';
import { getFirebaseAnalytics, getFirebasePerformance } from '@gratuity/firebase-config/firebase';

export default function FirebaseInit() {
    useEffect(() => {
        const initFirebase = async () => {
            try {
                await getFirebaseAnalytics();
                getFirebasePerformance();
            } catch (error) {
                console.error('Firebase initialization failed:', error);
            }
        };

        initFirebase();
    }, []);

    return null;
}
