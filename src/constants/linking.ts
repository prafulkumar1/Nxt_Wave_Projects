import { Linking, Platform } from "react-native";
import { baseURL } from "../config/config";
interface LinkingConfig {
  prefixes: string[];
  getInitialURL: () => Promise<string | null>;
  subscribe: (listener: (url: string) => void) => () => void;
  isAppInstalled: () => Promise<boolean>;
  openPlayStore: () => void;
  config: {
    screens: {
      Main_Home: {
        screens: {
          SingleProduct: string;
        };
      };
    };
  };
}
export const linking = {
  prefixes: [baseURL],


  async getInitialURL(): Promise<string | null> {
    const url = await Linking.getInitialURL();
    return url;
  },

  subscribe(listener: (arg0: string) => void) {
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    return () => {

      linkingSubscription.remove();
    };
  },
  isAppInstalled: async () => {
    const packageName = 'com.extwebtech.tejaorganic';
    try {
      const scheme: string = Platform.OS === 'ios' ? `yourAppScheme://` : `package:${packageName}`
      const isInstalled = await Linking.canOpenURL(scheme);
      return isInstalled;
    } catch (error) {
      return false;
    }
  },

  openPlayStore: () => {
    const packageName = 'com.extwebtech.tejaorganic';
    const playStoreUrl = `market://details?id=${packageName}`;
    const appStoreUrl = 'https://apps.apple.com/app/your-app-id';

    const url: string = Platform.OS === 'android' ? playStoreUrl : appStoreUrl;
    Linking.openURL(url);
  },
  config: {

    screens: {
      Main_Home: {
        screens: {
          SingleProduct: 'api/v1/products/:id'
        }
      }
    }
  }
};