import { useRef, useSyncExternalStore } from 'react';
import { __createStore } from './store';

export function createStore<Store>(initialValues: Store) {
  let store = { ...initialValues };

  const { setUpdated, register, unregister } = __createStore();

  return {
    useStore,
    updateStore,
    data: () => Object.freeze({ ...store }),
  };

  function updateStore(
    selector: Partial<Store> | ((store: Store) => Partial<Store>)
  ) {
    if (typeof selector === 'function') {
      doUpdate(selector(store));
    } else {
      doUpdate(selector);
    }
  }

  function useStore(): Store {
    const update = useRef(() => {});
    const keySet = useRef(new Set<string>());

    const receiver = (onStoreChange: () => void) => {
      unregister(update.current);
      update.current = onStoreChange;
      register(update.current, Array.from(keySet.current));
      return () => unregister(update.current);
    };

    const localStore = useSyncExternalStore(
      receiver,
      () => store,
      () => store
    ) as {};

    const proxy = new Proxy(localStore, {
      get(target: any, property: string) {
        register(update.current, [property]);
        keySet.current.add(property);
        return target[property];
      },
    });

    return proxy;
  }

  function doUpdate(partial: Partial<Store>) {
    const keys = Object.keys(partial);
    keys.forEach(key => {
      if (!(store as any).hasOwnProperty([key])) {
        return;
      }
      (store as any)[key] = (partial as any)[key];
    });
    store = { ...store };
    setUpdated(keys);
  }
}
