let currentId = 1;

export function generateId() {
  const id = currentId;
  currentId++;
  return id;
}