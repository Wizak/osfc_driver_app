import React, { memo } from 'react';

import Button from './Button';
import { useAuth } from '../contexts/auth';
import { useStore } from '../contexts/store';
import i18n from '../translation';

const LogoutButton = (props) => {
    const { signOut } = useAuth();
    const { resetStore } = useStore();

    const handleLogout = async () => {
        await resetStore();
        await signOut();
    };

    return (
        <Button {...props} icon="logout" onPress={handleLogout}>
            {i18n.t('app.buttons.logout')}
        </Button>
    );
};

export default memo(LogoutButton);
