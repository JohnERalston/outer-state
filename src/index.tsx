import { useRef, useSyncExternalStore } from 'react';
import { __createStore } from './store';

export function createStore<Store>(initialValues: Store) {
  let initialPropsSet = false;
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

  function useStore(initialProps?: Partial<Store> | null | undefined): Store {
    const update = useRef(() => {});
    const keySet = useRef(new Set<string>());

    if (initialProps && !initialPropsSet) {
      setStoreValues(initialProps);
    }
    initialPropsSet = true;

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
    setUpdated(setStoreValues(partial));
  }

  function setStoreValues(partial: Partial<Store>) {
    const keys = Object.keys(partial);
    keys.forEach(key => {
      (store as any)[key] = (partial as any)[key];
    });
    store = { ...store };

    return keys;
  }
}
