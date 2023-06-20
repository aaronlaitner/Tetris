// TODO add the relevent new keys and mappings

// Function is used for translating key press lingo into readable code

// Strings that match the keys
export const Action = {
  Left: "Left",
  FastDrop: "FastDrop",
  Pause: "Pause",
  Quit: "Quit",
  Right: "Right",
  Rotate: "Rotate",
  SlowDrop: "SlowDrop",
  counterRotate: "counterRotate", // new feature
  doubleRotate: "doubleRotate" // new feature
};

// Maps the keys pressed to actions
// Object with key codes and strings (similar to a dictionary)
export const Key = {
  ArrowUp: Action.Rotate,
  ArrowDown: Action.SlowDrop,
  ArrowLeft: Action.Left,
  ArrowRight: Action.Right,
  KeyQ: Action.Quit,
  KeyP: Action.Pause,
  KeyZ: Action.counterRotate, // new feature
  KeyD: Action.doubleRotate, // new feature
  Space: Action.FastDrop
};

// Given an action, check whether it is a slowdrop or fastdrop
export const actionIsDrop = (action) =>
  [Action.SlowDrop, Action.FastDrop].includes(action);

// Will be used to lookup the keys
export const actionForKey = (keyCode) => Key[keyCode];
