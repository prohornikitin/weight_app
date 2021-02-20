/**
 * @module
 */
import useForceUpdate from 'use-force-update';
import { useState } from 'react'

/**
 * React hook to push below existing state (which is created by {@link useState} hook).
 */
function useExistingState(state) {
  const [value, setValue] = state;
  const forceUpdate = useForceUpdate();
  return [
    value,
    (newValue) => {
      setValue(newValue);
      forceUpdate();
    }
  ]
}

export {useExistingState};