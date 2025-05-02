import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { User } from 'oidc-client-ts';
import { getUser, userManager } from './authService';

interface UserContextType {
	isAuthenticated: boolean;
	user: User | null;
	isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const queryClient = useQueryClient();
	const [isLoading, setIsLoading] = useState(true);

	// Event handlers
	const handleUserLoaded = (loadedUser: User) => {
		queryClient.setDefaultOptions({
			queries: {
				meta: {
					...queryClient.getDefaultOptions()?.queries?.meta,
					authorization: `Bearer ${loadedUser.access_token}`
				}
			},
			mutations: {
				meta: {
					...queryClient.getDefaultOptions()?.mutations?.meta,
					authorization: `Bearer ${loadedUser.access_token}`
				}
			}
		});
		setUser(loadedUser);
	};

	const handleUserUnloaded = () => {
		queryClient.setDefaultOptions({
			queries: {
				meta: {
					...queryClient.getDefaultOptions()?.queries?.meta,
					authorization: undefined
				}
			},
			mutations: {
				meta: {
					...queryClient.getDefaultOptions()?.mutations?.meta,
					authorization: undefined
				}
			}
		});
		setUser(null);
	};

	useEffect(() => {
		// Initial user load
		const loadUser = async () => {
			try {
				const currentUser = await getUser();
				setUser(currentUser);
				setIsLoading(false);
			} catch (error) {
				console.error('Error loading user: ', error);
				window.location.href = '/';
			}
		};
		loadUser();

		// Subscribe to events
		userManager.events.addUserLoaded(handleUserLoaded);
		userManager.events.addUserUnloaded(handleUserUnloaded);

		// Cleanup
		return () => {
			userManager.events.removeUserLoaded(handleUserLoaded);
			userManager.events.removeUserUnloaded(handleUserUnloaded);
		};
	}, []);

	const value = {
		isAuthenticated: !!user && !user.expired,
		user,
		isLoading
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useAuthContext must be used within an AuthProvider');
	}
	return context;
};
