import { createContext, createSignal, createEffect } from 'solid-js';
import { CardDetail } from '../../dataTypes';

export interface SharedObjectState {
  object: CardDetail;  
  setObject: (obj: CardDetail) => void; 
}

const [sharedObject, setSharedObject] = createSignal<CardDetail>(null);

export const SharedObjectContext = createContext<SharedObjectState>({
  object: sharedObject(),
  setObject: setSharedObject,
});

export const SharedObjectProvider = (props) => {
  const [object, setObject] = createSignal<CardDetail>(null);

  const store = {
    object: object(),
    setObject: setObject,
  };

  // Update sharedObject whenever object changes
  createEffect(() => {
    setSharedObject(object());
  });

  return SharedObjectContext.Provider(store, props.children);
};
