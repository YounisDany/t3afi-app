'use client';

import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export function InviteHandler() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {
    isLoggedIn,
    setShowLoginModal,
    setPendingInvite,
    acceptFriendInvite,
  } = useAppStore();

  // Handle invite link - support both /invite/:id and ?invite=:id
  useEffect(() => {
    let inviteCode: string | null = null;

    // Check URL parameter first (?invite=xxx)
    inviteCode = searchParams.get('invite');

    // Check pathname (/invite/xxx)
    if (!inviteCode && pathname) {
      const inviteMatch = pathname.match(/\/invite\/([^/]+)/);
      if (inviteMatch) {
        inviteCode = inviteMatch[1];
      }
    }

    if (inviteCode) {
      if (!isLoggedIn) {
        // Store invite for later when user logs in
        setPendingInvite(inviteCode);
        setShowLoginModal(true);
      } else {
        // User already logged in, accept invite directly
        acceptFriendInvite(inviteCode);
      }
    }
  }, [searchParams, pathname, isLoggedIn, setPendingInvite, setShowLoginModal, acceptFriendInvite]);

  return null;
}
