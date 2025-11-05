import { useState, useEffect } from 'react';

export interface GeolocationCoords {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface LocationData {
  coords: GeolocationCoords | null;
  error: string | null;
  loading: boolean;
  isSupported: boolean;
  permissionState: 'granted' | 'denied' | 'prompt' | 'unknown';
}

export function useGeolocation(enableHighAccuracy = true, timeout = 10000, maximumAge = 300000) {
  const [location, setLocation] = useState<LocationData>({
    coords: null,
    error: null,
    loading: true,
    isSupported: 'geolocation' in navigator,
    permissionState: 'unknown'
  });

  useEffect(() => {
    if (!location.isSupported) {
      setLocation(prev => ({
        ...prev,
        loading: false,
        error: 'Geolocation is not supported by this browser'
      }));
      return;
    }

    const getLocation = () => {
      setLocation(prev => ({ ...prev, loading: true, error: null }));

      const options: PositionOptions = {
        enableHighAccuracy,
        timeout,
        maximumAge
      };

      const onSuccess = (position: GeolocationPosition) => {
        console.log('📍 Location detected:', position.coords.latitude, position.coords.longitude);
        setLocation(prev => ({
          ...prev,
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          },
          loading: false,
          permissionState: 'granted'
        }));
      };

      const onError = (error: GeolocationPositionError) => {
        let errorMessage = 'Failed to get location';
        let permissionState: 'granted' | 'denied' | 'prompt' | 'unknown' = 'unknown';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            permissionState = 'denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'An unknown error occurred while retrieving location';
            break;
        }

        console.warn('🚫 Geolocation error:', errorMessage);
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
          permissionState
        }));
      };

      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    };

    // Check permission state if available
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then(permission => {
        setLocation(prev => ({
          ...prev,
          permissionState: permission.state as 'granted' | 'denied' | 'prompt'
        }));

        if (permission.state === 'granted') {
          getLocation();
        } else if (permission.state === 'prompt') {
          // Ask for permission
          getLocation();
        } else {
          setLocation(prev => ({
            ...prev,
            loading: false,
            error: 'Location permission denied'
          }));
        }

        // Listen for permission changes
        permission.onchange = () => {
          setLocation(prev => ({
            ...prev,
            permissionState: permission.state as 'granted' | 'denied' | 'prompt'
          }));

          if (permission.state === 'granted') {
            getLocation();
          }
        };
      }).catch(() => {
        // Fallback for browsers that don't support permissions API
        getLocation();
      });
    } else {
      // Fallback for browsers that don't support permissions API
      getLocation();
    }
  }, [enableHighAccuracy, timeout, maximumAge, location.isSupported]);

  const requestLocation = () => {
    if (location.isSupported) {
      setLocation(prev => ({ ...prev, loading: true, error: null }));
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('📍 Location manually requested:', position.coords.latitude, position.coords.longitude);
          setLocation(prev => ({
            ...prev,
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            },
            loading: false,
            permissionState: 'granted',
            error: null
          }));
        },
        (error) => {
          let errorMessage = 'Failed to get location';
          let permissionState: 'granted' | 'denied' | 'prompt' | 'unknown' = 'unknown';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied. Please enable location access in your browser settings.';
              permissionState = 'denied';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }

          setLocation(prev => ({
            ...prev,
            loading: false,
            error: errorMessage,
            permissionState
          }));
        },
        {
          enableHighAccuracy,
          timeout,
          maximumAge
        }
      );
    }
  };

  return {
    ...location,
    requestLocation
  };
}

// Utility function to get city name from coordinates
export async function getCityFromCoords(lat: number, lon: number): Promise<string> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=99fdd4cb00e534bbbba703cfd9cfa34d`
    );
    
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        const location = data[0];
        return `${location.name}, ${location.country}`;
      }
    }
  } catch (error) {
    console.warn('Failed to get city name from coordinates:', error);
  }
  
  return `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
}